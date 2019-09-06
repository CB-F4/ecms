import React, { Component } from "react";
import { connect } from "react-redux";
import { actionCreator } from "./store";
import { withRouter } from "react-router-dom";
import { Card, Form, Input, Button } from "antd";
import { CardStyle } from "./style";

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.loginAction(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <CardStyle>
        <Card title="ECMS登录">
          <Form onSubmit={this.handleSubmit}>
            <Form.Item {...formItemLayout} label="用户名">
              {getFieldDecorator("username", {
                rules: [{ required: true, message: "请输入用户名" }]
              })(<Input />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="密码">
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "请输入密码" }]
              })(<Input type="password" />)}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                login
              </Button>
              <a href="#/home">
                <Button>back</Button>
              </a>
            </Form.Item>
          </Form>
        </Card>
      </CardStyle>
    );
  }
}

const WrappedApp = Form.create({ name: "LoginForm" })(Login);

const mapStateToProps = state => ({
  loginState: state.getIn(["login", "login"])
});

const mapDispatchToProps = dispatch => ({
  loginAction(values) {
    dispatch(actionCreator.login(values));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WrappedApp)
);
