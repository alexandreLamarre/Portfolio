import React, { useState } from "react";

import { FaInfinity, FaUniversity } from "react-icons/fa";
import { SiIbm, SiThreedotjs } from "react-icons/si";
import { MdComputer, MdWeb, MdOutlineWork } from "react-icons/md";
import { IoLogoOctocat } from "react-icons/io";
import { BiHomeCircle } from "react-icons/bi";
import {FcGraduationCap} from 'react-icons/fc';
import {GiMeshNetwork} from 'react-icons/gi';
import {AiOutlineConsoleSql} from 'react-icons/ai';

function SiderBar(props){
    const [showWork, setShowWork] =  useState('work'); // one of 'none', 'work', 'education', 'projects'


    return (
        <div className="fixed top-1/4 left-0 flex flex-col justify-center h-screen ">
            <SideBarIcon icon={<BiHomeCircle size="34"/>} text="Home"/>
            <SideBarWork status = {showWork} action = {setShowWork}></SideBarWork>
            <SideBarEducation status = {showWork} action={setShowWork}/>
            <SideBarProjects status = {showWork} action={setShowWork}/>
        </div>
    )
};

function SideBarWork (props){

    const showAll = props.status === 'work';

    return (
        <div >
            <div onClick={() => showAll?props.action('none'):props.action('work')}>
                <SideBarIcon 
                icon = {<MdOutlineWork size ="34"/>} 
                text="Work Experience" 
                /> 
                </div>
            {/* 
            Sub-options like IBM, etc...
            */}
            {showAll?
            <div>
                <SideBarIcon
                icon = {<SiIbm size ="34"/>} 
                text="IBM" 
                indent={true}
                /> 
                <SideBarIcon 
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

    return (
        <div>
            <div onClick={() => showAll?props.action('none'):props.action('education')}>
                <SideBarIcon icon = {<FaUniversity size ="34"/>} text="Education" />
            </div>
            {showAll?
            <div>
                <SideBarIcon icon = {<FcGraduationCap size ="34"/>} text="University of Toronto" indent={true}/>
            </div>:
            <></>}

        </div>
    )
};

function SideBarProjects(props){
    const showAll = props.status === 'projects';

    return (
        <div>
            <div onClick = {() => showAll? props.action('none'):props.action('projects')}>
                <SideBarIcon icon = {<IoLogoOctocat size ="34"/>} text="Projects"/>
            </div>
            {showAll?
            <div>
                <SideBarIcon icon={<GiMeshNetwork size="34"/>} text="Network Analysis Visualization" indent = {true} />
                <SideBarIcon icon={<SiThreedotjs size="34"/>} text="Ray-Tracing Renderer" indent = {true}/>
                <SideBarIcon icon={<AiOutlineConsoleSql size="34"/>} text="AI Query Optimizer" indent= {true}/>
                <SideBarIcon icon={<FaInfinity size="34"/>} text="And many more!" indent={true}></SideBarIcon>
            </div>
            :
            <></>}
        </div>
    )
}

function SideBarIcon ({icon, text, indent}) {
    return (
        <div className={`sidebar-icon group ${indent?'ml-8':'ml-0.5'}`}>
            {icon}
            <span className="sidebar-text group-hover:scale-150"> {text} </span>
        </div>
    )
};

export default SiderBar;