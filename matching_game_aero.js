const createCard = () => {
    return document.createElement('div').innerHTML = "testing out the scenes right here.  i guess it will just keep going"
}

const createCardScenes = () => {
    const cardScenes = []
    let cardScene
    for (let i = 0; i < 16; i++) {
        cardScene = document.createElement('div')
        cardScene.className = 'card_scene'
        cardScene.append(createCard())
        cardScenes.push(cardScene)
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