import React, { useState } from 'react';

const PlaylistInfo = ( { playlistData } ) => {
    const [ isTableOpen, setIsTableOpen ] = useState( false );


    if ( !playlistData || playlistData.length === 0 ) {
        return null;
    }

    const {
        channelTitle,
        thumbnails,
        title,
        publishedAt,
        updatedAt,
        playlistId,
        resourceId,
        contentDetails,
        description,
    } = playlistData[ 0 ]?.snippet;

    // console.log(playlistData)

    const totalVideos = playlistData.length;

    // Calculate total duration
    const totalDuration = playlistData.reduce(
        ( acc, item ) => acc + parseISO8601Duration( item.contentDetails.duration ),
        0
    );

    // Calculate duration at different speeds
    const speeds = [ 1.0, 1.5, 2.0, 2.5, 3.0 ];
    const durationAtSpeeds = speeds.map( ( speed ) => ( {
        speed,
        duration: formatDuration( totalDuration / speed ),
    } ) );


    return (
        <div className="bg-white p-4 mb-4 rounded-lg shadow-lg">
            <div className="mb-4">
                <div className="flex items-center justify-between space-x-3">
                    <img
                        src={thumbnails.medium.url}
                        alt={channelTitle}
                        className="w-64 h-48 rounded-md mr-4"
                    />

                    

                    <div className="mr-3">
                        <h2 className="text-3xl font-semibold mb-2">{channelTitle}</h2>
                       
                        <p className="text-gray-700 dark:text-gray-300">
                            Description/Name of Playlist: {title}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            Published At: {new Date( publishedAt ).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            Last Updated: {new Date( updatedAt ).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            {description}
                        </p>
                    </div>

                    <div className="mb-4">
                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                            Total Number of Videos: {totalVideos}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                            Total Hours of Content in Playlist: {formatDuration( totalDuration )}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <button
                    onClick={() => setIsTableOpen( !isTableOpen )}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full"
                >
                    Time required at different speeds 👇
                </button>
            </div>

            {isTableOpen && (
                <div>
                    <h3 className="text-lg font-semibold mb-2">
                        Time Required at Different Speeds:
                    </h3>
                    <table className="w-full border border-collapse border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Speed</th>
                                <th className="border p-2">Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {durationAtSpeeds.map( ( { speed, duration } ) => (
                                <tr key={speed} className="border">
                                    <td className="border p-2"> ⚡️ {speed}x</td>
                                    <td className="border p-2">{duration}</td>
                                </tr>
                            ) )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const parseISO8601Duration = ( duration ) => {
    const match = duration.match( /PT(\d+H)?(\d+M)?(\d+S)?/ );

    const hours = parseInt( match[ 1 ] ) || 0;
    const minutes = parseInt( match[ 2 ] ) || 0;
    const seconds = parseInt( match[ 3 ] ) || 0;

    return hours * 3600 + minutes * 60 + seconds;
};

const formatDuration = ( totalSeconds ) => {
    const hours = Math.floor( totalSeconds / 3600 );
    const minutes = Math.floor( ( totalSeconds % 3600 ) / 60 );
    const seconds = totalSeconds % 60;

    return `${ hours.toString().padStart( 2, '0' ) }:${ minutes
        .toString()
        .padStart( 2, '0' ) }:${ seconds.toString().padStart( 2, '0' ) }`;
};

export default PlaylistInfo;
