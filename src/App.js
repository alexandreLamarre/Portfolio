import './App.css';
import TopNavigation from './components/navigation';
import SiderBar from './components/sidebar';
//import ThreeScene from './components/three/threescene';
// import LavaScene from './components/three/lava/lavaComponent';
//import ShaderIcosahedron from './components/3d/shaderIcosahedron';
// import RegularPolytope from "./components/3d/torus";
//import MainTitle from "./components/titles";
// import SceneWrapper from './components/3d/sceneWrapper';
import ParticleText from './components/three/particleText';

function App() {
  return (
    <div className="App">
      <ParticleText/>
      <SiderBar/>
      <TopNavigation/>
    {/*} <MainTitle/> {/** 
      <RegularPolytope/> */}
      {/* <SceneWrapper/> */}
    </div>
  );
}

export default App;
