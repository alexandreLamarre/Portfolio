import React from "react";
import OctaPlex from "./Octaplex.js";

/**
 * The component class for the 24-cell regular 4d polytope.
 * Handles user interaction, gsap & THREE.js animations related to the 4d polytope
 */
class RegularPolytope4DComponent extends React.Component{
    //TODO: implement this class       
    /**
     * 
     * @param {*} props component props that this component will inherit.
     */
    constructor(props){
        super(props);
        this.state = {
            polytope: new OctaPlex(),
        }
    }

    /**
     * 
     */
    componentDidMount(){

    }

    /**
     * 
     */
    componentWillUnmount(){

    } 
    
    /**
     * 
     */
    animate(){

    } 
    
    /**
     * 
     */
    resize(){

    }

    /**
     * 
     */
    createScene(){

    }

    /**
     * 
     */
    updateScene(){

    }

    /**
     * 
     * @returns 
     */
    render(){
        return (
            <div>
            </div>
        )
    }
}

export default RegularPolytope4DComponent;
