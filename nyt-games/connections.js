// ==UserScript==
// @name         New script nytimes.com
// @namespace    https://github.com/geraldsaberon/userscripts
// @version      0.1.0
// @description  Userscript for nytimes.com
// @author       https://github.com/geraldsaberon/
// @match        https://www.nytimes.com/games/connections*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

/**
 * console.logs the string form of the puzzle when you press the play button
 * `
 * [ ]PICK    [ ]MEMORY    [ ]LIMB    [ ]BISCUIT
 * [ ]TRUNK   [ ]DRUMSTICK [ ]CORN    [ ]BRANCH
 * [ ]EAR     [ ]WING      [ ]STAINED [ ]BOW
 * [ ]LINCOLN [ ]MALLET    [ ]TUSK    [ ]DIVISION
 * `
 */

setTimeout(() => {
    const playButton = document.querySelector("button[data-testid='moment-btn-play']")
    playButton.onclick = () => {
        setTimeout(() => {
            const items = []
            document.querySelectorAll("label[data-testid='card-label']").forEach(e => items.push("[ ]" + e.textContent))
            const puzzle = []
            for (let i = 0; i < items.length; i += 4) {
              puzzle.push(items.slice(i, i+4))
            }
            for (let i = 0; i < 3; i++) {
              const maxLen = Math.max(...puzzle.map(row => row[i].length))
              puzzle.forEach((_, j) => {
                const item = puzzle[j][i]
                puzzle[j][i] = `${item}${' '.repeat(maxLen-item.length)} `
              })
            }
            console.log(puzzle.join("\n").replaceAll(",", ""))
        }, 500)
    }
}, 1000)
