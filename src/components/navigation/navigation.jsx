import {
    FaSearch,
    FaMoon,
    FaSun,
  } from 'react-icons/fa';
import useDarkMode from "../../hooks/useDarkMode";

const TopNavigation = () => {
    return (
        <div className="navigation-bar justify-items-center">
            <Title/>
            <About/>
            <Resume/>
            <Search/>
            <DarkModeToggle></DarkModeToggle>
        </div>
    )
};

const About = () => {
    return (
        <div className="navigation-text-button">
            <span>

            </span>
        </div>
    );
};

const Resume = () => {
    return (
        <div className ="navigation-text-button">
            <span>
                
            </span>
        </div>
    );
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