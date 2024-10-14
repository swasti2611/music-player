import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faHouse, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Musice from "../../assets/music.png";

const Sidebar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            {/* Full Sidebar for Large Screens */}
            <div className='w-[15%] h-full flex-col text-white hidden lg:flex bg-black'>
                <div className='flex items-center justify-between p-4 bg-[#121212]'>
                    <img src={Musice} className='h-10' alt="Music App" />
                </div>
                <div className='flex flex-col p-4 space-y-4'>
                    <Link to="/" className='flex items-center hover:bg-[#FF5656] p-2 rounded'>
                        <FontAwesomeIcon icon={faHouse} className='mr-2' />
                        Home
                    </Link>
                    <Link to="/settings" className='flex items-center hover:bg-[#FF5656] p-2 rounded'>
                        <FontAwesomeIcon icon={faGear} className='mr-2' />
                        Settings
                    </Link>
                    {/* Removed login/logout functionality */}
                </div>
            </div>

            {/* Mobile Menu Button */}
            <div className='flex lg:hidden p-4 bg-[#121212]'>
                <button onClick={toggleMenu}>
                    <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
                </button>
            </div>

            {/* Mobile Sidebar */}
            {isMenuOpen && (
                <div className='absolute top-0 left-0 w-full h-full bg-black z-10 lg:hidden'>
                    <div className='flex flex-col p-4 space-y-4'>
                        <Link to="/" className='flex items-center hover:bg-[#FF5656] p-2 rounded'>
                            <FontAwesomeIcon icon={faHouse} className='mr-2' />
                            Home
                        </Link>
                        <Link to="/settings" className='flex items-center hover:bg-[#FF5656] p-2 rounded'>
                            <FontAwesomeIcon icon={faGear} className='mr-2' />
                            Settings
                        </Link>
                        {/* Removed login/logout functionality */}
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
