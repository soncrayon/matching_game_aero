let intermediateMoves = 0
let totalMoves = 0
let successfulMoves = 0 
let timerActive = false
let flippedCardClass = null 

// const exitModalWithoutRefreshingGame = () => {

// }

// const refreshGame = () => {
//     // need to append an event listener for this function to the refresh icon in the upper right of game board 
// }

// const showGameWonModal = () => {
//     // create appropriate dom elements and set styling in css file 
//     // create buttons for continue/quit actions and apply event handlers 
//     // conditionals here for whether the player chooses to refresh the game or exit the modal without refreshing either by clicking the "no" button or "x" to close
//     // pull the "x" from icon8 
// }

const checkForGameWin = () => {
    if (successfulMoves === 8) {
        // won game logic goes here
        console.log('you won the game')
        timerActive === false 
        // showGameWonModal()
    }
}

const resetCardsAfterMismatch = () => {
    setTimeout(function(){
        document.querySelectorAll('.active').forEach((card) => {
            card.parentNode.classList.toggle('animate__animated')
            card.parentNode.classList.toggle('animate__shakeX')
            card.classList.toggle('active')
            card.style.transform = 'none'
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
        card.removeEventListener('click', executeCardFlip)
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
    cardBackImage.src = 'https://background-tiles.com/overview/black/patterns/large/1035.png'
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
    let cardObjects = [
            {id: 1, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Japanese_Hiragana_kyokashotai_NE.svg/240px-Japanese_Hiragana_kyokashotai_NE.svg.png"},
            {id: 2, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Japanese_Hiragana_kyokashotai_NU.svg/240px-Japanese_Hiragana_kyokashotai_NU.svg.png"},
            {id: 3, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Japanese_Hiragana_kyokashotai_NO.svg/240px-Japanese_Hiragana_kyokashotai_NO.svg.png"},
            {id: 4, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Japanese_Hiragana_kyokashotai_HA.svg/240px-Japanese_Hiragana_kyokashotai_HA.svg.png"},
            {id: 5, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Japanese_Hiragana_kyokashotai_NA.svg/240px-Japanese_Hiragana_kyokashotai_NA.svg.png"},
            {id: 6, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Japanese_Hiragana_kyokashotai_TE.svg/240px-Japanese_Hiragana_kyokashotai_TE.svg.png"},
            {id: 7, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Japanese_Hiragana_kyokashotai_TI.svg/240px-Japanese_Hiragana_kyokashotai_TI.svg.png"},
            {id: 8, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Japanese_Hiragana_kyokashotai_MA.svg/240px-Japanese_Hiragana_kyokashotai_MA.svg.png"}
    ]
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
    for (let i = 0; i < 2; i++) {
        getCardImageObjects().forEach((obj) => {
            cardScene = document.createElement('div')
            cardScene.className = 'card_scene'
            cardScene.append(createCard(obj))
            cardScenes.push(cardScene)
        }) 
    }
    return cardScenes
}

const loadGame = (cardScenes) => {
    cardScenes.forEach((cardScene) => {
        document.getElementById('game_board').append(cardScene)   
    })
}

window.addEventListener('DOMContentLoaded', (event) => {
    loadGame(createCardScenes());
})
