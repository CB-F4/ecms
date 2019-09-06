import React, { Component } from "react";
import { connect } from "react-redux";
import { actionCreator } from "../../pages/login/store";
import { Menu, Icon, Dropdown } from "antd";
import history from '../../utils/history'
import { HeaderStyle, UserName, IconClick } from "./style";

class Header extends Component {
  handleLogout = () => {
    this.props.logoutAction();
  };

  render() {
    const menu = (
      <Menu onClick={this.handleLogout}>
        <Menu.Item key="1">
          <Icon type="user" />
          退出
        </Menu.Item>
      </Menu>
    );

    return (
      <HeaderStyle>
        <IconClick>
          <Icon type="menu" onClick={this.props.handleMenuIconClick} />
        </IconClick>
        <UserName>
          <Dropdown overlay={menu}>
            <span>
              {this.props.username} <Icon type="down" />
            </span>
          </Dropdown>
        </UserName>
        <UserName>
          <span>
            <i style={{ fontSize: "12px" }}>~风会指引你的方向，我的朋友~~ </i>{" "}
          </span>
        </UserName>
      </HeaderStyle>
    );
  }
}

const mapStateToProps = state => ({
  username: state.getIn(['login', 'username'])
})
const mapDispatchToProps = dispatch => ({
  logoutAction() {
    dispatch(actionCreator.logout());
  },
  handleMenuIconClick() {
    history.replace('/')
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
