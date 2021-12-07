import './App.css'
import TopNavigation from './components/navigation'
import SiderBar from './components/sidebar'
import GridScene from './components/three/gridNoise'
import NextAction from './components/nextAction'
import TransitionScroller from './components/transitionScroller';
import { AboutInterface, ResumeInterface } from './components/interfaces'
// import ThreeScene from './components/three/threescene';
// import LavaScene from './components/three/lava/lavaComponent';
// import ShaderIcosahedron from './components/3d/shaderIcosahedron';
// import RegularPolytope from "./components/3d/torus";
// import MainTitle from "./components/titles";
// import SceneWrapper from './components/3d/sceneWrapper';
// import ParticleText from './components/three/particleText';
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from './action'
import useEventListener from './hooks/useEventListener'
import scrollerProgress from './lib/scrollerProgress'
const NEXT_KEY = ['ArrowDown'];
const PREV_KEY = ['ArrowUp'];
const CLOSE_KEY = ['Escape'];

let cur = 0;

function App () {
  const dispatch = useDispatch();
  const {transitionNext, transitionPrev, removeTopInterface} = bindActionCreators(actionCreators, dispatch);

  function handleNextKey({key}) {
    if (NEXT_KEY.includes(String(key))){
      //transition redux state to next page
      transitionNext();
    }
    else if (PREV_KEY.includes(String(key))) {
      //transition redux state to prev page
      transitionPrev();
    } else if (CLOSE_KEY.includes(String(key))){
      removeTopInterface();
    }
  }

  function handleScroll(e){
    if(e.wheelDeltaY < 0){
      const old = cur;
      cur = scrollerProgress(cur);
      console.log(old, " -> ", cur);
    }
  }

  useEventListener('keydown', handleNextKey);
  useEventListener('wheel', handleScroll );

  return (
    <div className='App'>
      <GridScene />
      <SiderBar />
      <TopNavigation/>
      <AboutInterface/>
      <ResumeInterface/>
      <NextAction />
      <TransitionScroller/>
      {/* } <MainTitle/> {/**
      <RegularPolytope/> */}
      {/* <SceneWrapper/> */}
    </div>
  )
}

export default App
