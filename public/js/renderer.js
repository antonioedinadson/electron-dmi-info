const { ipcRenderer } = require('electron');
const serial = ipcRenderer.sendSync('dmi');
console.log(serial);