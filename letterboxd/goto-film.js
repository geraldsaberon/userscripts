// ==UserScript==
// @name         letterboxd-goto-film
// @namespace    https://github.com/geraldsaberon/
// @version      0.1.0
// @description  Brings back the "Go to film" option in the film menu in Letterboxd.
// @author       https://github.com/geraldsaberon/
// @match        https://letterboxd.com/*
// @grant        none
// ==/UserScript==

function addGotoFilmButton(filmPosterPopmenu) {
    const buttonClass = "__goto-film";
    if (filmPosterPopmenu.querySelector(`.${buttonClass}`)) {
        return;
    }
    const filmPageLink = filmPosterPopmenu.querySelector("a[href*=watch]").href.replace("watch/", "");
    const filmPageAnchorElem = document.createElement("a");
    filmPageAnchorElem.innerText = "Go to film";
    filmPageAnchorElem.href = filmPageLink;
    const gotoFilmElem = document.createElement("li");
    gotoFilmElem.classList.add("popmenu-textitem", "-centered", buttonClass);
    gotoFilmElem.appendChild(filmPageAnchorElem);
    const popmenuItems = filmPosterPopmenu.firstChild;
    popmenuItems.insertBefore(gotoFilmElem, popmenuItems.lastChild);
}
function observerCallback(mutationList) {
    for (const { addedNodes } of mutationList) {
        const addedNode = addedNodes[0];
        if (addedNode && addedNode.classList.contains("film-poster-popmenu")) {
            addGotoFilmButton(addedNode);
        }
    }
}
const letterboxdMenuObserver = new MutationObserver(observerCallback);
letterboxdMenuObserver.observe(document.querySelector("body"), { childList: true });
