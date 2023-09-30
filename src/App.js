import React, { useState, useEffect } from 'react';
import InputForm from './components/InputForm';
import Checklist from './components/Checklist';
import './App.css';

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
    <div className={`container overflow-x-hidden mx-auto p-4 ${ mode === 'dark' ? 'dark' : '' }`}>
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h1 className="relative text-3xl font-semibold mb-2 md:mb-0">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-pink-500">
            Youtube Playlist Checklist
          </span>
        </h1>

        <p className='text-3xl font-extralight'>Baked with ❤️ by
          <a href="https://ashusnapx.vercel.app/" className='text-blue-700' target='__blank'> Ashutosh Kumar 📈</a></p>
      </div>
      <hr />
      <InputForm onPlaylistSubmit={handlePlaylistSubmit} />
      <Checklist apiKey={process.env.REACT_APP_YOUTUBE_API_KEY} playlistLink={playlistLink} />
    </div>
  );
}

export default App;
