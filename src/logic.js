function info() {
    console.log("INFO")
    const response = {
        apiversion: "1",
        author: "apinanyogaratnam",
        color: "#512342",
        head: "default",
        tail: "default"
    }
    return response
}

function start(gameState) {
    console.log(`${gameState.game.id} START`)
}

function end(gameState) {
    console.log(`${gameState.game.id} END\n`)
}

function move(gameState) {
    let possibleMoves = {
        up: true,
        down: true,
        left: true,
        right: true
    }

    // Step 0: Don't let your Battlesnake move back on its own neck
    const myHead = gameState.you.head
    const myNeck = gameState.you.body[1]
    if (myNeck.x < myHead.x) {
        possibleMoves.left = false
    } else if (myNeck.x > myHead.x) {
        possibleMoves.right = false
    } else if (myNeck.y < myHead.y) {
        possibleMoves.down = false
    } else if (myNeck.y > myHead.y) {
        possibleMoves.up = false
    }

    // TODO: Step 1 - Don't hit walls.
    // Use information in gameState to prevent your Battlesnake from moving beyond the boundaries of the board.
    const boardWidth = gameState.board.width;
    const boardHeight = gameState.board.height;

    if (myHead.x + 1 == boardWidth) possibleMoves.right = false;
    if (myHead.x - 1 == 0) possibleMoves.left = false;
    if (myHead.y + 1 == boardHeight) possibleMoves.up = false;
    if (myHead.y - 1 == 0) possibleMoves.down = false;


    // TODO: Step 2 - Don't hit yourself.
    // Use information in gameState to prevent your Battlesnake from colliding with itself.
    const myBody = gameState.you.body
    
    for (let i=0; i<myBody.length; i++) {
        if (myHead.x + 1 == myBody[i].x) possibleMoves.right = false;
        else if (myHead.x - 1 == myBody[i].x) possibleMoves.left = false;
        if (myHead.y + 1 == myBody[i].y) possibleMoves.up = false;
        else if (myHead.y - 1 == myBody[i].y) possibleMoves.down = false;
    }

    // TODO: Step 3 - Don't collide with others.
    // Use information in gameState to prevent your Battlesnake from colliding with others.

    // TODO: Step 4 - Find food.
    // Use information in gameState to seek out and find food.

    // Finally, choose a move from the available safe moves.
    // TODO: Step 5 - Select a move to make based on strategy, rather than random.
    const safeMoves = Object.keys(possibleMoves).filter(key => possibleMoves[key])
    const response = {
        move: safeMoves[Math.floor(Math.random() * safeMoves.length)],
    }

    console.log(`${gameState.game.id} MOVE ${gameState.turn}: ${response.move}`)
    return response
}

module.exports = {
    info: info,
    start: start,
    move: move,
    end: end
}
