// ==UserScript==
// @name         Goodreads StoryGraph Book Search
// @namespace    https://github.com/geraldsaberon/
// @version      0.1.0
// @description  Replaces the buy button on Goodreads books pages with a "Search on The StoryGraph" button
// @author       https://github.com/geraldsaberon/
// @match        https://www.goodreads.com/book/show/*
// @match        https://www.goodreads.com/*/book/show/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

document.querySelector(".BookActions__button:nth-child(2)").remove()

const bookAuthor = document.querySelector(".ContributorLink__name").textContent
const bookTitle = document.querySelector(".Text__title1").textContent
const searchTerm = encodeURIComponent(`${bookTitle} ${bookAuthor}`)

const firstBookActionElem = document.querySelector(".BookActions__button:first-child")
firstBookActionElem.insertAdjacentHTML("afterend", `<div class="BookActions__button">
    <div class="BookActions__button">
        <div class="ButtonGroup ButtonGroup--block">
            <div class="Button__container Button__container--block">
                <a class="Button Button--buy Button--medium Button--block" style="border-color: #2cb1bc !important" href="https://app.thestorygraph.com/browse?search_term=${searchTerm}" target="_blank">
                    <span class="Button__labelItem" style="color: #2cb1bc !important">Search on The StoryGraph</span>
                </a>
            </div>
        </div>
    </div>
`)
