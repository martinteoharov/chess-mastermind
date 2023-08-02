// BotUploader.tsx
import React from 'react';

interface BotUploadProps {
    handleBotUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const BotUploader: React.FC<BotUploadProps> = ({ handleBotUpload }) => {
    return (
        <div>
            <h2>Upload your bot</h2>
            <input type="file" onChange={handleBotUpload} />
        </div>
    );
};

export default BotUploader;
