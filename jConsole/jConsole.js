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
}
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
}
document.addEventListener("DOMContentLoaded", (event) => {
    try {
        const logButton = $("logButton");
        const evalButton = $("evalButton");
        const clearButton = $("clearButton");
        const requestButton = $("requestButton");
        const fileInput = $('file');
        const code = $('code');
        const myCodeMirror = CodeMirror.fromTextArea(code, {
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
            $('input').value = myCodeMirror.getValue();
        );
        logButton.onclick = () => { jConsole.log($('input').value); }
        evalButton.onclick = () => { eval($('input').value); }
        clearButton.onclick = () => { jConsole.clear(); }
        requestButton.onclick = () => { request($("url").value) }
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
