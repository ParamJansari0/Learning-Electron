const { Tray, Menu, app } = require("electron");

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);
    this.setToolTip("Timer App");
    this.on("click", (event, bounds) => {
      const { x, y } = bounds;
      const { height, width } = mainWindow.getBounds();
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        const yPosition = process.platform === "darwin" ? y : y - height;
        mainWindow.setBounds({
          x: Math.round(x - width / 2),
          y: Math.round(yPosition),
        });
        mainWindow.show();
      }
    });

    this.on("right-click", () => {
      const menuConfig = Menu.buildFromTemplate([
        {
          label: "Quit",
          click: () => {
            app.quit();
          },
        },
      ]);
      this.popUpContextMenu(menuConfig);
    });
  }
}

module.exports = TimerTray;
