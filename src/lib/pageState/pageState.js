/**
 * Page contains the name (later used as values in the redux store)
 * and prev/next pages
 */
class Page{
    /**
     * Construct a new page object
     * @param {*} name the value/identifier of the page
     * @param {*} next undefined/null if no next page exists, otherwise reference to another Page Object
     * @param {*} prev undefined/null if no previous page, otherwise reference to another Page Object
     */
    constructor(name, next, prev){
        this.name = name;
        this.next = next;
        this.prev = prev;
    }
}

/**
 * Manages page storing, lookup and order
 * 
 * 'Pseudo Linked List' since there should never be more
 *  than half dozen to a dozen pages in my portfolio
 */
class PageState{
    /**
     * 
     * @param {Array[Page]} pageArray array of pages names (in order of intended traversal)
     */
    constructor(pageArray) {
        this.pageSet = new Map(); // dict from name -> Page 

        // Add error check for empty page array
        if (pageArray.length < 1) {
            throw new Error("Require a non-zero positive number of pages to construct a PageState")
        }

        // initial traversal
        for(let i = 0; i < pageArray.length; i++) {
            this.pageSet.set(pageArray[i], i);
            pageArray[i] = new Page(pageArray[i], null, null);
        }

        // second traversal
        for(let i = 1; i< pageArray.length; i++) {
            pageArray[i].prev = pageArray[i-1];
            pageArray[i-1].next = pageArray[i];
        }
        this.pageArray = pageArray;
    }

    /**
     * Checks if the page id/name (string) exists in the page state
     * 
     * throws an error if it does not.
     * @param {String} name 
     * return {Number} index of the Page in the pageArray
     */
    lookup(name){
        const res = this.pageSet.get(name);

        if(res === undefined || res === null){
            throw new Error("Invalid page lookup: '" + String(name) + "'");
        }
        return res;
    }
    /**
     * Get the next page of the given page id/name.
     * 
     * Throws an error if page is out of bounds or if the given page is the end page
     * @param {String} name 
     * @returns {String} name of the next page
     */
    next(name){
        const lookupPageIndex = this.lookup(name);

        if(lookupPageIndex > this.pageArray.length - 1 || lookupPageIndex < 0){
            throw new Error("Page index out of bounds")
        }

        if(this.isEndPage(name)){
            throw new Error("Cannot transition to a page after the end page.");
        }

        return this.pageArray[lookupPageIndex].next.name;
    }
    /**
     * Get the previous page of the given page id/name.
     * 
     * Throws an error if page is out of bounds or if the given page is the home page
     * @param {String} name 
     * @returns {String} name of the previous page
     */
    prev(name){
        const lookupPageIndex = this.lookup(name);

        if(lookupPageIndex < 0 || lookupPageIndex > this.pageArray.length - 1){
            throw new Error("Page index out of bounds");
        }

        if(this.isHomePage(name)){
            throw new Error("Cannot transition to a page before the home page");
        }

        return this.pageArray[lookupPageIndex].prev.name;
    }
    /**
     * Returns whether the given page id is the home page.
     * @param {String} name 
     * @returns 
     */
    isHomePage(name){
        const lookupPageIndex = this.lookup(name);
        return lookupPageIndex === 0;
    }
    /**
     * Returns whether the giben pasge id is the end page.
     * @param {*} name 
     * @returns 
     */
    isEndPage(name){
        const lookupPageIndex = this.lookup(name);
        return lookupPageIndex === this.pageArray.length - 1;
    }

    /**
     * The getter function for the name of the step number
     * @param {Number} number step number of the name we want to know
     */
    step(number){
        if(number > this.pageArray.length -1 || number < 0){
            throw new Error("Page step '" + String(number) 
            + "' is out of bounds [" + String(0)+ "," + String(this.pageArray.length) + "]");
        }

        return this.pageArray[number].name;
    }
}

const pages = ['home', 'work:ibm', 'work:whileone', 'edu:uoft', 'proj:network', 'proj:raytracing', 'proj:queryopt', 'proj:more'];
const PageManager = new PageState(pages);

export default PageManager;