const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");

const env = process.env.NODE_ENV || "development";
const isMacOS = process.platform === "darwin";

// If development environment
if (env === "development") {
  try {
    require("electron-reloader")(module, {
      debug: true,
      watchRenderer: true,
    });
  } catch (_) {
    console.log("Error");
  }
}

let mainWindow, addTaskWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js"), // use a preload script
    },
  });

  mainWindow.loadFile("todo.html");

  mainWindow.on("closed", () => {
    app.quit();
  });

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("todo:addTask", (event, task) => {
  mainWindow.webContents.send("todo:addTask", task);
  addTaskWindow.close();
});

function createAddTaskWindow() {
  addTaskWindow = new BrowserWindow({
    height: 200,
    width: 250,
    title: "Add New Task",
    webPreferences: {
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js"), // use a preload script
    },
  });

  addTaskWindow.loadFile("addTask.html");
  addTaskWindow.on("close", () => (addTaskWindow = null));
}

const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Add Task",
        accelerator: isMacOS ? "Command+N" : "Ctrl+N",
        click() {
          createAddTaskWindow();
        },
      },
      {
        label: "Clear To-do List",
        accelerator: isMacOS ? "Command+Alt+C" : "Ctrl+Shift+C",
        click() {
          mainWindow.webContents.send("todo:clear");
        },
      },
      {
        label: "Quit",
        accelerator: isMacOS ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
];

if (isMacOS) {
  menuTemplate.unshift({});
}

if (env === "development") {
  menuTemplate.push({
    label: "View",
    submenu: [{ role: "reload" }, { role: "toggleDevTools" }],
  });
}
