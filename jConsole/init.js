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
let hasConnection = true;
const request = async (url) => {
    try {
        if(!hasConnection){
            throw new Error('Internet Required for HTTP Requests');
        }
        if(!url.match(/^https:/)){
            url = 'https://' + url;
        }
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(response.status);
        }
        const json = await response.json();
        return json;
    } catch (e) {
        jConsole.log(e.message);
    }
};
const observer = lozad();
observer.observe();
window.addEventListener("offline", (e) => {
    jConsole.log('OFFLINE');
    hasConnection = false;
});

window.addEventListener("online", (e) => {
    jConsole.log('ONLINE');
    hasConnection = false;
});
