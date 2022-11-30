const { ipcRenderer } = require('electron');
const form = document.querySelector('.action form');

try {

    const setData =  (className, item, type) => {
        const element = document.querySelector(className);
        element.innerText = ipcRenderer.sendSync(type, item);
        console.log(ipcRenderer.sendSync(type, item));
    }

    form.addEventListener('submit', async (e) => {
        document.querySelector('.error').classList.remove('active');
        e.preventDefault();

        if (!e.target[0].value) {
            alert("Selecione o SO")
            return;
        }

        setData('.list .dmi.sf', 'sf', e.target[0].value);

        setTimeout(() => {
            setData('.ns .value', 'serialNumber', e.target[0].value);
            setData('.list .dmi.sk', 'sk', e.target[0].value);
            setData('.list .dmi.bp', 'bp', e.target[0].value);
            setData('.list .dmi.sv', 'sv', e.target[0].value);
            setData('.list .dmi.sm', 'sm', e.target[0].value);
            setData('.list .dmi.bm', 'bm', e.target[0].value);
            setData('.list .dmi.cm', 'cm', e.target[0].value);
        }, 1);
    });

} catch (error) {    
    document.querySelector('.error').classList.add('active');
}