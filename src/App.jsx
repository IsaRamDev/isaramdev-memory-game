import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt, faInfoCircle, faClock } from '@fortawesome/free-solid-svg-icons';
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

    useEffect(() => {
        let images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
        images = [...images, ...images];

        images.sort(() => 0.5 - Math.random());
        setShuffledImages(images);
    }, []);

    return (
        <div className="p-8 bg-yellow-300 mx-auto">
            <div className="grid grid-cols-6 gap-4">
                {shuffledImages.map((image, index) => (
                    <div key={index} className="bg-yellow-100 rounded-md p-2 flex items-center justify-center">
                        <img src={image} alt={`Card ${index}`} />
                    </div>
                ))}
            </div>

            <div className="mt-4 p-4 bg-white rounded-md shadow-lg flex flex-col items-center">
                <div className="flex mb-4">
                    <button className="text-yellow-500 text-3xl">
                        <FontAwesomeIcon icon={faRedoAlt} />
                    </button>
                    <button className="text-yellow-500 text-3xl ml-6">
                        <FontAwesomeIcon icon={faInfoCircle} />
                    </button>
                </div>
                <div className="flex items-center mb-4">
                    <div className="text-2xl text-yellow-500">
                        <FontAwesomeIcon icon={faClock} />
                    </div>
                    <div className="text-black ml-2">
                        00:14
                    </div>
                </div>
                <div className="flex items-center">
                    <img src="https://placehold.co/64x64" alt="Purple monster cartoon character with yellow eyes" className="rounded-full border border-yellow-500 p-1" />
                    <div className="text-xs text-yellow-500 ml-2">Best Time</div>
                </div>
            </div>
        </div>
    )
}

export default App
