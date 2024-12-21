const $ = (x) => document.getElementById(x);
const jConsole = {
    log(x) {
        try {
            const ui = $("consoleUI");
            ui.innerHTML += x + '<br>';
            ui.scrollTop = ui.scrollHeight;
        } catch (error) {
            this.logError(error);
        }
    },
    clear() {
        const ui = $("consoleUI");
        ui.innerHTML = '';
        ui.scrollTop = ui.scrollHeight;
    }
};
const observer = lozad();
observer.observe();
