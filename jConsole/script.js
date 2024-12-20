document.addEventListener("DOMContentLoaded", (event) => {
    try {
        const evalButton = $("evalButton");
        const clearButton = $("clearButton");
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
        evalButton.onclick = () => {
            try{
                eval($('input').value);
            }
            catch(error){
                jConsole.logError(error);
            }
        };
        clearButton.onclick = () => {
            jConsole.clear();
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
