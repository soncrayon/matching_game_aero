let intermediateMoves = 0
let totalMoves = 0
let successfulMoves = 0 
let timerActive = false
let flippedCardClass = null 

const exitModalWithoutResettingGame = () => {
    document.querySelector('.game_won_modal').remove()
    document.querySelector('.game_won_modal_background').remove()
    alert('Click the refresh icon in the upper right if you want to play again or simply refresh the web page.')
}

const resetGame = () => {
  location.reload(); 
}

const playAgainBtn = () => {
    const btnDiv = document.createElement('div')
    btnDiv.style.display = "flex"
    btnDiv.style.justifyContent = "center"
    const btn = document.createElement('button')
    btn.innerHTML = "Play Again"
    btn.style.width = "10rem"
    btn.style.height = "5rem"
    btn.addEventListener('click', resetGame)
    btnDiv.append(btn)
    return btnDiv
}

const gameWonModalText = () => {
    const txt = document.createElement('div')
    txt.style.height = "80%"
    txt.style.width = "100%"
    txt.style.display = "flex"
    txt.style.flexDirection = "column"
    txt.style.justifyContent = "center"
    textline1 = document.createElement('div')
    textline1.style.textAlign = "center"
    textline1.innerHTML = `You've won the game!`
    textline2 = document.createElement('div')
    textline2.style.textAlign = "center"
    textline2.innerHTML = `Here are your stats:`
    textline3 = document.createElement('div')
    textline3.style.textAlign = "center"
    textline3.innerHTML = `Moves: ${document.getElementById('moves_number').innerHTML}`
    textline4 = document.createElement('div')
    textline4.style.textAlign = "center"
    textline4.innerHTML = `Time: ${document.getElementById('timer_clock_minutes').innerHTML}:${document.getElementById('timer_clock_seconds').innerHTML}`
    textline5 = document.createElement('div')
    textline5.style.textAlign = "center"
    textline5.innerHTML = `Rating: ${document.getElementsByClassName('rating_star').length}`
    txt.append(textline1)
    txt.append(textline2)
    txt.append(textline3)
    txt.append(textline4)
    txt.append(textline5)
    return txt
}

const gameCloseIcon = () => {
    const iconDiv = document.createElement('div')
    iconDiv.style.alignContent = "left"
    iconDiv.style.height = "5%"
    iconDiv.style.width = "100%"
    const iconImage = document.createElement('img')
    iconImage.alt = "close_modal"
    iconImage.src = "https://img.icons8.com/material-rounded/16/000000/delete-sign.png"
    iconImage.addEventListener('click', exitModalWithoutResettingGame)
    iconDiv.append(iconImage)
    return iconDiv
}

const gameWonModal = () => {
    const modal = document.createElement('div')
    const styles = {
        "width":"50vw",
        "height":"50vh",
        "backgroundColor":"white",
        "opacity":"1",
        "borderStyle":"solid",
        "zIndex":"2",
        "padding":"2%",
        "display":"flex",
        "flexDirection":"column",
        "justifyContent":"center",
        "position":"absolute",
        "marginTop":"10%",
        "borderRadius":"2rem"
    }
    modal.className = "game_won_modal"
    Object.assign(modal.style, styles)
    modal.append(gameCloseIcon())
    modal.append(gameWonModalText())
    modal.append(playAgainBtn())
    return modal
}

const gameWonBackground = () => {
    const background = document.createElement('div')
    const styles = {
        "width":"100vw",
        "height":"100vh",
        "backgroundColor":"black",
        "opacity":"0.6",
        "position":"fixed"
    }
    background.className = 'game_won_modal_background'
    Object.assign(background.style, styles)
    return background
}

const showGameWonModal = () => {
    document.querySelector('body').append(gameWonBackground())
    document.querySelector('body').append(gameWonModal())
}

const checkForGameWin = () => {
    setTimeout(function(){
        if (successfulMoves === 8) {
            timerActive = false 
            document.querySelectorAll('.card').forEach((card) => {
                card.parentNode.classList.toggle('animate__animated')
                card.parentNode.classList.toggle('animate__rubberBand')
            })
            setTimeout(function(){
                document.querySelectorAll('.card').forEach((card) => {
                    card.parentNode.classList.toggle('animate__animated')
                    card.parentNode.classList.toggle('animate__rubberBand')
                })
                showGameWonModal()
            }, 500)
        }
    }, 500)
}

const resetCardsAfterMismatch = () => {
    setTimeout(function(){
        document.querySelectorAll('.active').forEach((card) => {
            card.parentNode.classList.toggle('animate__animated')
            card.parentNode.classList.toggle('animate__shakeX')
            card.classList.toggle('active')
            card.style.transform = 'none'
            card.addEventListener('click', executeCardFlip)
        })
        flippedCardClass = null 
    }, 1000)
}

const handleMismatch = () => { 
    document.querySelectorAll('.active').forEach((card) => {
        setTimeout(function(){
            card.parentNode.classList.toggle('animate__animated');
            card.parentNode.classList.toggle('animate__shakeX');
        }, 500)
    })
    resetCardsAfterMismatch()
}

const handleMatch = () => { 
    document.querySelectorAll('.active').forEach((card) => {
        card.parentNode.classList.toggle('animate__animated')
        card.parentNode.classList.toggle('animate__rubberBand')
        card.classList.toggle('active')
    })
    flippedCardClass = null 
    successfulMoves++ 
    checkForGameWin()
}

const checkForCardMatch = (event) => {
    if (flippedCardClass === event.target.parentNode.parentNode.className) {
       return handleMatch()
    }
    return handleMismatch()
}

