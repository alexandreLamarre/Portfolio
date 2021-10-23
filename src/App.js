import './App.css';
import TopNavigation from './components/navigation';
import SiderBar from './components/sidebar';
import ThreeScene from './components/three/threescene';
//import ShaderIcosahedron from './components/3d/shaderIcosahedron';
// import RegularPolytope from "./components/3d/torus";
//import MainTitle from "./components/titles";
// import SceneWrapper from './components/3d/sceneWrapper';
function App() {
  return (
    <div className="App">
      <ThreeScene/>
      <SiderBar/>
      <TopNavigation/>
    {/*} <MainTitle/> {/** 
      <RegularPolytope/> */}
      {/* <SceneWrapper/> */}
    </div>
  );
}

export default App;
