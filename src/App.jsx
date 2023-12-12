import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt, faPuzzlePiece, faCog, faInfoCircle, faClock } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <div className="p-8 w-full h-full mx-auto bg-yellow-300">
        <div className="grid grid-cols-6 gap-4">
            <div className="bg-yellow-100 rounded-md p-auto flex items-center justify-center">1</div>
            <div className="bg-yellow-100 rounded-md p-8 flex items-center justify-center">2</div>
            <div className="bg-yellow-100 rounded-md p-8 flex items-center justify-center">3</div>
            <div className="bg-yellow-100 rounded-md p-8 flex items-center justify-center">4</div>
            <div className="bg-yellow-100 rounded-md p-8 flex items-center justify-center">5</div>
            <div className="bg-yellow-100 rounded-md p-8 flex items-center justify-center">6</div>
            <div className="bg-yellow-100 rounded-md p-8 flex items-center justify-center">7</div>
            <div className="bg-yellow-100 rounded-md p-8 flex items-center justify-center">8</div>
            <div className="bg-yellow-100 rounded-md p-8 flex items-center justify-center">9</div>
            <div className="bg-yellow-100 rounded-md p-8 flex items-center justify-center">10</div>
            <div className="bg-yellow-100 rounded-md p-8 flex items-center justify-center">11</div>
            <div className="bg-yellow-100 rounded-md p-8 flex items-center justify-center">12</div>
            <div className="bg-yellow-100 rounded-md p-8 flex items-center justify-center">13</div>
            <div className="bg-yellow-100 rounded-md p-8 flex items-center justify-center">14</div>
            <div className="bg-yellow-100 rounded-md p-8 flex items-center justify-center">15</div>
            <div className="bg-yellow-100 rounded-md p-8 flex items-center justify-center">16</div>
            <div className="bg-yellow-100 rounded-md p-8 flex items-center justify-center">17</div>
            <div className="bg-yellow-100 rounded-md p-8 flex items-center justify-center">18</div>
        </div>

        <div className="mt-4 p-4 bg-white rounded-md shadow-lg flex flex-col items-center">
        <div className="flex mb-4">
                <button className="text-yellow-500 text-3xl">
                    <FontAwesomeIcon icon={faRedoAlt} />
                </button>
                <button className="text-yellow-500 text-3xl ml-2">
                    <FontAwesomeIcon icon={faPuzzlePiece} />
                </button>
                <button className="text-yellow-500 text-3xl ml-2">
                    <FontAwesomeIcon icon={faCog} />
                </button>
                <button className="text-yellow-500 text-3xl ml-2">
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
                <img src="https://placehold.co/64x64" alt="Purple monster cartoon character with yellow eyes" className="rounded-full border border-yellow-500 p-1"/>
                <div className="text-xs text-yellow-500 ml-2">Best Time</div>
            </div>
        </div>
    </div>
  )
}

export default App
