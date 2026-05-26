// 1. Načtení peněz z paměti (pokud tam nejsou, dáme 100)
let penize = Number(localStorage.getItem("penize")) || 100
document.getElementById("cash").innerText = penize

let poplatek = 5
let interval = null
let velikost = 100
let aktivniHra = false

function hodMinci() {
  let mince = document.getElementById("mince")
  let penizeP = document.getElementById("cash") // Změněno na cash podle navigace
  let vysledek = document.getElementById("vysledek")
  let tlacitko = document.querySelector("button[onclick='hodMinci()']")

  if (penize < poplatek) {
    vysledek.innerText = "Nemáš dost peněz!"
    return
  }

  mince.style.animation = "none"
  void mince.offsetWidth
  
  let jeHlava = Math.random() <= 0.5
  if (jeHlava) {
    mince.style.animation = "flip-hlava 3s forwards"
  } else {
    mince.style.animation = "flip-orel 3s forwards"
  }

  tlacitko.disabled = true
  vysledek.innerText = "Točí se..."

  setTimeout(function() {
    if (jeHlava) {
      penize -= 10
      vysledek.innerText = "Padl orel, odebráno 10 Kč."
    } else {
      penize += 20
      vysledek.innerText = "Padla hlava, přidáno 20 Kč."
    }
    penize -= poplatek
    penizeP.innerText = penize
    tlacitko.disabled = false

    // 2. Uložení aktuálních peněz po skončení hodu
    localStorage.setItem("penize", penize)
  }, 3000)
}