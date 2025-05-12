import shedIcon from '../assets/icons/shed.svg';

const Game = () => {

    return (
        <nav className="w-full h-full flex flex-col justify-center items-center bg-blue-300">
            <img className="w-16 rotate-8" src={shedIcon} alt="Shed Icon" />
            <h1 className='text-white font-bold text-6xl'>Affichage du jeux</h1>
        </nav>
    )
}
export default Game