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
const getProtocol = (url) => {
    let proto = url.match(/^([A-Za-z]+):/);
    if (proto) {
        return proto[1].toLowerCase();
    } else {
        return 'None';
    }
};
const request = async (url) => {
    jConsole.log('Awaiting Response...');
    try {
        switch(getProtocol(url)){
            case 'None':
                url = 'https://' + url;
                break;
        }
        const response = await fetch(url);
        jConsole.log(`Response Code: ${response.status}`);
        const json = await response.json();
        jConsole.log(json);
    } catch (e) {
        jConsole.logError(e);
    }
};
const observer = lozad();
observer.observe();
