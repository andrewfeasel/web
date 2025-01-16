'use strict';
const $ = x => document.getElementById(x);
const log = x => {
    const ui = $("consoleUI");
    ui.innerHTML += `${x}<br>`;
    ui.scrollTop = ui.scrollHeight;
};
const clear = () => {
    const ui = $("consoleUI");
    ui.innerHTML = '';
    ui.scrollTop = ui.scrollHeight;
    $('input').value = '';
};
