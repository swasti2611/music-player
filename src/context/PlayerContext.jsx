import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial state

    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);

    const audioRef = useRef(null);
    const seekBg = useRef(null);
    const seekBar = useRef(null);
    
    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    });

    const play = () => {
        audioRef.current.play();
        audioRef.current.volume = 0.1; // Set the volume
        setPlayStatus(true);
    };

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    };

    const previous = () => {
        if (track.id > 0) {
            setTrack(songsData[track.id - 1]);
            play(); // Play the previous track
        }
    };

    const next = () => {
        if (track.id < songsData.length - 1) {
            setTrack(songsData[track.id + 1]);
            play(); // Play the next track
        }
    };

    const playWithId = (id) => {
        setTrack(songsData[id]);
        play(); // Play the selected track
    };

    const seekSong = (e) => {
        if (audioRef.current) {
            audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
        }
    };

    useEffect(() => {
        const updateSeekBar = () => {
            if (audioRef.current) {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime * 100 / audioRef.current.duration)) + "%";
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                });
            }
        };

        const intervalId = setInterval(updateSeekBar, 1000); // Update every second

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, [audioRef, seekBar]); // Added seekBar as a dependency to avoid stale closures

    const contextValue = {
        audioRef, track, setTrack, playStatus, setPlayStatus, next, previous, play, pause, playWithId, seekBar, seekBg, seekSong, time, isLoggedIn, login, logout
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
