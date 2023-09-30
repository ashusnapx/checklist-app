import React, { useState} from 'react';
import InputForm from './components/InputForm';
import Checklist from './components/Checklist';
import './App.css';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const [ playlistLink, setPlaylistLink ] = useState( '' );

  const handlePlaylistSubmit = ( link ) => {
    setPlaylistLink( link );
  };

  return (
    <div className={`container overflow-x-hidden mx-auto p-4 `}>
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h1 className="relative text-3xl font-semibold mb-2 md:mb-0">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-pink-500">
            Youtube Playlist Checklist
          </span>
        </h1>
        <Analytics />
        <p className='text-3xl font-extralight'>Baked with ❤️ by
          <a href="https://ashusnapx.vercel.app/" className='text-blue-700' target='__blank'> Ashutosh Kumar 📈</a></p>
      </div>
      <hr />
      <InputForm onPlaylistSubmit={handlePlaylistSubmit} />
      <Checklist apiKey={process.env.REACT_APP_YOUTUBE_API_KEY} playlistLink={playlistLink} />
      {console.log( process.env.REACT_APP_YOUTUBE_API_KEY )}
    </div>
  );
}

export default App;
