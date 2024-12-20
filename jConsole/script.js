window.addEventListener("offline", (e) => {
    jConsole.log('OFFLINE');
});

window.addEventListener("online", (e) => {
    jConsole.log('ONLINE');
});
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
            allowDropFileTypes: ['text/javascript','text/css','text/html']
        });
        myCodeMirror.setOption("extraKeys", {
            Tab: function(cm) {
                const spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
                cm.replaceSelection(spaces);
            }
        });
        myCodeMirror.on("change", (e) => {
            $('input').value = myCodeMirror.getValue();
        });
        logButton.onclick = () => {
            jConsole.log($('input').value);
        };
        evalButton.onclick = () => {
            eval($('input').value);
        };
        clearButton.onclick = () => {
            jConsole.clear();
        };
        requestButton.onclick = async () => {
            let response = await request($("url").value);
            jConsole.log(response);
        };
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
