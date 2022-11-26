const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path')
const exec = require('child_process').exec;

function createWindow() {
  const mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 700,
    height: 400,

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'public/img/favicon.ico'),
  });

  mainWindow.loadFile('index.html')
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
});

ipcMain.on('getDMI', (event, args) => {

  switch (args) {
    case 'serialNumber':
      exec('wmic bios get serialnumber', async (err, stdout, stderr) => {
        if (err !== null) return err;
        event.returnValue = stdout;
      });
      break;

    default:
      break;
  }

});