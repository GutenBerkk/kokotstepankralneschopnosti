let penize = 100
let poplatek = 5
let interval = null
let velikost = 100
let aktivniHra = false

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
  }, 3000)
}

function zacniNafukovat() {
  if (penize < poplatek && !aktivniHra) {
    document.getElementById("vysledek").innerText = "Nemáš dost peněz!"
    return
  }

  if (!aktivniHra) {
    penize -= poplatek
    document.getElementById("penize").innerText = penize
    aktivniHra = true
  }

  document.getElementById("vysledek").innerText = "Riskuj a drž..."

  interval = setInterval(function() {
    if (Math.random() < 0.02) {
      praskni()
      return
    }

    velikost += 3
    document.getElementById("koleckoGame").style.transform = `scale(${velikost / 100})`
    
    let moznaVyhra = Math.floor(poplatek * (velikost / 100))
    document.getElementById("Nasobitel").innerText = `Možná výhra: ${moznaVyhra} Kč`
  }, 50)
}

function pustiKolecko() {
  if (!aktivniHra) return

  clearInterval(interval)
  
  let moznaVyhra = Math.floor(poplatek * (velikost / 100))
  penize += moznaVyhra
  
  document.getElementById("penize").innerText = penize
  document.getElementById("vysledek").innerText = `Vybral jsi výhru ${moznaVyhra} Kč!`
  
  resetKolecka()
}

function praskni() {
  clearInterval(interval)
  document.getElementById("koleckoGame").style.display = "none"
  document.getElementById("vysledek").innerText = "💥 PRASKLO TO!"
  
  setTimeout(function() {
    document.getElementById("koleckoGame").style.display = "block"
    resetKolecka()
  }, 2000)
}

function resetKolecka() {
  velikost = 100
  aktivniHra = false
  document.getElementById("koleckoGame").style.transform = "scale(1)"
  document.getElementById("Nasobitel").innerText = "Možná výhra: 0 Kč"
}

window.onmouseup = pustiKolecko
window.ontouchend = pustiKolecko