import { Outlet } from "react-router-dom";
import UserChatComponent from "./userchatcomponent";
const RouteWithUserChatComponent=()=>{
    return <><UserChatComponent/><Outlet/></>
}
export default RouteWithUserChatComponent