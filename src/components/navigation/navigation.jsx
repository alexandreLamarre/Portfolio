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
        <a 
        className="title" 
        href="https://www.linkedin.com/in/alexandre-lamarre-b2819920a/" 
        target='_blank' 
        rel='noreferrer' 
        referrerPolicy='no-referrer'> 
        Alexandre Lamarre 
        </a>
    )
};

const Search = () => (
    <div className='search'>
      <input className='search-input' type='text' placeholder='Search...' />
      <FaSearch size='18' className='text-secondary my-auto' />
    </div>
);

const Resume = () => (
    <div className='navigation-text-button mr-4 ml-2 pl-4 pr-4'>
        <button>  Resume </button>
    </div>
);

const About = () => (
    <div className='navigation-text-button mr-2 ml-4 pl-4 pr-4'>
        <button> About </button>
    </div>
);


export default TopNavigation;