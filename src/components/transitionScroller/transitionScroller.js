import React from 'react';

/**
 * TODO: Need Current Progress from redux store?
 */

class TransitionScroller extends React.Component{
    /**
     * 
     * @param {*} props 
     */
    constructor(props){
        super(props);
        this.state = {
            rotation : 0,
        }

        this.canvas = React.createRef();
    }

    componentDidMount(){
        this.canvas.current.style.width='100%';
        this.canvas.current.style.height='100%';
        this.draw();
    }

    /**
     * 
     * @param {*} color 
     * @param {*} curProgress 
     */
    draw(color, curProgress){
        const ctx = this.canvas.current.getContext('2d');
        ctx.clearRect(0,0,this.canvas.current.width,this.canvas.current.height);
        ctx.beginPath();
        console.log(this.canvas.current.width, this.canvas.current.height)
        const x = this.canvas.current.width/2;
        const y = this.canvas.current.height/2;
        console.log(x,y)
        ctx.arc(x,y,x/2,0, 2*Math.PI, true);
        ctx.arc(x,y,x/2.5,0, 2*Math.PI,false);
        ctx.fill();
    }

    render(){
        return(
            <div className="scroller-progress">
                <canvas  ref = {this.canvas}/>
            </div>
        )
    }
}

export default TransitionScroller;