import {useState, useEffect, useRef} from 'react';

const audios = [
    { id: 1, name: 'Just The Way You Are', url: '/musics/Bruno Mars - Just The Way You Are.mp3' },
    { id: 2, name: 'Синие Фиалки', url: '/musics/The Limba - Синие Фиалки.mp3' },
    { id: 3, name: 'Витаминка', url: '/musics/Тима Белорусских - Витаминка.mp3' },
    { id: 4, name: 'Какая Ты Красивая', url: '/musics/Akha - Какая Ты Красивая.mp3' },
    { id: 15, name: "Sex, Drugs, Etc.", url: "/musics/Beach Weather - Sex, Drugs, Etc..mp3" },
    { id: 5, name: 'С неба', url: '/musics/ELMAN & TRIDA - С неба.mp3' },
    { id: 6, name: 'Тает Лёд', url: '/musics/Грибы - Тает Лёд.mp3' },
    { id: 7, name: 'Оружие', url: '/musics/Пицца - Оружие.mp3' },
    { id: 10, name: "Cry", url: "/musics/Cigarettes After Sex - Cry.mp3" },
    { id: 9, name: "I'm Yours", url: "/musics/Jason Mraz - I'm Yours.mp3" },
    { id: 11, name: "Heavy", url: "/musics/The Marías - Heavy.mp3" },
    { id: 12, name: "Here With Me", url: "/musics/d4vd - Here With Me.mp3" },
    { id: 8, name: 'Любите Девушки', url: '/musics/Скриптонит & Therr Maitz - Любите Девушки (LAB с Антоном Беляевым).mp3' },
    { id: 13, name: "Deep Green", url: "/musics/Christian Kuria - Deep Green.mp3" },
    { id: 14, name: "L.O.V.E.U", url: "/musics/d4vd & Hannah Bahng - L.O.V.E.U.mp3" },
    { id: 15, name: "No Queda Na", url: "/musics/Babi & Marc Segu - No Queda Na.mp3" },
    { id: 16, name: "Ты как кислород", url: "/musics/Janaga -  Ты как кислород.mp3" },
    { id: 17, name: "Дарите женщинам цветы", url: "/musics/Jazzdauren - Дарите женщинам цветы.mp3" },
    { id: 17, name: "Татынакайым", url: "/musics/Бек Борбиев - Татынакайым.mp3" },
];

export function Player() {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const audioRef = useRef<HTMLAudioElement>(null);

    const currentTrack = audios[currentTrackIndex];

    const togglePlayPause = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

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

    // Обработчики событий аудио
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleEnded = () => {
        playNext();
    };

    const handleSeek = (e: any) => {
        const seekTime = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = seekTime;
            setCurrentTime(seekTime);
        }
    };

    const handleVolumeChange = (e: any) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return '0:00';

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (audioRef.current && isPlaying) {
            audioRef.current.play();
        }
    }, [currentTrackIndex]);
    return (
        <>
            <audio
                ref={audioRef}
                src={currentTrack.url}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
            />

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
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.2rem'
                    }}>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1rem'}}>{currentTrack.name}</h3>
                            <p style={{ margin: 0, fontSize: '0.6rem', color: '#aaa' }}>
                                {currentTrackIndex + 1} из {audios.length}
                            </p>
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            width: '150px'
                        }}>
                            <img src={"/assets/sound-down.svg"} width={20} height={20} alt=""/>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                style={{ width: '100%' }}
                            />
                            <img src={"/assets/sound-up.svg"} width={20} height={20} alt=""/>
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        width: '100%'
                    }}>
                        <span style={{ fontSize: '0.9rem', minWidth: '40px' }}>
                          {formatTime(currentTime)}
                        </span>

                        <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            value={currentTime}
                            onChange={handleSeek}
                            style={{ flex: 1 }}
                        />

                        <span style={{ fontSize: '0.9rem', minWidth: '40px' }}>
              {formatTime(duration)}
            </span>
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '1.5rem',
                        marginTop: '0.2rem'
                    }}>
                        <button
                            onClick={playPrevious}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'white',
                                fontSize: '1.5rem',
                                cursor: 'pointer'
                            }}
                        >
                            <img src={"/assets/prev.svg"} width={24} height={24} alt=""/>
                        </button>

                        <button
                            onClick={togglePlayPause}
                            style={{
                                background: '#4CAF50',
                                border: 'none',
                                borderRadius: '50%',
                                width: '50px',
                                height: '50px',
                                color: 'white',
                                cursor: 'pointer',
                                position: 'relative',
                            }}
                        >
                            {isPlaying ? <img
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '25px',
                                    height: '25px',
                                }}
                                src={"/assets/pause.svg"} alt="pause"/>
                                :
                                <img
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '25px',
                                        height: '25px',
                                        marginLeft: "2px"
                                }}
                            src={"/assets/play.svg"} alt="pause"/>
                        }
                        </button>

                        <button
                            onClick={playNext}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'white',
                                fontSize: '1.5rem',
                                cursor: 'pointer'
                            }}
                        >
                            <img src={"/assets/next.svg"} width={24} height={24} alt=""/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}