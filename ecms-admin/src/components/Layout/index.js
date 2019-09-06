import React, { Component } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import Header from "../Header";
import SideBar from "../NavLeft/index";
import { MainStyle } from "./style";

class AppLayout extends Component {
  render() {
    return (
      <Row className="container">
        <Col span={4}>
          <SideBar menu={this.props.menu} />
        </Col>
        <Col span={20} className="main">
          <Row>
            <Header/>
            <MainStyle>{this.props.children}</MainStyle>
          </Row>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  menu: state.getIn(["login", "menu"])
});
export default connect(mapStateToProps)(AppLayout);
