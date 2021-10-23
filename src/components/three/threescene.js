import React from "react";
import {Canvas} from "@react-three/fiber";
import Box from "./sample";

function ThreeScene(props){
    return(
        <div className="fixed top-0 bottom-0 h-100vh w-screen bg-black">
           <Canvas className="h-100vh w-screen">
            <ambientLight/>
            <pointLight position = {[10, 10, 10]}/>
            {/* <Box position = {[-1.2, 0, 0]}/>
            <Box position = {[1.2, 0, 0]}/> */}
        </Canvas> 
        </div>
    );
}

export default ThreeScene;