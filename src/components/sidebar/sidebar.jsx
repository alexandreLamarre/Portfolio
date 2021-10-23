import React, { useState } from "react";

import { FaUniversity } from "react-icons/fa";
import { SiIbm } from "react-icons/si";
import { MdComputer, MdOutlineWork } from "react-icons/md";
import { IoLogoOctocat } from "react-icons/io";
import { BiHomeCircle } from "react-icons/bi";
const SiderBar = () => {
    
    const [showWork, setShowWork] =  useState(false);

    return (
        <div className="fixed top-1/4 left-0 flex flex-col justify-center h-screen ">
            <SideBarIcon icon={<BiHomeCircle size="34"/>} text="Home"/>
            <SideBarIcon icon = {<MdOutlineWork size ="34"/>} text="Work Experience" >
                {/* 
                Some suboptions like IBM, WhileOne, ...
                */}
            </SideBarIcon>
            {/* <SideBarIcon icon = {<SiIbm size ="34"/>} hidden={showWork} text="IBM"></SideBarIcon>
            <SideBarIcon icon = {<MdComputer size ="34"/>} text="While One" ></SideBarIcon> */}
            <SideBarIcon icon = {<FaUniversity size ="34"/>} text="Education" ></SideBarIcon>
            <SideBarIcon icon = {<IoLogoOctocat size ="34"/>} text="Projects">
                {/*
                Some suboptions
                */}
            </SideBarIcon>
        </div>
    )
};

function SideBarIcon ({icon, text, hidden}) {
    console.log(text, "--hidden?", hidden);
    return (
        <div className={`sidebar-icon group ${hidden?"hidden":""}`}>
            {icon}
            <span class="sidebar-text group-hover:scale-150"> {text} </span>
        </div>
    )
};

export default SiderBar;