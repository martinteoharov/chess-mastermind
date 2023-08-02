window.getNextMove = (chess) => {
    // For simplicity, our bot will just make the first legal move it can find
    console.log("BOT WAS CALLED");
    console.log(chess);

    if (chess) {
        const moves = chess.moves();
        chess.move(moves[0]);
        return chess.fen();
    }
};