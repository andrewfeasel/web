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
    },
    logError(error) {
        this.log(`${error.name} ${error.message} ${error.stack}`);
    }
};
window.addEventListener("offline", (event) => {
  jConsole.log("offline");
});
window.addEventListener("online", (event) => {
  jConsole.log("online");
});
const observer = lozad();
observer.observe();
window.addEventListener("offline", (event) => {
  jConsole.log("offline");
});
window.addEventListener("online", (event) => {
  jConsole.log("online");
});
