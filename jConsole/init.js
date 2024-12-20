const $ = (x) => document.getElementById(x);
const jConsole = {
    log(x) {
        try {
            const ui = $("consoleUI");
            ui.innerHTML += JSON.stringify(x, null, 2) + '<br>';
            ui.scrollTop = ui.scrollHeight;
        } catch (error) {
            this.logError(error);
        }
    },
    clear() {
        const ui = $("consoleUI");
        ui.innerHTML = '';
        ui.scrollTop = ui.scrollHeight;
    },
    logError(error) {
        this.log(`${error.name}: ${error.message}.`);
    }
};
observer.observe();
