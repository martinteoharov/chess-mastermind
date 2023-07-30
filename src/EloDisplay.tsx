// EloDisplay.tsx
import React from 'react';

interface EloDisplayProps {
    elo: number;
}

const EloDisplay: React.FC<EloDisplayProps> = ({ elo }) => {
    return (
        <div>
            <h2>Your Bot's ELO</h2>
            <p>{elo}</p>
        </div>
    );
};

export default EloDisplay;
