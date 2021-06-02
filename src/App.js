import './App.css';
import RegularPolytope from "./components/3d/torus";
import MainTitle from "./components/titles";

function App() {
  return (
    <div className="App">
      <MainTitle/>
      <RegularPolytope/>
    </div>
  );
}

export default App;
