import './App.css';
import ShaderIcosahedron from './components/3d/shaderIcosahedron';
// import RegularPolytope from "./components/3d/torus";
// import MainTitle from "./components/titles";
// import SceneWrapper from './components/3d/sceneWrapper';
function App() {
  return (
    <div className="App">
      {/* <MainTitle/>
      <RegularPolytope/> */}
      {/* <SceneWrapper/> */}
      <ShaderIcosahedron/>
    </div>
  );
}

export default App;
