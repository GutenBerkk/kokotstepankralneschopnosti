let penize = Number(localStorage.getItem("penize")) || 100
document.getElementById("cash").innerText = penize

let poplatek = 5
let interval = null
let velikost = 100
let aktivniHra = false

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
  let mince = document.getElementById("mince")
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

function ruleta(vybrano) {
  let padla = Math.random() < 0.5 ? "cerna" : "cervena"
  
  if (padla === "cerna") {
    document.getElementById("padla").innerText = "Černá"
  } else {
    document.getElementById("padla").innerText = "Červená"
  }

  let sazka = Number(document.getElementById("sazka").value)
  let vysledekRuleta = document.getElementById("vysledekRuleta")

  if (sazka > penize) {
    vysledekRuleta.innerText = "Nemáš dost peněz na tuto sázku!"
    return
  }
  
  if (sazka <= 0) {
    vysledekRuleta.innerText = "Sázka musí být kladná!"
    return
  }

  if (vybrano === padla) {
    penize += sazka
    vysledekRuleta.innerText = "Vyhrál jsi " + sazka + " Kč!"
  } else {
    penize -= sazka
    vysledekRuleta.innerText = "Prohrál jsi " + sazka + " Kč!"
  }

  document.getElementById("cash").innerText = penize
  localStorage.setItem("penize", penize)
}

function pujcitPenize() {
  let castka = Number(document.getElementById("pujckaInput").value)
  let zprava = document.getElementById("zpravaoPujcce")

  if (castka <= 0) {
    zprava.innerText = "Musíš zadat kladnou částku!"
    return
  }

  penize += castka
  document.getElementById("cash").innerText = penize
  localStorage.setItem("penize", penize)
  zprava.innerText = "Úspěšně sis půjčil " + castka + " Kč!"
}
