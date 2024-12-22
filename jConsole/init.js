const $ = (x) => document.getElementById(x);
const jConsole = {
    log(x) {
        const ui = $("consoleUI");
        ui.innerHTML += `${x}<br>`;
        ui.scrollTop = ui.scrollHeight;
    },
    clear() {
        const ui = $("consoleUI");
        ui.innerHTML = '';
        ui.scrollTop = ui.scrollHeight;
    }
};
