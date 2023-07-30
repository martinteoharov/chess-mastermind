import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';

interface GameControlProps {
    chess: Chess;
    history: string[];
    onPositionChange: (fen: string) => void;
}

const GameControl: React.FC<GameControlProps> = ({ chess, onPositionChange, history }) => {
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        setIndex(history.length - 1);
    }, [history]);

    const handleNext = () => {
        if (index < history.length - 1) {
            const newIndex = index + 1;
            setIndex(newIndex);
            const fen = history[newIndex];
            onPositionChange(fen);
        }
    };

    const handlePrevious = () => {
        if (index > 0) {
            const newIndex = index - 1;
            setIndex(newIndex);
            const fen = history[newIndex];
            onPositionChange(fen);
        }
    };

    return (
        <div>
            <button onClick={handleNext}>Next</button>
            <button onClick={handlePrevious}>Previous</button>
        </div>
    );
};

export default GameControl;
