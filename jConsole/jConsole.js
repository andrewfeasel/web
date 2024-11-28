document.addEventListener('load',start,false);
document.addEventListener('error', jConsole.logError, false);
const $ = (x) => document.getElementById(x);
function start(){
    $('logger').onclick = jConsole.log($('input').value);
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
    try {
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
                    logError(error);
                }
            }
        });
    } catch (e) {
        jConsole.logError(e);
    }
}
const jConsole = {
    log(x) {
        const console = $("consoleUI");
        console.innerHTML += JSON.stringify(x, null, 2) + '<br>';
        console.scrollTop = console.scrollHeight;
    },
    clear() {
        const console = $("consoleUI");
        console.innerHTML = '';
        console.scrollTop = consoleElement.scrollHeight;
    },
    logError(error) {
        this.log(`${error.name}: ${error.message}.`);
    },
    eval() {
        const input = $('input');
        if (input.value === '') {
            throw new ReferenceError('No code');
        }
        eval(input.value);
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
async function request(url){
    jConsole.log('Awaiting Response...');
    try {
        switch(getProtocol(url)){
            case 'None':
                url = 'https://' + url;
                break;
        }
        const response = await fetch(url);
        jConsole.log(`Response Code: ${response.status}`)
        const json = await response.json();
        jConsole.log(json);
    } catch (e) {
        jConsole.logError(e);
    }
}