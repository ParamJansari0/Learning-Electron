const { app, ipcMain } = require("electron");
const path = require("path");
const TimerTray = require("./app/TimerTray");
const MainWindow = require("./app/MainWindow");

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

let mainWindow, tray;

app.on("ready", () => {
  mainWindow = new MainWindow("src/index.html");

  if (isMacOS) {
    app.dock.hide();
  } else {
    mainWindow.setSkipTaskbar(true);
  }

  const iconName = isMacOS ? "iconTemplate" : "windows-icon";
  const iconPath = path.join(__dirname, `./src/assets/${iconName}@2x.png`);
  tray = new TimerTray(iconPath, mainWindow);
});

ipcMain.on("timer:update", (event, timeLeft) => {
  tray.setTitle(timeLeft);
});
