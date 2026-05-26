let penize = Number(localStorage.getItem("penize")) || 100
document.getElementById("cash").innerText = penize

let poplatek = 5
let interval = null
let velikost = 100
let aktivniHra = false

function hodMinci() {
  let mince = document.getElementById("mince")
  let penizeP = document.getElementById("cash")
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
    localStorage.setItem("penize", penize)
  }, 3000)
}

function ruleta(vybrano) {
  let padla = Math.random() < 0.5 ? "Černá" : "Červená"
  document.getElementById("padla").innerText = padla
  let sazka = Number(document.getElementById("sazka").value)

  if (sazka > penize) {
    alert("Nemáš dost peněz na tuto sázku!")
    return
  }
  
  if (sazka <= 0) {
    alert("Sázka musí být kladná!")
    return
  }

  let padlaUpraveno = padla.toLowerCase().replace("č", "c")

  if (vybrano === padlaUpraveno) {
    penize += sazka
  } else {
    penize -= sazka
  }

  document.getElementById("cash").innerText = penize
  localStorage.setItem("penize", penize)
}
