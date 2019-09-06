import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

export default class ContentMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: []
    };
  }

  getComponentItems = data => {
    return data.map((item, index) => {
      if (item.meta) {
        if (item.children && item.children.length) {
          return (
            <SubMenu
              key={item.path + index}
              title={
                <span>
                  {item.icon && <Icon type={item.icon} />}
                  {item.name}
                </span>
              }
            >
              {this.getComponentItems(item.children)}
            </SubMenu>
          );
        }
        if (item.type === 1 || item.type === 2) {
          return (
            <MenuItem  key={item.path + index}>
              <Link to={item.path}>
                {/* {item.icon && <Icon type={item.icon} />} */}
                <span>{item.name}</span>
              </Link>
            </MenuItem>
          );
        }
      }
      return '';
    });
  };

  render() {
    const { menus } = this.props;
    return (
      <Menu
        style={{
          backgroundColor: '#5d5d5d'
        }}
        onClick={({ key }) => {
          console.log(key);
        }}
        mode="inline"
      >
        {this.getComponentItems(menus)}
      </Menu>
    );
  }
}
