let penize = Number(localStorage.getItem("penize")) || 100;

/* Coinflip hra */
let poplatek = 5;

let minceData = {
  "50": { label: "50 Kč", value: 50 },
  "zidovska": { label: "Židovská koruna", value: 200 },
  "zlata": { label: "Zlatá mince", value: 500 }
}

function updatemince() {
  let vyber = document.getElementById("vyberMince")
  let vybrana = document.getElementById("vybranaMince")
  let mince = minceData[vyber.value]
  if (vybrana && mince) vybrana.innerText = mince.label
}



function hodMinci() {
  let mince = document.getElementById("mince")
  let penizeP = document.getElementById("penize")
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
      penize += minc.value
      vysledek.innerText = `Padla hlava, přidáno ${minc.value} Kč.`
    } else {
      penize -= minc.value
      vysledek.innerText = `Padl orel, odebráno ${minc.value} Kč.`
    }
    penize -= poplatek
    penizeP.innerText = penize
    tlacitko.disabled = false

    // ULOŽENÍ: Jakmile se peníze změní a vypíšou, uložíme nový stav
    localStorage.setItem("penize", penize);

  }, 3000)
}

document.addEventListener("DOMContentLoaded", function() {
  if (document.getElementById("vyberMince")) aktualizujVybranouMinci()
  obnovitPenizeZobrazeni()
})