let colorArr = []
let hexCode = "497AA9"
let mode = "analogic-complement"
let count = 5
let colorHtml = ""
let hexHtml = ""
const colorEl = document.getElementById("colorContainer")
const hexEl = document.getElementById("hexContainer")
const buttonEl = document.getElementById("submit-btn")
const colorChoice = document.getElementById("colorInput")
const modeChoice = document.getElementById("modeInput")

fetch(`https://www.thecolorapi.com/scheme?hex=${hexCode}&mode=${mode}&count=${count}`)
    .then(res => res.json())
    .then(data => {
        for (let i = 0; i < data.colors.length; i++) {
            colorArr.push(data.colors[i].hex.value)
        }
        renderColors()
    })

function renderColors() {
    colorHtml = ''
    hexHtml = ''
    for (let i = 0; i < colorArr.length; i++) {
        let currentColor = colorArr[i]
        colorHtml += `
            <div id="${i}" class="color-item"></div>
        `
        hexHtml += `
            <div id="hex${i}" class="hex">${currentColor} <img src="./images/icons8-copy-24.png" /></div>
        `
    }
    colorEl.innerHTML = colorHtml
    hexEl.innerHTML = hexHtml
    for (let i = 0; i < colorArr.length; i++) {
        let currentColor = colorArr[i]
        document.getElementById(i).style.backgroundColor = currentColor
        document.getElementById("hex"+i).addEventListener("click", () => copyHex("hex"+i))
    }
}

buttonEl.addEventListener("click", function(e) {
    e.preventDefault()
    hexCode = colorChoice.value.substring(1)
    mode = modeChoice.value
    fetch(`https://www.thecolorapi.com/scheme?hex=${hexCode}&mode=${mode}&count=${count}`)
        .then(res => res.json())
        .then(data => {
            colorArr = []
            for (let i = 0; i < data.colors.length; i++) {
                colorArr.push(data.colors[i].hex.value)
            }
            renderColors()
    })
})

function copyHex(hexNum) {
    let hexText = document.getElementById(hexNum).textContent
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = hexText;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    alert("Copied the text: " + hexText);
}