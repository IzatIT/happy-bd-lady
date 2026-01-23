import {useState, useEffect, useRef} from 'react';
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const audios = [
    { id: 3, name: 'Витаминка', url: '/musics/Тима Белорусских - Витаминка.mp3' },
    { id: 13, name: "Deep Green", url: "/musics/Christian Kuria - Deep Green.mp3" },
    { id: 2, name: 'Синие Фиалки', url: '/musics/The Limba - Синие Фиалки.mp3' },
    { id: 1, name: 'Just The Way You Are', url: '/musics/Bruno Mars - Just The Way You Are.mp3' },
    { id: 15, name: "Sex, Drugs, Etc.", url: "/musics/Beach Weather - Sex, Drugs, Etc..mp3" },
    { id: 4, name: 'Какая Ты Красивая', url: '/musics/Akha - Какая Ты Красивая.mp3' },
    { id: 5, name: 'С неба', url: '/musics/ELMAN & TRIDA - С неба.mp3' },
    { id: 6, name: 'Тает Лёд', url: '/musics/Грибы - Тает Лёд.mp3' },
    { id: 11, name: "Heavy", url: "/musics/The Marías - Heavy.mp3" },
    { id: 7, name: 'Оружие', url: '/musics/Пицца - Оружие.mp3' },
    { id: 9, name: "I'm Yours", url: "/musics/Jason Mraz - I'm Yours.mp3" },
    { id: 12, name: "Here With Me", url: "/musics/d4vd - Here With Me.mp3" },
    { id: 10, name: "Cry", url: "/musics/Cigarettes After Sex - Cry.mp3" },
    { id: 8, name: 'Любите Девушки', url: '/musics/Скриптонит & Therr Maitz - Любите Девушки (LAB с Антоном Беляевым).mp3' },
    { id: 14, name: "L.O.V.E.U", url: "/musics/d4vd & Hannah Bahng - L.O.V.E.U.mp3" },
    { id: 15, name: "No Queda Na", url: "/musics/Babi & Marc Segu - No Queda Na.mp3" },
    { id: 16, name: "Ты как кислород", url: "/musics/Janaga -  Ты как кислород.mp3" },
    { id: 17, name: "Дарите женщинам цветы", url: "/musics/Jazzdauren - Дарите женщинам цветы.mp3" },
    { id: 17, name: "Татынакайым", url: "/musics/Бек Борбиев - Татынакайым.mp3" },
];

export function Player() {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const currentTrack = audios[currentTrackIndex];


    const playNext = () => {
        const nextIndex = (currentTrackIndex + 1) % audios.length;
        setCurrentTrackIndex(nextIndex);
        setIsPlaying(true);
    };

    const playPrevious = () => {
        const prevIndex = (currentTrackIndex - 1 + audios.length) % audios.length;
        setCurrentTrackIndex(prevIndex);
        setIsPlaying(true);
    };


    useEffect(() => {
        if (audioRef.current && isPlaying) {
            audioRef.current.play();
        }
    }, [currentTrackIndex]);
    return (
        <>
            <div style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(26, 26, 26, 0.2)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                padding: '1rem',
                zIndex: 1000,
                borderTop: '1px solid #333',
                boxShadow: '0 -2px 10px rgba(0,0,0,0.3)'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.2rem',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1rem'}}>{currentTrack.name}</h3>
                        <p style={{ margin: 0, fontSize: '0.6rem', color: '#aaa' }}>
                            {currentTrackIndex + 1} из {audios.length}
                        </p>
                    </div>
                    <AudioPlayer
                        style={{
                            background: "none",
                            color: "white",
                        }}
                        autoPlay
                        src={currentTrack.url}
                        onClickPrevious={playPrevious}
                        onClickNext={playNext}
                        showSkipControls
                        showJumpControls={false}
                    />
                </div>
            </div>
        </>
    );
}