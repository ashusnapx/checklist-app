import React, { useState } from 'react';

const InputForm = ( { onPlaylistSubmit } ) => {
    const [ playlistLink, setPlaylistLink ] = useState( '' );

    const handleSubmit = ( e ) => {
        e.preventDefault();
        onPlaylistSubmit( playlistLink );
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            
        </form>
    );
};

export default InputForm;
