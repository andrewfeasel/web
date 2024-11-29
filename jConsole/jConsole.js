const $ = (x) => document.getElementById(x);
document.addEventListener("DOMContentLoaded", (event) => {
    try{
        const logButton = $("logButton");
        logButton.onclick = () => {
            jConsole.log($('input').value);
        };
        const evalButton = $("evalButton");
        evalButton.onclick = () => {
            eval($('input').value);
        };
        const clearButton = $("clearButton");
        clearButton.onclick = () => {
            jConsole.clear();
        };
        const requestButton = $("requestButton");
        requestButton.onclick = () => {
            httpRequest($("url").value);
        };
        const myCodeMirror = CodeMirror.fromTextArea($('code'), {
            mode: 'javascript',
            indentUnit: 4,
            lineNumbers: true,
            spellcheck: false,
            autocorrect: false,
            autocapitalize: false,
            indentWithTabs: true,
            allowDropFileTypes: ['text/javascript','text/css','text/html'],
        });
        myCodeMirror.setOption("extraKeys", {
            Tab: function(cm) {
                const spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
                cm.replaceSelection(spaces);
            }
        });
        myCodeMirror.on("change", (e) =>
            $('input').value = myCodeMirror.getValue()
        );
        const fileInput = $('file');
        fileInput.addEventListener("change", async () => {
            const [file] = fileInput.files;
            if (file) {
                try {
                    const textContent = await file.text();
                    myCodeMirror.setValue(textContent);
                } catch (error) {
                    jConsole.logError(error);
                }
            }
        });
    } catch (e) {
        jConsole.logError(e);
    }
});
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
function getProtocol(url) {
    let proto = url.match(/^([A-Za-z]+):/);
    if (proto) {
        return proto[1].toLowerCase();
    } else {
        return 'None';
    }
}
async function httpRequest(url){
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
        jConsole.log(JSON.stringify(json));
    } catch (e) {
        jConsole.logError(e);
    }
}