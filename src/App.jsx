import React, { useContext } from 'react';
import { PlayerContext } from './context/PlayerContext';
import Sidebar from './components/Sidebar/Sidebar';
import Player from './components/Player/Player';
import Display from './components/Display/Display';


const App = () => {
 

  return (
    <div className="h-screen bg-custom-gradient">
    
        <div className="h-[100%] flex">
          <Sidebar className="w-1/4" />
          <Display className="w-[70%]" />
          <Player className="w-[30%] bg-custom-red" />
        </div>
     
       
     
    </div>
  );
};

export default App;
