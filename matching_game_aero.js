const createCardBackImage = () => {
    let cardBackImage = document.createElement('img')
    cardBackImage.src = 'https://img.icons8.com/officel/16/000000/edit.png'
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

const toggleCardFlip = (event) => {
    console.log (event.target.className)
    // if (event.target.className = "card animate__animated animate__flip") {
    //     return event.target.className = "card animate__animated animate__flip" 
    // } 
    // return event.target.className = "card animate__animated animate__flip"
}

const createCard = (obj) => {
    let card = document.createElement('div')
    card.className = "card animate__animated animate__flipInY"
    card.id = obj.id
    card.innerHTML = "I need some text here to get the card to open up I think.  This will be replaced by an image later."
    card.append(createCardFront(obj.image_url))
    card.append(createCardBack())
    card.addEventListener('click', (event) => {
        toggleCardFlip(event)
    })
    return card
}

const getCardImageObjects = () => {
    let cardObjects = [
            {id: 1, image_url: "https://img.icons8.com/officel/16/000000/sun.png"},
            {id: 2, image_url: "https://img.icons8.com/officel/16/000000/toolbox.png"},
            {id: 3, image_url: "https://img.icons8.com/officel/16/000000/music.png"},
            {id: 4, image_url: "https://img.icons8.com/officel/16/000000/binoculars.png"},
            {id: 5, image_url: "https://img.icons8.com/officel/16/000000/key.png"},
            {id: 6, image_url: "https://img.icons8.com/officel/16/000000/idea.png"},
            {id: 7, image_url: "https://img.icons8.com/officel/16/000000/checkmark.png"},
            {id: 8, image_url: "https://img.icons8.com/officel/16/000000/home.png"}
    ]
    for (let i = cardObjects.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = cardObjects[i]
        cardObjects[i] = cardObjects[j]
        cardObjects[j] = temp
    }
    console.log(cardObjects)
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
    // use for loop to do the below 16 times 
    // create a tile ("scene" div) div and assign variable
    // create a card div and append to tile div
    // assign appropriate class names to the above
    // create card back and card front divs and assign variables, add classes (card image and card back/front)
    // create front and back images, add event listeners, classes, ids, and append where needed

    // pass the return value of createCardScenes to the below createCardScenes()
    cardScenes.forEach((cardScene) => {
        document.getElementById('game_board').append(cardScene)   
    })
}

window.addEventListener('DOMContentLoaded', (event) => {
    loadGame(createCardScenes());
})


// TODO: take a look at animate.css for game effects including flipping cards 