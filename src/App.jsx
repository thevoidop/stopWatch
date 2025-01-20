import { useState } from "react";
import "./App.css";

function App() {
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);
    const [ms, setMs] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [laps, setLaps] = useState([]);

    const resetTimer = () => {
        clearInterval(intervalId);
        setMin(0);
        setSec(0);
        setMs(0);
        setIsRunning(false);
        const stateImage = document.getElementById("stateImage");
        stateImage.src = "/icons/play.svg";
    };

    const initiateTimer = () => {
        const stateImage = document.getElementById("stateImage");
        if (isRunning) {
            clearInterval(intervalId);
            setIsRunning(false);
            stateImage.src = "/icons/play.svg";
        } else {
            const id = setInterval(() => {
                setMs((prevMs) => {
                    if (prevMs >= 99) {
                        setSec((prevSec) => {
                            if (prevSec >= 59) {
                                setMin((prevMin) => prevMin + 1);
                                return 0;
                            }
                            return prevSec + 1;
                        });
                        return 0;
                    }
                    return prevMs + 1;
                });
            }, 10);
            setIntervalId(id);
            setIsRunning(true);
            stateImage.src = "/icons/stop.svg";
        }
    };

    const formatTime = (min, sec, ms) => {
        const pad = (num) => (num < 10 ? "0" + num : num);
        return `${pad(min)}:${pad(sec)}.${ms < 10 ? "0" + ms : ms}`;
    };

    const storeLaps = () => {
        const lapTime = formatTime(min, sec, ms);
        setLaps((prevLaps) => [...prevLaps, lapTime]);
    };

    const clearLaps = () => {
        setLaps([]);
    };

    return (
        <>
            <section className="heading bg-white text-center text-5xl font-bold flex justify-center items-center h-[10dvh]">
                stopWatch
            </section>
            <section className="stopWatch bg-black min-h-[90dvh] text-white flex p-10 flex-col items-center">
                <div className="roundClock text-center flex justify-center items-center border-[8px] border-white rounded-full w-[300px] h-[300px]">
                    <span className="timeElapsed text-5xl font-bold">
                        {formatTime(min, sec, ms)}
                    </span>
                </div>
                <button
                    className="bg-white hover:bg-gray-500 text-black px-11 py-2 mt-6 font-bold text-4xl rounded-full"
                    onClick={storeLaps}
                >
                    LAP
                </button>
                <div className="controlButtons flex gap-14 justify-center items-center mt-10">
                    <button
                        className="bg-white hover:bg-gray-500 h-20 w-20 p-4 rounded-full"
                        onClick={initiateTimer}
                    >
                        <img src="/icons/play.svg" id="stateImage" />
                    </button>
                    <button
                        className="bg-white hover:bg-gray-500 h-20 w-20 p-4 rounded-full"
                        onClick={resetTimer}
                    >
                        <img src="/icons/reset.svg" />
                    </button>
                </div>
                {laps.length > 0 && (
                    <div className="laps border-t border-white mt-5 w-1/2 text-center flex flex-col justify-center items-center">
                        <button
                            className="bg-white text-black mt-3 p-3 rounded-full font-bold"
                            onClick={clearLaps}
                        >
                            Clear Laps
                        </button>
                        {laps.map((lap, index) => (
                            <div
                                key={index}
                                className="lapItem flex gap-14 font-bold text-2xl p-2"
                            >
                                <span>Lap {index + 1}</span>
                                <span>{lap}</span>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}

export default App;
