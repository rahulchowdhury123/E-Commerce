import { Outlet,Navigate } from "react-router-dom"
import UserChatComponent from "../pages/user/userchatcomponent";
const ProtectedRoutesComponent=({admin})=>{
    if(admin){
        let auth=true;
        return auth?<Outlet/>:<Navigate to='/login'/>
    }
    else{
        let auth=true;
        return auth?<><UserChatComponent/><Outlet/></>:<Navigate to='/login'/>
    }
}
export default ProtectedRoutesComponent