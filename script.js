let penize = 100
let poplatek = 5

function hodMinci() {
  let mince = document.getElementById("mince")
  let penizeP = document.getElementById("penize")
  let vysledek = document.getElementById("vysledek")
  let tlacitko = document.querySelector("button[onclick='hodMinci()']")

  mince.style.animation = "none"
  void mince.offsetWidth
  let jeHlava = Math.random() <= 0.5
  if (jeHlava) {
    mince.style.animation = "flip-hlava 3s forwards"
  } else {
    mince.style.animation = "flip-orel 3s forwards"
  }

  if (tlacitko) {
    tlacitko.disabled = true
  }
  vysledek.innerText = "Točí se..."

  setTimeout(function() {
    if (jeHlava) {
      penize += 10
      vysledek.innerText = "Padla hlava, přidáno 10 Kč."
    } else {
      penize -= 10
      vysledek.innerText = "Padl orel, odebráno 10 Kč."
    }
    penize -= poplatek
    penizeP.innerText = penize
    if (tlacitko) {
      tlacitko.disabled = false
    }
  }, 3000)
}
