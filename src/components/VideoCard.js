import React, { useState } from 'react';

const VideoCard = ( { video, onDoneClick, onNotDoneClick } ) => {
    const { title, channelTitle, duration, thumbnail } = video.snippet;
    const [ isDone, setIsDone ] = useState(
        localStorage.getItem( `isDone_${ title }` ) === 'true'
    );

    const convertDuration = ( isoDuration ) => {
        if ( !isoDuration ) return 'N/A';
        const match = isoDuration.match( /PT(\d+H)?(\d+M)?(\d+S)?/ );

        if ( !match ) return 'N/A';

        const hours = parseInt( match[ 1 ], 10 ) || 0;
        const minutes = parseInt( match[ 2 ], 10 ) || 0;
        const seconds = parseInt( match[ 3 ], 10 ) || 0;

        return `${ String( hours ).padStart( 2, '0' ) }:${ String( minutes ).padStart(
            2,
            '0'
        ) }:${ String( seconds ).padStart( 2, '0' ) }`;
    };

    const handleDoneClick = () => {
        setIsDone( true );
        onDoneClick();
        localStorage.setItem( `isDone_${ title }`, 'true' );
    };

    const handleNotDoneClick = () => {
        setIsDone( false );
        onNotDoneClick();
        localStorage.setItem( `isDone_${ title }`, 'false' );
    };

    const openVideoInNewTab = () => {
        const videoId = video.snippet.resourceId?.videoId;
        if ( videoId ) {
            window.open( `https://www.youtube.com/watch?v=${ videoId }`, '_blank' );
        }
    };

    return (
        <div className="bg-white p-4 mb-4 rounded-lg shadow-sm border border-black/20">
            <div
                className="relative h-40 overflow-hidden mb-4 border border-red-200 p-1 rounded-md cursor-pointer"
                onClick={openVideoInNewTab}
            >
                {thumbnail && thumbnail.high && (
                    <img
                        src={thumbnail.high.url}
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                    />
                )}
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
                {channelTitle}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
                Duration: {convertDuration( duration )}
            </p>
            <div className="flex justify-between space-x-2">
                <button
                    onClick={isDone ? null : handleDoneClick}
                    className={`flex-1 bg-green-500 text-white px-4 py-2 rounded-full ${ isDone ? 'bg-opacity-50 cursor-not-allowed' : ''
                        }`}
                    disabled={isDone}
                >
                    Done
                </button>
                <button
                    onClick={!isDone ? null : handleNotDoneClick}
                    className={`flex-1 bg-red-500 text-white px-4 py-2 rounded-full ${ !isDone ? 'bg-opacity-50 cursor-not-allowed' : ''
                        }`}
                    disabled={!isDone}
                >
                    Not Done
                </button>
            </div>
        </div>
    );
};

export default VideoCard;
