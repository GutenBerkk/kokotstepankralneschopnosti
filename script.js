// NAČTENÍ: Pokud v localStorage peníze jsou, načti je (převeď na číslo). Pokud ne, nastav 100.
let penize = Number(localStorage.getItem("penize")) || 100;

let poplatek = 5;
let interval = null;
let velikost = 100;
let aktivniHra = false;

// Hned po načtení skriptu vypíšeme uložené peníze do HTML (aby tam nesvítila stará hodnota z HTML)
// Tento řádek spusť až poté, co se ujistíš, že element s id "penize" v HTML už existuje
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("penize").innerText = penize;
});

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
      penize -= 10
      vysledek.innerText = "Padl orel, odebráno 10 Kč."
    } else {
      penize += 10
      vysledek.innerText = "Padla hlava, přidáno 10 Kč."
    }
    penize -= poplatek
    penizeP.innerText = penize
    tlacitko.disabled = false

    // ULOŽENÍ: Jakmile se peníze změní a vypíšou, uložíme nový stav
    localStorage.setItem("penize", penize);

  }, 3000)
}