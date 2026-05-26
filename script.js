// 1. Načtení peněz z paměti (pokud tam nejsou, dáme 100)
let penize = Number(localStorage.getItem("penize")) || 100
document.getElementById("cash").innerText = penize

let poplatek = 5
let interval = null
let velikost = 100
let aktivniHra = false

// Data pro jednotlivé mince
let minceData = {
  "10kč": { label: "10 Kč", win: 10, loss: 10, fee: 5, headSrc: "img/head_10.png", tailSrc: "img/tail_10.png" },
  "50kč": { label: "50 Kč", win: 50, loss: 50, fee: 20, headSrc: "img/head_50.png", tailSrc: "img/tail_50.png" },
  "zidcoin": { label: "Židovská koruna", win: 200, loss: 200, fee: 50, headSrc: "img/head_zidovska.png", tailSrc: "img/tail_zidovska.png" },
  "goldcoin": { label: "Zlatá mince", win: 500, loss: 500, fee: 100, headSrc: "img/head_zlata.png", tailSrc: "img/tail_zlata.png" }
}

function aktualizujVybranouMinci() {
  let vyber = document.getElementById("vyberMince")
  if (!vyber) return
  let vybrana = document.getElementById("vybranaMince")
  let pop = document.getElementById("poplatek")
  let hlavaImg = document.querySelector("#mince .hlava img")
  let orelImg = document.querySelector("#mince .orel img")
  let mince = minceData[vyber.value]
  vybrana.innerText = mince.label
  pop.innerText = mince.fee
  hlavaImg.src = mince.headSrc
  orelImg.src = mince.tailSrc
}

function hodMinci() {
  let minceElement = document.getElementById("mince")
  let penizeP = document.getElementById("cash")
  let vysledek = document.getElementById("vysledek")
  let tlacitko = document.querySelector("button[onclick='hodMinci()']")
  if (!tlacitko) return
  let vyber = document.getElementById("vyberMince")
  let vybranaMinc = minceData[vyber.value]

  if (penize < vybranaMinc.fee) {
    vysledek.innerText = "Nemáš dost peněz!"
    return
  }

  minceElement.style.animation = "none"
  void minceElement.offsetWidth
  
  let jeHlava = Math.random() <= 0.5
  if (jeHlava) {
    minceElement.style.animation = "flip-hlava 3s forwards"
  } else {
    minceElement.style.animation = "flip-orel 3s forwards"
  }

  tlacitko.disabled = true
  vysledek.innerText = "Točí se..."

  setTimeout(function() {
    if (jeHlava) {
      penize += vybranaMinc.win
      vysledek.innerText = "Padla hlava, přidáno " + vybranaMinc.win + " Kč."
    } else {
      penize -= vybranaMinc.loss
      vysledek.innerText = "Padl orel, odebráno " + vybranaMinc.loss + " Kč."
    }
    penize -= vybranaMinc.fee
    penizeP.innerText = penize
    tlacitko.disabled = false

    localStorage.setItem("penize", penize)
  }, 3000)
}

document.addEventListener("DOMContentLoaded", function() {
  aktualizujVybranouMinci()
})

function pujcitPenize() {
  let input = document.getElementById("pujckaInput")
  let castka = Number(input.value)
  let zprava = document.getElementById("zpravaoPujcce")
  let cashEl = document.getElementById("cash")

  if (!castka || castka <= 0) {
    zprava.innerText = "Zadej prosím platnou částku."
    return
  }

  penize += castka
  cashEl.innerText = penize
  zprava.innerText = "Úspěšně si vypůjčeno " + castka + " Kč. Máš teď " + penize + " Kč."
  localStorage.setItem("penize", penize)
  input.value = ""
}