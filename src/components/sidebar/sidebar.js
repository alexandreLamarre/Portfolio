import { FaUniversity } from "react-icons/fa";
const SiderBar = () => {
    return (
        <div className="fixed top-1/4 left-0 bg-green-500 flex flex-col h-screen ">
            <SideBarOption icon = {FaUniversity} text="Work Experience" >

            </SideBarOption>
            <SideBarOption icon = {FaUniversity} text="IBM"></SideBarOption>
            <SideBarOption icon = {FaUniversity} text="While One" ></SideBarOption>
            <SideBarOption icon = {FaUniversity} text="Education" ></SideBarOption>
            <SideBarOption icon = {FaUniversity} text="Projects">

            </SideBarOption>
        </div>
    )
};

const SideBarOption = ({icon, text}) => {
    return (
        <div className="flex flex-row">
            <SideBarIcon icon = {icon}></SideBarIcon>
            <SideBarDescription text = {text}></SideBarDescription>
        </div>
    )
};

const SideBarDescription = ({text}) => {
    return (
        <div>
            <p>{text}</p>
        </div>
    )
};

const SideBarIcon = ({icon}) => {
    return (
        <div>
            {icon}
        </div>
    )
};

export default SiderBar;