
/**
 * Small number of interfaces so no need to worry about
 * complex/efficient implementation
 *
 */
class Interfaces{
    /**
     * Pass in array of named interfaces 
     * @param {Array[String]} values 
     */
    constructor(values) {
        this.container = values;
    }

    interface(number){
        if (number < 0 || number > this.container.length -1){
            throw new Error("Invalid interface access");
        }
        return this.container[number];
    }
};

const ACTUAL_INTERFACES = new Interfaces(['about', 'resume']);

/**
 * Data structure designating how redux store / reducers 
 * should behave with interfaces over the portfolio
 * Assumes all interface identifying numbers are distinct.
 */
class InterfaceStack {
    constructor(){
        this.interfaces = ACTUAL_INTERFACES;
        this.active = new Map(); // Number -> String
        this.stack = [];
    }

    /**
     * Returns whether or not the current interface stack is empty
     * @returns {Boolean}
     */
    empty(){
        return this.active.size === 0;
    }
    /**
     * Return Number of defined interfaces
     * @returns {Number}
     */
    num(){
        return this.interfaces.container.length;
    }

    /**
     * 
     * @returns Number of open interfaces 
     */
    size(){
        return this.active.size;
    }

    /**
     * Returns whether or not the interface stack has the given interface
     * @param {*} number 
     * @returns {Boolean}
     */
    has(number){
        return this.active.get(number)?true:false;
    }

    /**
     * Adds the interface with the given number to the interface stack
     * @param {Number} number 
     */
    add(number){
        const add = this.interfaces.interface(number);
        if (!this.active.has(number)){
            this.active.set(number, add);
            this.stack.push(number);
        }
    }

    /**
     * Returns the name of the interface with the given number
     * @param {Number} number 
     * @returns {String} 
     */
    getInterface(number){
        return this.interfaces.interface(number);
    }

    /**
     * Removes the interface with the specified ID number
     * @param {Number} number 
     * @returns 
     */
    remove(number){
        if(!this.active.has(number)) return;
        this.active.delete(number);
        const toRemove = this.stack.indexOf(number);
        if(toRemove === -1) {
            throw new Error("Inconsistent internal state: Interface stack has an active interface that is not contained in its stack!");
        }
        this.stack.splice(toRemove, 1);
    }

    /**
     * Returns the top interface in the stack
     * @returns 
     */
    top(){
        if(this.stack.length === 0){
            return '';
        }
        return this.getInterface(this.stack[this.stack.length-1]);
    }

    /**
     * Pops the top-most interface in the interface stack
     * @returns 
     */
    pop(){
        if(this.stack.length === 0) return;

        const number = this.stack.pop();
        this.active.delete(number);
    }
};

const INTERFACE_STACK = new InterfaceStack();
export default INTERFACE_STACK;