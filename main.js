const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path')
const exec = require('child_process').exec;

function createWindow() {
  const mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 700,
    height: 500,

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'public/img/favicon.ico'),
  });

  mainWindow.loadFile('index.html')
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
});

ipcMain.on('linux', (event, args) => {

  switch (args) {
    case 'serialNumber':
      exec('sudo dmidecode -s system-serial-number', async (err, stdout, stderr) => {
        if (err !== null) return err;
        event.returnValue = stdout;
      });
      break;

    case 'sk':
      exec('sudo dmidecode -s system-sku-number', async (err, stdout, stderr) => {
        if (err !== null) return err;
        event.returnValue = stdout;
      });
      break;

    case 'bp':
      exec('sudo dmidecode -s baseboard-product-name', async (err, stdout, stderr) => {
        if (err !== null) return err;
        event.returnValue = stdout;
      });
      break;

    case 'sp':
      exec('sudo dmidecode -s system-product-name', async (err, stdout, stderr) => {
        if (err !== null) return err;
        event.returnValue = stdout;
      });
      break;

    case 'sf':
      exec('sudo dmidecode -s system-family', async (err, stdout, stderr) => {
        if (err !== null) return err;
        event.returnValue = stdout;
      });
      break;

    case 'sv':
      exec('sudo dmidecode -s system-version', async (err, stdout, stderr) => {
        if (err !== null) return err;
        event.returnValue = stdout;
      });
      break;

    case 'sm':
      exec('sudo dmidecode -s system-manufacturer', async (err, stdout, stderr) => {
        if (err !== null) return err;
        event.returnValue = stdout;
      });
      break;

    case 'bm':
      exec('sudo dmidecode -s baseboard-manufacturer', async (err, stdout, stderr) => {
        if (err !== null) return err;
        event.returnValue = stdout;
      });
      break;

    case 'cm':
      exec('sudo dmidecode -s system-manufacturer', async (err, stdout, stderr) => {
        if (err !== null) return err;
        event.returnValue = stdout;
      });
      break;

    default:
      return false;
  }
});

ipcMain.on('windows', (event, args) => {

  switch (args) {
    case 'serialNumber':
      exec('wmic bios get serialnumber', async (err, stdout, stderr) => {
        if (err !== null) return err;        
        event.returnValue = stdout.split('\n')[1];
      });
      break;

    case 'sk':
      exec('wmic ComputerSystem get SystemSKUNumber', async (err, stdout, stderr) => {
        if (err !== null) return err;
        event.returnValue = stdout.split('\n')[1];
      });
      break;

    case 'bp':
      exec('wmic baseboard get Product', async (err, stdout, stderr) => {
        if (err !== null) return err;
        event.returnValue = stdout.split('\n')[1];
      });
      break;

    case 'sp':
      exec('wmic ComputerSystem get Model', async (err, stdout, stderr) => {
        if (err !== null) return err;
        event.returnValue = stdout.split('\n')[1];
      });
      break;

    case 'sf':
      exec('wmic ComputerSystem get SystemFamily', async (err, stdout, stderr) => {
        if (err !== null) return err;
        event.returnValue = stdout.split('\n')[1];
      });
      break;

    case 'sv':
      exec('wmic csproduct get version', async (err, stdout, stderr) => {
        if (err !== null) return err;
        event.returnValue = stdout.split('\n')[1];
      });
      break;

    case 'sm':
      exec('wmic ComputerSystem get Manufacturer', async (err, stdout, stderr) => {
        if (err !== null) return err;
        event.sender.
        stdout.split('\n')[1];
      });
      break;

    case 'bm':
      exec('wmic BaseBoard get Manufacturer', async (err, stdout, stderr) => {
        if (err !== null) return err;
        event.returnValue = stdout.split('\n')[1];
      });
      break;

    case 'cm':
      exec('wmic SystemEnclosure get Manufacturer', async (err, stdout, stderr) => {
        if (err !== null) return err;
        event.returnValue = stdout.split('\n')[1];
      });
      break;

    default:
      return false;
  }
});