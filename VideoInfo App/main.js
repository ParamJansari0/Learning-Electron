const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");

const env = process.env.NODE_ENV || "development";

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

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js"), // use a preload script
    },
  });

  mainWindow.loadFile("videoInfo.html");
}

app.whenReady().then(createWindow);

ipcMain.on("video:info", (event, path) => {
  ffmpeg.ffprobe(path, (error, metadata) => {
    mainWindow.webContents.send("video:duration", metadata.format.duration);
  });
});

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