const checkAndAdjustRating = (event) => {
    if (totalMoves === 12 || 
        totalMoves === 20 || 
        totalMoves === 28 || 
        totalMoves === 36) {
        document.querySelector('.rating_star').remove()
    }
    checkForCardMatch(event)
}

const incrementTotalMoves = (event) => {
    totalMoves++
    document.getElementById('moves_number').innerHTML = totalMoves
    checkAndAdjustRating(event)
}

const handleMove = (event) => {
    intermediateMoves++
    if (intermediateMoves === 1) {
        flippedCardClass = event.target.parentNode.parentNode.className
    }
    if (intermediateMoves === 2){
        intermediateMoves = 0
        incrementTotalMoves(event)
    }
}

const incrementMinutes = () => {
    document.getElementById('timer_clock_minutes').innerHTML++
}

const padSeconds = (seconds, length = 2) => {
    let secondsString = '' + seconds
    while (secondsString.length < length) {
        secondsString = '0' + secondsString
    }
    return document.getElementById('timer_clock_seconds').innerHTML = secondsString
}

const incrementSeconds = () => {
    let seconds = document.getElementById('timer_clock_seconds').innerHTML
    seconds++
    padSeconds(seconds)
}

setInterval(function runTimer (){
    let seconds = document.getElementById('timer_clock_seconds').innerHTML
    if(timerActive === true) {
        if (seconds === '59') {
            document.getElementById('timer_clock_seconds').innerHTML = '00'
            return incrementMinutes()
        } 
        return incrementSeconds()
    }
}, 1000)

const startTimer = (event) => {
    timerActive = true 
    handleMove(event)
}

const createCardBackImage = () => {
    let cardBackImage = document.createElement('img')
    cardBackImage.src = 'card_design1 copy.jpg'
    cardBackImage.alt = 'card back image'
    return cardBackImage
}

const createCardFrontImage = (image) => {
    let cardFrontImage = document.createElement('img')
    cardFrontImage.src = image
    cardFrontImage.alt = "card front image"
    return cardFrontImage
}

const createCardBack = () => {
    let cardBack = document.createElement('div')
    cardBack.className = "card_face card_face_back"
    cardBack.append(createCardBackImage())
    return cardBack
}

const createCardFront = (image) => {
    let cardFront = document.createElement('div')
    cardFront.className = "card_face card_face_front"
    cardFront.append(createCardFrontImage(image))
    return cardFront
}

const flipCard = (event) => {
    event.target.parentNode.parentNode.style.transform = "rotateY(180deg)"
    event.target.parentNode.parentNode.classList.toggle("active")
    event.target.parentNode.parentNode.removeEventListener('click', executeCardFlip)
}

const executeCardFlip = (event) => {
    flipCard(event)
    if (timerActive === false) {
        return startTimer(event)
    }
    return handleMove(event);
}

const createCard = (obj) => {
    let card = document.createElement('div')
    card.className = `card ${obj.id}`
    card.append(createCardBack())
    card.append(createCardFront(obj.image_url))
    card.addEventListener('click', executeCardFlip)
    return card
}

const getCardImageObjects = () => {
    let cardObjects = []
    for (let i = 0; i < 2; i++) {
        [
            {id: 1, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Japanese_Hiragana_kyokashotai_NE.svg/240px-Japanese_Hiragana_kyokashotai_NE.svg.png"},
            {id: 2, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Japanese_Hiragana_kyokashotai_NU.svg/240px-Japanese_Hiragana_kyokashotai_NU.svg.png"},
            {id: 3, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Japanese_Hiragana_kyokashotai_NO.svg/240px-Japanese_Hiragana_kyokashotai_NO.svg.png"},
            {id: 4, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Japanese_Hiragana_kyokashotai_HA.svg/240px-Japanese_Hiragana_kyokashotai_HA.svg.png"},
            {id: 5, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Japanese_Hiragana_kyokashotai_NA.svg/240px-Japanese_Hiragana_kyokashotai_NA.svg.png"},
            {id: 6, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Japanese_Hiragana_kyokashotai_TE.svg/240px-Japanese_Hiragana_kyokashotai_TE.svg.png"},
            {id: 7, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Japanese_Hiragana_kyokashotai_TI.svg/240px-Japanese_Hiragana_kyokashotai_TI.svg.png"},
            {id: 8, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Japanese_Hiragana_kyokashotai_MA.svg/240px-Japanese_Hiragana_kyokashotai_MA.svg.png"}
        ].forEach((obj) => {
            cardObjects.push(obj)
        })
    }
   
    
    // implement the Fisher-Yates algorithm to randomize the cards on each game load 
    for (let i = cardObjects.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = cardObjects[i]
        cardObjects[i] = cardObjects[j]
        cardObjects[j] = temp
    }
    return cardObjects
}

const createCardScenes = () => {
    const cardScenes = []
    let cardScene
    getCardImageObjects().forEach((obj) => {
        cardScene = document.createElement('div')
        cardScene.className = 'card_scene'
        cardScene.append(createCard(obj))
        cardScenes.push(cardScene)
    }) 
    return cardScenes
}

const addRefreshListener = () => {
    document.getElementById("refresh").addEventListener('click', resetGame)
}

const loadGame = (cardScenes) => {
    addRefreshListener()
    cardScenes.forEach((cardScene) => {
        document.getElementById('game_board').append(cardScene)   
    })
}

window.addEventListener('DOMContentLoaded', (event) => {
    loadGame(createCardScenes());
})
