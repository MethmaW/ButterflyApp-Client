import React from "react";
import { Menu } from "antd";
import {
  SearchOutlined,
  UploadOutlined,
  UserOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import "./search.css";

const SideMenu = () => {
  const handleClick = (e) => {
    console.log("click ", e);
  };

  return (
    <Menu
      onClick={handleClick}
      style={{ width: 256 }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      className="menu"
    >
      <Menu.Item
        key="1"
        className="menuItem"
        icon={<SearchOutlined style={{ fontSize: "2rem" }} />}
      ></Menu.Item>
      <Menu.Item
        key="2"
        className="menuItem"
        icon={<UploadOutlined style={{ fontSize: "2rem" }} />}
      ></Menu.Item>
      <Menu.Item
        key="3"
        className="menuItem"
        icon={<UserOutlined style={{ fontSize: "2rem" }} />}
      ></Menu.Item>
      <Menu.Item
        key="4"
        className="menuItem"
        icon={<EllipsisOutlined style={{ fontSize: "2rem" }} />}
      ></Menu.Item>
    </Menu>
  );
};

export default SideMenu;
