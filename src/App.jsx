import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt, faInfoCircle, faClock } from '@fortawesome/free-solid-svg-icons';

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
    const [hasWon, setHasWon] = useState(false);

    useEffect(() => {
        if (matchedCards.length === shuffledImages.length && matchedCards.length > 0) {
            setTimerActive(false);
            setHasWon(true); // Establecer que el jugador ha ganado
        }
    }, [matchedCards, shuffledImages.length]);

    const toggleRules = () => {
        setShowRules(!showRules);
    };

    useEffect(() => {
        // Iniciar el temporizador
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
        // Reiniciar todos los estados a los valores iniciales
        setShuffledImages(initializeGame());
        setFlippedCards([]);
        setMatchedCards([]);
        setTimer(0);
        setTimerActive(false);
        setHasWon(false);
    };

    const flipCard = (index) => {
        if (flippedCards.includes(index) || matchedCards.includes(index)) {
            // Evita voltear la misma carta de nuevo
            return;
        }

        const newFlippedCards = [...flippedCards, index];

        if (newFlippedCards.length === 2) {
            const match = shuffledImages[newFlippedCards[0]].image === shuffledImages[newFlippedCards[1]].image;
            
            if (match) {
                // Si las cartas coinciden, actualiza el estado de cartas coincidentes
                const newMatchedCards = [...matchedCards, ...newFlippedCards];
                setMatchedCards(newMatchedCards);

                // Restablecer las cartas volteadas
                setFlippedCards([]);
            } else {
                // Si no coinciden, voltea las cartas boca abajo después de un retraso
                setTimeout(() => {
                    setFlippedCards([]);
                }, 1000);
            }
        } else {
            setFlippedCards(newFlippedCards);
        }

        // Actualizar las cartas volteadas de inmediato
        let newShuffledImages = shuffledImages.map((card, idx) => ({
            ...card,
            isFlipped: newFlippedCards.includes(idx) || matchedCards.includes(idx)
        }));
        setShuffledImages(newShuffledImages);

        if (!timerActive && flippedCards.length === 0 && matchedCards.length === 0) {
            setTimerActive(true);
        }
    };
    
    return (
        <div className="p-8 bg-yellow-300 mx-auto">
            <div className="grid grid-cols-6 gap-4">
                {shuffledImages.map((card, index) => (
                    <div key={index} className="bg-yellow-100 rounded-md p-2 flex items-center justify-center">
                        <img
                            src={card.isFlipped ? card.image : coverImage}
                            alt={`Card ${index}`}
                            onClick={() => flipCard(index)}
                            className={card.isFlipped ? '' : 'cursor-pointer'}
                        />
                    </div>
                ))}
            </div>
            
            {hasWon && (
                <div className="win-message">
                    {/* Aquí puedes colocar tu imagen o componente de victoria */}
                    <img src="url_de_tu_imagen_de_victoria.jpg" alt="You Won!" />
                </div>
            )}
               

            <div className="mt-4 p-4 bg-white rounded-md shadow-lg flex flex-col items-center">
                <div className="flex mb-4">
                    <button onClick={resetGame} className="text-yellow-500 text-3xl">
                        <FontAwesomeIcon icon={faRedoAlt} />
                    </button>
                    <button onClick={toggleRules} className="text-yellow-500 text-3xl">
                        <FontAwesomeIcon icon={faInfoCircle} />
                    </button>
                </div>
                <ReactModal isOpen={showRules} onRequestClose={toggleRules}>
                <h2>Reglas del Juego</h2>
                <p>Aquí puedes detallar las reglas de tu juego...</p>
                <button onClick={toggleRules}>Cerrar</button>
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
