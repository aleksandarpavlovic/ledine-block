const options = {filterLedine:true};
const checkbox = document.getElementById("filterLedine");

checkbox.addEventListener("change", (evt) => {
    options.filterLedine = evt.target.checked;
    chrome.storage.local.set({options}, () => console.log("storage set: " + JSON.stringify(options)));
    updateHeaderOpacity(evt.target.checked);
    reloadTabs();
});

const data = await chrome.storage.local.get("options");
Object.assign(options, data.options);
checkbox.checked = Boolean(options.filterLedine);
updateHeaderOpacity(checkbox.checked);

function updateHeaderOpacity(filterOn) {
    let header = document.getElementById("header");
    if (filterOn) {
        header.style.opacity = 1;
    } else {
        header.style.opacity = 0.15;
    }
}

function reloadTabs() {
    chrome.tabs.query({"url":["*://*.nekretnine.rs/*", "*://*.halooglasi.com/*", "*://*.4zida.rs/*"]}, tabs => {
        tabs.forEach(tab => chrome.tabs.reload(tab.id));
    });
}
