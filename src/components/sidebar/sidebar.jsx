import React, { useState } from "react";

import { FaInfinity, FaUniversity } from "react-icons/fa";
import { SiIbm, SiThreedotjs } from "react-icons/si";
import { MdWeb, MdOutlineWork } from "react-icons/md";
import { IoLogoOctocat } from "react-icons/io";
import { BiHomeCircle } from "react-icons/bi";
import {FcGraduationCap} from 'react-icons/fc';
import {GiMeshNetwork} from 'react-icons/gi';
import {AiOutlineConsoleSql} from 'react-icons/ai';

import PageManager from "../../lib/pageState";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../action";

function SiderBar(props){
    const [showWork, setShowWork] =  useState('none'); // one of 'none', 'work', 'education', 'projects'


    return (
        <div className="fixed top-1/4 left-0 flex flex-col justify-center h-screen ">
            <SideBarIcon 
                page={PageManager.step(0)}
                icon={<BiHomeCircle size="34"/>} 
                text="Home"/>
            <SideBarWork status = {showWork} action = {setShowWork}></SideBarWork>
            <SideBarEducation status = {showWork} action={setShowWork}/>
            <SideBarProjects status = {showWork} action={setShowWork}/>
        </div>
    );
};

function SideBarWork (props){

    const showAll = props.status === 'work';
    const curPage = useSelector((state) => state.pageState);
    const isExpandedBySelect = (curPage === PageManager.step(1) || curPage === PageManager.step(2));

    return (
        <div >
            <div onClick={() => showAll?props.action('none'):props.action('work')}>
                <SideBarIcon 
                expanded={isExpandedBySelect}
                icon = {<MdOutlineWork size ="34"/>} 
                text="Work Experience" 
                /> 
                </div>
            {/* 
            Sub-options like IBM, etc...
            */}
            {showAll || isExpandedBySelect?
            <div>
                <SideBarIcon
                page={PageManager.step(1)}
                icon={<SiIbm size ="34"/>} 
                text="IBM" 
                indent={true}
                /> 
                <SideBarIcon 
                page={PageManager.step(2)}
                icon = {<MdWeb size ="34"/>} 
                text="WhileOne"
                indent={true} 
                /> 
            </div>
             :<></>}
        </div>
    )
}

function SideBarEducation(props){
    const showAll = props.status === 'education';
    const curPage = useSelector((state) => state.pageState);
    const isExpandedBySelect = (curPage === PageManager.step(3));

    return (
        <div>
            <div onClick={() => showAll?props.action('none'):props.action('education')}>
                <SideBarIcon 
                    expanded={isExpandedBySelect}
                    icon = {<FaUniversity size ="34"/>} 
                    text="Education" />
            </div>
            {showAll || isExpandedBySelect?
            <div>
                <SideBarIcon 
                    page={PageManager.step(3)}
                    icon = {<FcGraduationCap size ="34"/>} 
                    text="University of Toronto" 
                    indent={true}/>
            </div>:
            <></>}

        </div>
    )
};

function SideBarProjects(props){
    const showAll = props.status === 'projects';
    const curPage = useSelector((state) => state.pageState);
    const isExpandedBySelect = (curPage === PageManager.step(4) || curPage === PageManager.step(5) 
                        || curPage === PageManager.step(6) || curPage === PageManager.step(7));

    return (
        <div>
            <div onClick = {() => showAll? props.action('none'):props.action('projects')}>
                <SideBarIcon 
                expanded={isExpandedBySelect}
                icon = {<IoLogoOctocat size ="34"/>} 
                text="Projects"/>
            </div>
            {showAll || isExpandedBySelect?
            <div>
                <SideBarIcon 
                    page={PageManager.step(4)}
                    icon={<GiMeshNetwork size="34"/>} 
                    text="Network Analysis Visualization" 
                    indent = {true} />
                <SideBarIcon 
                    page={PageManager.step(5)}
                    icon={<SiThreedotjs size="34"/>} 
                    text="Ray-Tracing Renderer" 
                    indent = {true}/>
                <SideBarIcon 
                    page={PageManager.step(6)}
                    icon={<AiOutlineConsoleSql size="34"/>} 
                    text="AI Query Optimizer" 
                    indent= {true}/>
                <SideBarIcon 
                    page={PageManager.step(7)}
                    icon={<FaInfinity size="34"/>} 
                    text="And many more!" 
                    indent={true}></SideBarIcon>
            </div>
            :
            <></>}
        </div>
    )
}

function SideBarIcon ({icon, text, indent, page, expanded}) {

    const dispatch = useDispatch();
    const curPage = useSelector((state) => state.pageState);
    const {transitionSelected} = bindActionCreators(actionCreators, dispatch);

    function handleClickSelectPage(pageName){
        if(page === undefined || page === null) return;
        transitionSelected(pageName);
    }

    /**
     * #FIXME: Many issues with this render code I'm not happy about.
     * 
     * copy pasting `transtion-all ...` dynamically from index.css when redux store matches current page state,
     * makes this piece of code less maintainable
     * expanded === undefined is risky and can cause downstream bugs
     */
    return (
        <div className={`
        sidebar-icon group ${indent?'ml-8':'ml-0.5'}
        ${curPage===page || expanded?'outline-white transition-all duration-300 ease-linear bg-green-600 rounded-xl opacity-100 text-white':''}`}
        onClick={() => handleClickSelectPage(page) }
        >
            {icon}
            <span className="sidebar-text group-hover:scale-150"> {text} </span>
        </div>
    )
};

export default SiderBar;