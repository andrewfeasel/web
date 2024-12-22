const $ = (x) => document.getElementById(x);
const jConsole = {
    log(x) {
        const ui = $("consoleUI");
        ui.innerHTML += `${x}<br>`;
        ui.scrollTop = ui.scrollHeight;
    },
    clear() {
        const ui = $("consoleUI");
        ui.innerHTML = '';
        ui.scrollTop = ui.scrollHeight;
    }
};
async function request(url){
    const response = await fetch(url, {
        headers: {"Content-Type":"application/json"}
    });
    const json = await response.json();
    return json;
}
async function post(url, data){
	const content = JSON.stringify(data,null,2);
    const response = await fetch(url,{
	    method: "POST",
		headers: {"Content-Type":"application/json"},
		body: content
	});
    const json = await response.json();
    return json;
}
