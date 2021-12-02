import {
    FaSearch,
    FaMoon,
    FaSun,
  } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../action';
import useDarkMode from "../../hooks/useDarkMode";

const TopNavigation = () => {
    return (
        <div className="navigation-bar justify-items-center">
            <Title/>
            <About iid={0}/> {/* Check src/lib/interfaceStack for iid definitions*/}
            <Resume iid={1}/>
            <Search/>
            <DarkModeToggle></DarkModeToggle>
        </div>
    )
};

/**
 * 
 * @returns 
 */
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

/**
 * 
 * @returns 
 */
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

/**
 * 
 * @returns 
 */
function Search(){

    return (
         <div className='search'>
            <input className='search-input' type='text' placeholder='Search...' />
            <FaSearch size='18' className='text-secondary my-auto' />
        </div>
    );
 
}

/**
 * 
 * @param {Number} did : the interface number this component opens
 * @returns 
 */
function Resume ({iid}){
    const isOpen = useSelector((state) => state.interfaceStack).top.has(iid);
    console.log('resume is open?', isOpen);
    const dispatch = useDispatch();
    const {removeInterfaceStack, addInterfaceStack} = bindActionCreators(actionCreators, dispatch);

    return (
        <div className='navigation-text-button mr-4 ml-2 pl-4 pr-4'>
            <button onClick={() => {isOpen?removeInterfaceStack(iid):addInterfaceStack(iid)}}>  Resume </button>
        </div>
    );
}

/**
 * 
 * @param {Number} iid : the interface number this component opens 
 * @returns 
 */
function About({iid}){
    const isOpen = useSelector((state) => state.interfaceStack).top.has(iid);
    console.log('about is open?', isOpen);
    const dispatch = useDispatch();
    const {removeInterfaceStack, addInterfaceStack} = bindActionCreators(actionCreators, dispatch);

    return(
        <div className='navigation-text-button mr-2 ml-4 pl-4 pr-4'>
            <button onClick={() => {isOpen?removeInterfaceStack(iid):addInterfaceStack(iid)}}> About </button>
        </div>
    );
}


export default TopNavigation;