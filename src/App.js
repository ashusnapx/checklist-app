import React, { useState, useEffect } from 'react';
import InputForm from './components/InputForm';
import Checklist from './components/Checklist';

function App() {
  const [ playlistLink, setPlaylistLink ] = useState( '' );
  const [ mode, setMode ] = useState( localStorage.getItem( 'mode' ) || 'light' );

  const handlePlaylistSubmit = ( link ) => {
    setPlaylistLink( link );
  };

  useEffect( () => {
    document.documentElement.classList.add( mode );
    return () => {
      document.documentElement.classList.remove( mode );
    };
  }, [ mode ] );

  const toggleDarkMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode( newMode );
    localStorage.setItem( 'mode', newMode );
  };

  return (
    <div className={`container mx-auto p-4 ${ mode === 'dark' ? 'dark' : '' }`}>
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h1 className='text-3xl font-bold mb-2 md:mb-0'>Youtube Playlist Checklist</h1>
        <div className="flex items-center space-x-3">
          <p className='text-3xl font-extralight'>Baked with ❤️ by Ashutosh Kumar</p>
          <div className='flex items-center justify-between space-x-3'>
            <a href="https://github.com/ashusnapx" className="bg-black text-white/80 px-4 py-2 rounded-full">
              Github
            </a>
            <a href="https://www.linkedin.com/in/ashusnapx/" className="bg-black text-white/80 px-4 py-2 rounded-full">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <hr />
      <InputForm onPlaylistSubmit={handlePlaylistSubmit} />
      <Checklist apiKey={process.env.REACT_APP_YOUTUBE_API_KEY} playlistLink={playlistLink} />
    </div>
  );
}

export default App;
