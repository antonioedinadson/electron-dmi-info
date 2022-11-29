const { ipcRenderer } = require('electron');
const form = document.querySelector('.action form');

const setData = async (className, item, type) => {
    const element = document.querySelector(className);
    element.innerText = await ipcRenderer.sendSync(type, item);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!e.target[0].value) {
        alert("Selecione o SO")
        return;
    }

    setData('.ns .value', 'serialNumber', e.target[0].value);
    setData('.list .dmi.sk', 'sk', e.target[0].value);
    setData('.list .dmi.bp', 'bp', e.target[0].value);
    setData('.list .dmi.sf', 'sf', e.target[0].value);
    setData('.list .dmi.sv', 'sv', e.target[0].value);
    setData('.list .dmi.sm', 'sm', e.target[0].value);
    setData('.list .dmi.bm', 'bm', e.target[0].value);
    setData('.list .dmi.cm', 'cm', e.target[0].value);
});