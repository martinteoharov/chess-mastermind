import React, { useEffect, useState } from "react";
import { Chess } from 'chess.js';
import ChessBoard from "./ChessBoard";
import BotUploader from "./BotUploader";
import EloDisplay from "./EloDisplay";
import GameControl from "./GameControl";
import './HomePage.css';

interface Window {
    getNextMove?: (chess: Chess) => string;
}

const HomePage: React.FC = () => {
    const [chess] = useState<Chess>(new Chess());
    const [currentPosition, setCurrentPosition] = useState(chess.fen());
    const [history, setHistory] = useState<string[]>([chess.fen()]);

    const [bot, setBot] = useState<Function | null>(null);

    const updateMove = (fen: string) => {
        setHistory(prevHistory => [...prevHistory, fen]);
        setCurrentPosition(fen);

        if (bot) {
            const newPosition = bot(chess).fen();
            setCurrentPosition(newPosition);
            setHistory(prevHistory => [...prevHistory, newPosition]);
        }
    }

    const handleBotUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                // TODO: figure out proper typescript support and secure code injections
                await eval(e.target?.result as string);
                setBot((window as any).getNextMove);
            };
            reader.readAsText(file);
        }
    }

    return (
        <div>
            <h1>Welcome to ChessMastermind</h1>
            <div className="grid">
                <div>
                    <ChessBoard position={currentPosition} chess={chess} onPositionChange={updateMove} />
                    <GameControl chess={chess} onPositionChange={updateMove} history={history} />
                </div>
                <BotUploader handleBotUpload={handleBotUpload} />
                <EloDisplay elo={0} />
            </div>
        </div>
    );
};

export default HomePage;
