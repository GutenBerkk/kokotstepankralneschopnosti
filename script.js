let penize = Number(localStorage.getItem("penize"))
if (isNaN(penize) || penize <= 0) {
  penize = 100
  localStorage.setItem("penize", penize)
}

let cash = document.getElementById("cash")
if (cash) cash.innerText = penize

let pPoints = 0, dPoints = 0, bSazka = 0, bBezi = false
let poplatek = 5
let interval = null
let velikost = 100
let aktivniHra = false
let pocetHer = 0

let minceData = {
  "10kč": { label: "10 Kč", win: 10, loss: 10, fee: 5, headSrc: "img/head_10.png", tailSrc: "img/tail_10.png" },
  "50kč": { label: "50 Kč", win: 50, loss: 50, fee: 20, headSrc: "img/head_50.png", tailSrc: "img/tail_50.png" },
  "frankcoin": { label: "Frankova koruna", win: 67.67, loss: 677.67, fee: 67, headSrc: "img/head_frank.png", tailSrc: "img/tail_frank.png" },
  "zidcoin": { label: "Židovská koruna", win: 200, loss: 200, fee: 50, headSrc: "img/head_zidcoin.png", tailSrc: "img/tail_zidcoin.png" },
  "goldcoin": { label: "Zlatá mince", win: 500, loss: 500, fee: 100, headSrc: "img/head_goldzid.png", tailSrc: "img/tail_goldzid.png" },
}

function updateCash() {
  if (cash) cash.innerText = penize
  localStorage.setItem("penize", penize)
}

function updatecoin() {
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
//ahoj
function hodMinci() {
  let mince = document.getElementById("mince")
  let vysledek = document.getElementById("vysledek")
  let tlacitko = document.querySelector("button[onclick='hodMinci()']")
  if (!tlacitko) return
  
  let vyber = document.getElementById("vyberMince")
  let vybranaMinc = minceData[vyber.value]

  if (penize < vybranaMinc.fee) {
    vysledek.innerText = "Nemáš dost peněz na poplatek!"
    return
  }

  penize -= vybranaMinc.fee
  updateCash()

  mince.style.animation = "none"
  void mince.offsetWidth
  
  let jeHlava = Math.random() <= 0.5
  if (jeHlava) {
    mince.style.animation = "flip-orel 3s forwards"
  } else {
    mince.style.animation = "flip-hlava 3s forwards"
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
    
    tlacitko.disabled = false
    updateCash() // Uložení výsledku hodu
  }, 3000)
}
// ruleta 
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

  updateCash()
}

function pujcitPenize() {
  let castka = Number(document.getElementById("pujckaInput").value)
  let zprava = document.getElementById("zpravaoPujcce")

  if (castka <= 0) {
    zprava.innerText = "Musíš zadat kladnou částku!"
    return
  }

  penize += castka
  zprava.innerText = "Úspěšně sis půjčil " + castka + " Kč!"
  updateCash()
}

function startBlackjack() {
  if (bBezi) return
  
  bSazka = Number(document.getElementById("sazkaBlackjack").value)
  if (isNaN(bSazka) || bSazka <= 0 || bSazka > penize) {
    document.getElementById("vysledekBlackjack").innerText = "Chyba sázky!"
    return
  }

  penize -= bSazka
  updateCash()
  bBezi = true

  pPoints = Math.floor(Math.random() * 10) + 2 + Math.floor(Math.random() * 10) + 2
  dPoints = Math.floor(Math.random() * 10) + 2
  
  document.getElementById("playerHand").innerText = pPoints
  document.getElementById("dealerHand").innerText = dPoints
  document.getElementById("vysledekBlackjack").innerText = "Hraješ..."

  if (pPoints === 21) {
    konecBJ("Blackjack!", 2.5)
    return 
  }
}

function hit() {
  if (!bBezi) return
  pocetHer++
  if(pocetHer == 1)
  {
    pPoints += Math.floor(Math.random() * 10) + 2
    while(pPoints == 22)
    {
      pPoints += Math.floor(Math.random() * 10) + 2
    }
  }
  pPoints += Math.floor(Math.random() * 10) + 2
  document.getElementById("playerHand").innerText = pPoints
  
  if (pPoints > 21) {
    konecBJ("Moc! Prohra.", 0)
  }
}

function stand() {
  if (!bBezi) return
  
  while (dPoints < 17) {
    dPoints += Math.floor(Math.random() * 10) + 2
  }
  document.getElementById("dealerHand").innerText = dPoints

  if (dPoints > 21 || pPoints > dPoints) {
    konecBJ("Výhra!", 2)
  } else if (pPoints < dPoints) {
    konecBJ("Prohra.", 0)
  } else {
    konecBJ("Remíza.", 1)
  }
}

function konecBJ(txt, nasobek) {
  bBezi = false
  penize += Math.floor(bSazka * nasobek)
  document.getElementById("vysledekBlackjack").innerText = txt
  document.getElementById("playerHand").innerText = " "
  document.getElementById("dealerHand").innerText = " "
  updateCash()
}