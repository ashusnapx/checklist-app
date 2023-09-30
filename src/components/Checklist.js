import React, { useState, useEffect } from 'react';
import VideoCard from './VideoCard';

const Checklist = ( { apiKey } ) => {
    const [ playlistData, setPlaylistData ] = useState( null );
    const [ progress, setProgress ] = useState(
        localStorage.getItem( 'progress' )
            ? JSON.parse( localStorage.getItem( 'progress' ) )
            : 0
    );
    const [ darkMode, setDarkMode ] = useState(
        localStorage.getItem( 'darkMode' ) === 'true'
    );

    const toggleDarkMode = () => {
        setDarkMode( ( prevDarkMode ) => !prevDarkMode );
        localStorage.setItem( 'darkMode', !darkMode );
    };

    const handleDoneClick = () => {
        setProgress( ( prevProgress ) =>
            Math.min( prevProgress + ( 100 / playlistData.length ), 100 )
        );
    };

    const handleNotDoneClick = () => {
        setProgress( ( prevProgress ) =>
            Math.max( prevProgress - ( 100 / playlistData.length ), 0 )
        );
    };

    useEffect( () => {
        const storedPlaylistLink = localStorage.getItem( 'playlistLink' );

        if ( storedPlaylistLink ) {
            // Use the stored playlistLink if available
            fetchPlaylistData( storedPlaylistLink );
        }
    }, [] );

    useEffect( () => {
        localStorage.setItem( 'progress', JSON.stringify( progress ) );
    }, [ progress ] );

    const fetchPlaylistData = ( playlistLink ) => {
        const urlParts = playlistLink.split( '?list=' );
        if ( urlParts.length !== 2 ) {
            alert( 'Invalid playlist link. Please enter a valid YouTube playlist link.' );
            return;
        }
        const playlistId = urlParts[ 1 ];

        const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${ playlistId }&key=${ apiKey }`;

        fetch( playlistUrl )
            .then( ( response ) => response.json() )
            .then( async ( data ) => {
                const videoIds = data.items.map( ( item ) => item.snippet.resourceId.videoId );
                const durations = await fetchVideoDurations( videoIds );
                const updatedPlaylistData = data.items.map( ( item, index ) => {
                    return {
                        ...item,
                        contentDetails: {
                            ...item.contentDetails,
                            duration: durations[ index ],
                        },
                    };
                } );
                setPlaylistData( updatedPlaylistData );
            } )
            .catch( ( error ) => console.error( 'Error fetching data:', error ) );
    };

    const fetchVideoDuration = async ( videoId ) => {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${ videoId }&key=${ apiKey }&fields=items/contentDetails/duration`;
        const response = await fetch( url );
        const data = await response.json();
        return data.items[ 0 ].contentDetails.duration;
    };

    const fetchVideoDurations = async ( videoIds ) => {
        const durations = await Promise.all( videoIds.map( ( id ) => fetchVideoDuration( id ) ) );
        return durations;
    };

    const handlePlaylistLinkChange = ( e ) => {
        const newPlaylistLink = e.target.value;
        localStorage.setItem( 'playlistLink', newPlaylistLink );
        fetchPlaylistData( newPlaylistLink );
    };

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4">
                <div className="relative pt-1">
                    
                    <div className="flex mb-2 items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                                Task in Progress
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-teal-600">
                                {`${ progress.toFixed( 2 ) }%`}
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
                        <div
                            style={{ width: `${ progress }%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
                        />
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Enter YouTube Playlist Link"
                    className="border p-2 w-full rounded-md border-black/70"
                    onChange={handlePlaylistLinkChange}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {playlistData &&
                    playlistData.map( ( item ) => (
                        <VideoCard
                            key={item.id}
                            video={{
                                snippet: {
                                    title: item.snippet.title,
                                    channelTitle: item.snippet.channelTitle,
                                    duration: item.contentDetails.duration,
                                    thumbnail: item.snippet.thumbnails,
                                },
                            }}
                            onDoneClick={handleDoneClick}
                            onNotDoneClick={handleNotDoneClick}
                        />
                    ) )}
            </div>

        </div>
    );
};

export default Checklist;
