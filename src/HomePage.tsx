import React, { useState } from "react";
import { Chess } from 'chess.js';
import ChessBoard from "./ChessBoard";
import BotUploader from "./BotUploader";
import EloDisplay from "./EloDisplay";
import GameControl from "./GameControl";
import './HomePage.css';

const HomePage: React.FC = () => {
    const [chess] = useState<Chess>(new Chess());
    const [currentPosition, setCurrentPosition] = useState(chess.fen());
    const [history, setHistory] = useState<string[]>([chess.fen()]);

    const updatePosition = (fen: string) => {
        setHistory(prevHistory => [...prevHistory, fen]);
        setCurrentPosition(fen);
    }

    return (
        <div>
            <h1>Welcome to ChessMastermind</h1>
            <div className="grid">
                <div>
                    <ChessBoard position={currentPosition} chess={chess} onPositionChange={updatePosition} />
                    <GameControl chess={chess} onPositionChange={setCurrentPosition} history={history}/>
                </div>
                <BotUploader />
                <EloDisplay elo={0} />
            </div>
        </div>
    );
};

export default HomePage;
