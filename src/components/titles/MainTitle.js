import React from "react";
import {gsap} from "gsap";
import {CSSRulePlugin, CSSPlugin} from "gsap/all";

import "./MainTitle.css";

class MainTitle extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        const border = CSSRulePlugin.getRule('.content:before');
        const mainTitle = document.getElementById("mainTitle");
        const subTitle = document.getElementById("subTitle");

        gsap.registerPlugin(CSSPlugin, CSSRulePlugin);
        const tl = gsap.timeline();

        tl.from(border, {delay: 0.5, duration: 3, cssRule: {scaleX: 0}});
        tl.to(mainTitle, {duration: 3, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', y: '10px'}, "-=3" );
        tl.to(subTitle, {duration: 6, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', y: '10px'}, "-=2" );
    }

    render(){
        return (
            <div className = "container">
                <div className = "content">
                    <h1 style = {{color: "white"}} 
                    id = "mainTitle"
                    className = "mainTitle">
                        Beautifully Crafted <br/> Solutions to <br/>
                        Next Generation Problems
                    </h1>
                    <p style = {{color: "white"}}
                    className = "subTitle"
                    id = "subTitle"> 
                    <br/>
                    Exploring where abstraction meets implementation.
                    </p>
                </div>
                
            </div>
        )
    }
}

export default MainTitle;