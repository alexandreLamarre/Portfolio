import './App.css'
import TopNavigation from './components/navigation'
import SiderBar from './components/sidebar'
import GridScene from './components/three/gridNoise'
import NextAction from './components/nextAction'
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

const NEXT_KEY = ['ArrowDown']
const PREV_KEY = ['ArrowUp']

function App () {
  const dispatch = useDispatch()
  const { transitionNext, transitionPrev } = bindActionCreators(actionCreators, dispatch)

  function handleNextKey ({ key }) {
    console.log(key)
    if (NEXT_KEY.includes(String(key))) {
      // transition redux state to next page
      console.log('transition next')
      transitionNext()
    } else if (PREV_KEY.includes(String(key))) {
      // transition redux state to prev page
      transitionPrev()
    }
  }

  useEventListener('keydown', handleNextKey)

  return (
    <div className='App' onKeyDown={(e) => console.log(e)}>
      <GridScene />
      <SiderBar />
      <TopNavigation />
      <NextAction />
      {/* } <MainTitle/> {/**
      <RegularPolytope/> */}
      {/* <SceneWrapper/> */}
    </div>
  )
}

export default App
