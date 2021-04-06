const { BrowserWindow } = require("electron");

class MainWindow extends BrowserWindow {
  constructor(filePath) {
    super({
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
        backgroundThrottling: false,
      },
      height: 550,
      width: 300,
      frame: false,
      resizable: false,
      show: false,
    });
    this.on("blur", this.onBlur.bind(this));
    this.loadFile(filePath);
  }
  onBlur() {
    this.hide();
  }
}

module.exports = MainWindow;
