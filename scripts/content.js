// vozi me na pale preko ledina, tamo zivi, tamo zivi moja jedina
const LEDINE = "ledine";

// websites
const HALOOGLASI = "halooglasi.com";
const NEKRETNINE = "nekretnine.rs";
const CETIRIZIDA = "4zida.rs";



var options = {filterLedine: true};
chrome.storage.local.get("options").then((data) => {
    console.log("storage get: " + JSON.stringify(data.options))
    Object.assign(options, data.options);
    if (options.filterLedine) {
        if (window.location.origin.toLowerCase().indexOf(HALOOGLASI) != -1) {
            handleHaloOglasi();
        } else if (window.location.origin.toLowerCase().indexOf(NEKRETNINE) != -1) {
            handleNekretnine();
        } else if (window.location.origin.toLowerCase().indexOf(CETIRIZIDA) != -1) {
            handle4Zida();
        }
    }
});


chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.options?.newValue) {
        const filtered = Boolean(changes.options.newValue.filterLedine);
        options.filterLedine = filtered;
    }
});



function handleHaloOglasi() {
    let ads = document.querySelector("#ad-list-2");
    if (!ads) {
        // The node we need does not exist yet. Wait 100ms and try again
        window.setTimeout(handleHaloOglasi, 100);
        return;
    }
    hideAdsHaloOglasi(ads);
    let observer = new MutationObserver(function(mutations) {  
        hideAdsHaloOglasi(ads);
    });
    let observerConfig = {childList: true};
    observer.observe(ads, observerConfig);
}

function hideAdsHaloOglasi(ads) {
    if (!options.filterLedine) return;

    ads.querySelectorAll(".real-estates.product-item").forEach(e => {
        if (e.innerText.toLowerCase().indexOf(LEDINE) != -1) {
            e.style.display = 'none';
        }
    });
}

function handleNekretnine() {
    let ads = document.querySelector(".advert-list");
    if (!ads) {
        // The node we need does not exist yet. Wait 100ms and try again
        window.setTimeout(handleNekretnine, 100);
        return;
    }
    hideAdsNekretnine(ads);
    let observer = new MutationObserver(function(mutations) {  
        hideAdsNekretnine(ads);
    });
    let observerConfig = {childList: true};
    observer.observe(ads, observerConfig);
}

function hideAdsNekretnine(ads) {
    if (!options.filterLedine) return;

    ads.querySelectorAll(".row.offer").forEach(e => {
        if (e.innerText.toLowerCase().indexOf(LEDINE) != -1) {
            e.style.display = 'none';
        }
    });
}

function handle4Zida() {
    let ads = document.querySelector("main > div");
    if (!ads) {
        // The node we need does not exist yet. Wait 100ms and try again
        window.setTimeout(handle4Zida, 100);
        return;
    }
    hideAds4Zida(ads);
    let observer = new MutationObserver(function(mutations) {
        hideAds4Zida(ads);
    });
    let observerConfig = {childList: true};
    observer.observe(ads, observerConfig);
}

function hideAds4Zida(ads) {
    if (!options.filterLedine) return;

    let srchElem = ads.querySelector("section[test-data='search-chips']");
    let adElem = srchElem.nextElementSibling;
    while(adElem) {
        if (adElem.innerText.toLowerCase().indexOf(LEDINE) != -1) {
            adElem.style.display = 'none';
        }
        adElem = adElem.nextElementSibling;
    }
}
