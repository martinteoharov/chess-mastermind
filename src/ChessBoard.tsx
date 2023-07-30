import React, { useState } from 'react';
import { Chess, Square } from 'chess.js';

import './ChessBoard.css';

type Piece = 'p' | 'r' | 'n' | 'b' | 'q' | 'k' | 'P' | 'R' | 'N' | 'B' | 'Q' | 'K' | null;

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const pieces = {
    'p': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/45px-Chess_pdt45.svg.png',
    'r': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/45px-Chess_rdt45.svg.png',
    'n': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/45px-Chess_ndt45.svg.png',
    'b': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/45px-Chess_bdt45.svg.png',
    'q': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/45px-Chess_qdt45.svg.png',
    'k': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/45px-Chess_kdt45.svg.png',
    'P': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/45px-Chess_plt45.svg.png',
    'R': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/45px-Chess_rlt45.svg.png',
    'N': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/45px-Chess_nlt45.svg.png',
    'B': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/45px-Chess_blt45.svg.png',
    'Q': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/45px-Chess_qlt45.svg.png',
    'K': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/45px-Chess_klt45.svg.png',
};


interface ChessBoardProps {
    position: string;
    chess: Chess;
    onPositionChange: (fen: string) => void;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ position, chess, onPositionChange }) => {
    const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
    const [moveError, setMoveError] = useState<string>("");

    const handleSquareClick = (file: string, rank: number) => {
        const square = (file + rank) as Square;

        if (selectedSquare === square) {
            setSelectedSquare(null);  // Deselect if the same square is clicked
        } else if (selectedSquare) {
            try {
                if (chess.move({ from: selectedSquare, to: square })) {
                    onPositionChange(chess.fen());
                }
            } catch (e: any) {
                setMoveError(e);
            }
            setSelectedSquare(null);
        } else {
            setSelectedSquare(square);
        }
    };

    const rows = position.split(' ')[0].split('/');

    // Transform the rows into squares with pieces
    const transformedRows = rows.map((row) =>
        Array.from(row).flatMap((char) =>
            isNaN(parseInt(char)) ? [char] : Array(parseInt(char)).fill(null)
        )
    );

    return (
        <>
            <h1 style={{color: "green"}}>
                {`${chess.isCheckmate() ? `${chess.turn() === 'w' ? 'Black' : 'White'} wins` : ""}`}
            </h1>
            <div className="chessboard">
                {transformedRows.map((row, i) => (
                    <div key={i} className="row">
                        {row.map((piece: Piece, j: number) => {
                            const file = files[j];
                            const rank = 8 - i;
                            return (
                                <div
                                    key={`${file}${rank}`}
                                    className={`square ${j % 2 === i % 2 ? 'light' : 'dark'} ${selectedSquare === (file + rank) ? 'selected' : ''}`}
                                    onClick={() => handleSquareClick(file, rank)}
                                >
                                    {piece && <img src={pieces[piece]} alt="" />}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            <p style={{ color: "red" }}>
                {`${moveError}`}
            </p>
        </>
    );
};

export default ChessBoard;