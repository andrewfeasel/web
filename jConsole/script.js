'use strict';
window.addEventListener('error', (error) => {
    log(`${error.name} ${error.message}`);
});
document.addEventListener("DOMContentLoaded", (event) => {
    const evalButton = $("evalButton");
    const clearButton = $("clearButton");
    const fileInput = $('file');
    fileInput.accept = 'text/javascript, application/json';
    const code = $('code');
    window.addEventListener('offline', (event) => {
        log('offline');
    });
    window.addEventListener('online', (event) => {
        log('online');
    });
    const myCodeMirror = CodeMirror.fromTextArea(code, {
        mode: 'javascript',
        indentUnit: 4,
        lineNumbers: true,
        spellcheck: false,
        autocorrect: false,
        autocapitalize: false,
        allowDropFileTypes: ['text/javascript','application/json']
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
    evalButton.onclick = () => {
        try {
            eval($('input').value);
        } catch (error) {
            throw error;
        }
    };
    clearButton.onclick = () => {
        myCodeMirror.setValue('');
        clear();
    };
    fileInput.addEventListener("change", async () => {
        let textContent;
        for await (const file of fileInput.files) {
            if (!file) {
                break;
            }
            textContent += await file.text();
        }
        textContent = textContent.replace(/^undefined/,'');
        myCodeMirror.setValue(textContent);
    });
});
