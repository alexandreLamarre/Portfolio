import * as THREE from "three";
import React from "react";
//import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

var FRAME_DEBUG = 0;

class RegularPolytope extends React.Component{
    /**
     * Initializes a component that will contain a canvas with a regular 4d polytope
     * animation.
     * Binds relevant event listeners to this component.
     * @param {} props the component props to be passed down to this component 
     */
    constructor(props){
        super(props);
        this.state = {
            renderer: null,
            scene: null,
            camera: null,
            clock: null,
            objs: {},
        }
        this.canvas = React.createRef();
        this.resize = this.resize.bind(this);
        this.frameId = 0;
    }

    /**
     * Set up :
     *  - States/objects for 3d rendering
     *  - Event listeners for resizing & re-rendering
     */
    componentDidMount(){
        const w = this.width();
        const h = this.height();
        this.canvas.current.width = w;
        this.canvas.current.height = h;
        
        const {renderer, scene, camera, objs, clock} = this.createScene(w,h);
        window.addEventListener("resize", this.resize);
        this.frameId = window.requestAnimationFrame(() => this.animate());
        this.setState({
            renderer: renderer,
             camera: camera,
             scene: scene, 
             objs: objs, 
             clock: clock,
            });
    }

    /**
     * Destroy: 
     *  - Allocated memory for webgl
     *  - Event listeners related to 3d rendering/resizing
     */
    componentWillUnmount(){
        window.removeEventListener("resize", this.resize);
        window.cancelAnimationFrame(this.frameId);
    }

    width(){
        return window.innerWidth * 1 ;
    }

    height(){
        return window.innerHeight * 1;
    }

    /**
     * Component resize method. Updates canvas & renderer size to fit the window
     */
    resize(){
        const w = this.width();
        const h = this.height();
        
        if(this.canvas !== null){
            this.canvas.current.width = w;
            this.canvas.current.height = h;
            const updatedCamera = this.state.camera;
            const updatedRenderer = this.state.renderer;
            
            updatedCamera.aspect = w/ h;
            updatedRenderer.setSize(w, h);
            this.setState({renderer: updatedRenderer, camera: updatedCamera});
        }
    }

    /**
     * Animate method for the webGl 4d regular polytope
     */
    animate(){
        if(this.canvas.current !== null){
            const objs = this.state.objs;
            objs.torus.rotation.y = .5 * this.state.clock.getElapsedTime();
            this.state.renderer.render(this.state.scene, this.state.camera);
            const debugObj = {}
            // debugObj.renderer = this.state.renderer;
            // debugObj.scene = this.state.scene;
            debugObj.torus = this.state.objs.torus;
            this.debug_animate(debugObj)
            this.setState({objs: objs});
            this.frameId = window.requestAnimationFrame(() => this.animate());
        }
    }

    /**
     * Logs specified javascript Objects to debug. For use in animate command every 60 frames.
     * @param {Js Objects to debug} objectsToDebug 
     */
    debug_animate(objectsToDebug){
        FRAME_DEBUG += 1;
        if( FRAME_DEBUG % 60 === 0){
            for(const key in objectsToDebug){
                if(objectsToDebug.hasOwnProperty(key)) console.log("Object: ", key, "\nValue", objectsToDebug[key]);
            }
            FRAME_DEBUG = 0;
        }
    }

    /**
     * 
     */
    createScene(w,h){
        //TODO: setup initial configuration of 3d projection of 4d regular polytope.
        const renderer = new THREE.WebGLRenderer({canvas: this.canvas.current, alpha:true});
        renderer.setSize(w, h);
        const camera = new THREE.PerspectiveCamera(75, this.width()/this.height(), 0.1, 100);
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 2; 
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.x = 2;
        pointLight.position.y = 3;
        pointLight.position.z = 4;
        camera.add(pointLight);

        const scene = new THREE.Scene();
        const objs = {};
        const geometry = new THREE.TorusGeometry(.7, .2, 16, 100);

        const material = new THREE.PointsMaterial({
            size: 0.005,
        });
        material.color = new THREE.Color(0xffffff);

        const torus = new THREE.Points(geometry, material);
        torus.position.x = 0;
        scene.add(torus);
        scene.add(camera);
        scene.add(pointLight);
        objs.torus = torus;
        

        const clock = new THREE.Clock();
        return {renderer, scene, camera, objs, clock}
    }

    /**
     * 
     */
    updateScene(){
        //TODO: simple 4d projection rotation to transform between 3d projections.
    }

    /**
     * React render method.
     * @returns the wegGl canvas in a div container
     */
    render(){
        return (
        <div style = {{backgroundColor: "21218a"}}>   
            <canvas style = {{
                backgroundColor: "#21282a", 
                position: "absolute",
                left: "0",
                right: "0", 
                bottom: "0",
                top: "0",
                }} id = "regpolytope" ref = {this.canvas}/>

        </div>
        )
    }
} 

export default RegularPolytope;
