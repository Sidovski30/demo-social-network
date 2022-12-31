import {Menu} from "antd";
import { Link } from "react-router-dom";
import "../SideBar/SideBar.css"

const TopicMenu = () => {
  
  
  return (
    <Menu mode="inline" className="sidebar" selectedKeys={""}
      items={[
        {
          label: (
            <Link to='/profile'>Profile</Link>
          ),
        },
        {
          label: (
            <Link to='/dialogs'>Messages</Link>
          ),
        },
        {
          label: (
            <Link to='/developers'>Developers</Link>
          ),
        },
        {
          label: (
            <Link to='/chat'>Chat</Link>
          ),
        },
      ]}
    />
      
  );
}
export default TopicMenu;


