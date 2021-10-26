import {
    FaSearch,
    FaHashtag,
    FaRegBell,
    FaUserCircle,
    FaMoon,
    FaSun,
  } from 'react-icons/fa';
import useDarkMode from "../../hooks/useDarkMode";

const TopNavigation = () => {
    return (
        <div className="navigation-bar justify-items-center">
            <Title/>
            <Search/>
            <DarkModeToggle></DarkModeToggle>
        </div>
    )
};

const DarkModeToggle = () => {
    const [darkTheme, setDarkTheme] = useDarkMode();
    const handleMode = () => setDarkTheme(!darkTheme);

    return (
        <span onClick={() => handleMode()}>
            {
                darkTheme ? (
                    <FaSun size='24' className='navigation-bar-icon' />
                ) : (
                    <FaMoon size='24' className='navigation-bar-icon' />
                )
            }
        </span>
    )
}

const Title = () => {
    return (
        <h5 className="title"> Alexandre Lamarre </h5>
    )
};

const Search = () => (
    <div className='search'>
      <input className='search-input' type='text' placeholder='Search...' />
      <FaSearch size='18' className='text-secondary my-auto' />
    </div>
);



export default TopNavigation;