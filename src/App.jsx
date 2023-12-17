import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt, faInfoCircle, faClock } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

import coverImage from './assets/cover.png';
import img1 from './assets/001.png';
import img2 from './assets/002.png';
import img3 from './assets/003.png';
import img4 from './assets/004.png';
import img5 from './assets/005.png';
import img6 from './assets/006.png';
import img7 from './assets/007.png';
import img8 from './assets/008.png';
import img9 from './assets/009.png';

function App() {
    const [shuffledImages, setShuffledImages] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [timer, setTimer] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [showRules, setShowRules] = useState(false);
    const [canFlip, setCanFlip] = useState(true);


    useEffect(() => {
        if (matchedCards.length === shuffledImages.length && matchedCards.length > 0) {
            setTimerActive(false);
            setTimeout(() => {
                Swal.fire({
                    title: "¡Great job!",
                    text: "¡You won!",
                    icon: "success"
                }).then((result) => {
                    if (result.isConfirmed) {
                        resetGame();
                    }
                });
            }, 500);
        }
    }, [matchedCards, shuffledImages.length]);
    

    const toggleRules = () => {
        setShowRules(!showRules);
    };

    useEffect(() => {
        let interval;
        if (timerActive) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [timerActive]);
 
    useEffect(() => {
        let images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
        images = [...images, ...images];

        const initializedCards = images.map((image, index) => ({
            id: index,
            image: image,
            isFlipped: false
        }));

        initializedCards.sort(() => 0.5 - Math.random());
        setShuffledImages(initializedCards);
    }, []);

    const initializeGame = () => {
        let images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
        images = [...images, ...images];

        const initializedCards = images.map((image, index) => ({
            id: index,
            image: image,
            isFlipped: false
        }));

        initializedCards.sort(() => 0.5 - Math.random());
        return initializedCards;
    };

    useEffect(() => {
        setShuffledImages(initializeGame());
    }, []);

    const resetGame = () => {
        setShuffledImages(initializeGame());
        setFlippedCards([]);
        setMatchedCards([]);
        setTimer(0);
        setTimerActive(false);
    };

    useEffect(() => {
        if (flippedCards.length === 2) {
            const match = shuffledImages[flippedCards[0]].image === shuffledImages[flippedCards[1]].image;
            
            if (match) {
                const newMatchedCards = [...matchedCards, ...flippedCards];
                setMatchedCards(newMatchedCards);
                setFlippedCards([]);
                setCanFlip(true);
            } else {
                setTimeout(() => {
                    setFlippedCards([]);
                    setCanFlip(true);
                }, 500);
            }
            
        }
    }, [flippedCards, matchedCards, shuffledImages]);    
    
    const flipCard = (index) => {
        if (!canFlip || flippedCards.includes(index) || matchedCards.includes(index)) {
            return;
        }
    
        const newFlippedCards = [...flippedCards, index];
        setFlippedCards(newFlippedCards);
    
        let newShuffledImages = shuffledImages.map((card, idx) => ({
            ...card,
            isFlipped: newFlippedCards.includes(idx) || matchedCards.includes(idx)
        }));
        setShuffledImages(newShuffledImages);
    
        if (newFlippedCards.length === 1) {
            setCanFlip(false);
            setTimeout(() => {
                setCanFlip(true);
            }, 1000);
        }
    
        if (!timerActive && flippedCards.length === 0 && matchedCards.length === 0) {
            setTimerActive(true);
        }
    };
    

    return (
        <div className="p-8 bg-yellow-300 sm:px-60 px-5">
            <div className="grid sm:grid-cols-6 grid-cols-3 sm:gap-4 gap-2">
                {shuffledImages.map((card, index) => (
                    <div key={index} className="bg-yellow-100 rounded-md m-auto sm:p-2 p-1 h-32 w-24 sm:h-40 sm:w-32 flex items-center justify-center">
                        <img
                            src={card.isFlipped ? card.image : coverImage}
                            alt={`Card ${index}`}
                            onClick={() => flipCard(index)}
                            className={card.isFlipped ? '' : 'cursor-pointer'}
                        />
                    </div>
                ))}
            </div>

            <div className="mt-4 p-4 bg-white rounded-md shadow-lg flex flex-col items-center">
                <div className="flex mb-4">
                    <button onClick={resetGame} className="text-yellow-500 text-3xl">
                        <FontAwesomeIcon icon={faRedoAlt} />
                    </button>
                    <button onClick={toggleRules} className="text-yellow-500 text-3xl ml-4">
                        <FontAwesomeIcon icon={faInfoCircle} />
                    </button>
                </div>

                <ReactModal 
                    isOpen={showRules} 
                    onRequestClose={toggleRules}
                    className="bg-yellow-100 rounded-lg p-6 mx-auto my-12 shadow-lg"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-30"
                >
                    <h2 className="text-lg font-bold text-yellow-600 mb-4">Reglas del Juego</h2>
                    <br></br>
                    <p className="text-gray-700">
                        Bienvenido al juego de memoria. Aquí están las reglas para jugar:
                        <ul className="list-disc list-inside">
                        <br></br>
                            <li>El tablero consiste en una serie de cartas volteadas boca abajo.</li>
                            <li>En cada turno, el jugador voltea dos cartas, intentando encontrar pares coincidentes.</li>
                            <li>Si las cartas coinciden, se retiran del tablero y el jugador gana un punto.</li>
                            <li>Si no coinciden, se vuelven a colocar boca abajo y es el turno del siguiente jugador.</li>
                            <li>El juego continúa hasta que se hayan encontrado todos los pares.</li>
                            <li>El objetivo es recordar la ubicación de las cartas para hacer coincidir los pares más rápidamente.</li>
                            <li>¡El jugador que encuentre más pares es el ganador!</li>
                        </ul>
                        <br></br>
                        <br></br>
                    </p>
                    <div className='text-right'>
                        <button 
                            onClick={toggleRules}
                            className="bg-yellow-400 hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cerrar
                        </button>
                    </div>
                </ReactModal>

                 <div className="flex items-center mb-4">
                    <div className="text-2xl text-yellow-500">
                        <FontAwesomeIcon icon={faClock} />
                    </div>
                    <div className="text-black ml-2">
                        {new Date(timer * 1000).toISOString().substr(11, 8)}
                    </div>
                </div>
                <div className="flex items-center">
                    <img src="https://static.guiainfantil.com/pictures/articulos2/43000/43811-el-monstruo-merlin-un-bonito-cuento-para-ninos.jpg" alt="" className="h-20 w-20 rounded-full border border-yellow-500 p-1" />
                </div>
            </div>
        </div>
    )
}

export default App
