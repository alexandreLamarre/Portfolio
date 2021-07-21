import './App.css';
import SceneWrapper from './components/3d/sceneWrapper';
import RegularPolytope from "./components/3d/torus";
import MainTitle from "./components/titles";

function App() {
  return (
    <div className="App">
      {/* <MainTitle/>
      <RegularPolytope/> */}
      <SceneWrapper/>
    </div>
  );
}

export default App;
