import React, { Component } from "react";
import { Form, Input, Select } from "antd";

const { Option } = Select;

class UserForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const allRole = sessionStorage.getItem("allRole");
    return (
      <Form>
        {getFieldDecorator("id")(<Input style={{ display: "none" }}></Input>)}
        <Form.Item
          label="用户名"
          labelCol={{
            xs: { span: 24 },
            sm: { span: 4 }
          }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 16 }
          }}
        >
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "请输入用户名" }]
          })(<Input></Input>)}
        </Form.Item>
        <Form.Item
          label="角色"
          labelCol={{
            xs: { span: 24 },
            sm: { span: 4 }
          }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 16 }
          }}
        >
          {getFieldDecorator("role", {
            rules: [{ required: true, message: "请选取角色" }]
          })(
            <Select>
              {JSON.parse(allRole).map(i => {
                return <Option value={i.id} key={i.id}>{i.name}</Option>;
              })}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label="状态"
          labelCol={{
            xs: { span: 24 },
            sm: { span: 4 }
          }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 16 }
          }}
        >
          {getFieldDecorator("status", {
            rules: [{ required: true, message: "请输入用户名" }]
          })(
            <Select>
              <Option value="1">正常</Option>
              <Option value="0">停用</Option>
            </Select>
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({
  name: "user_form",
  mapPropsToFields(props) {
    if (props.form_type === "edit") {
      return {
        id: Form.createFormField({
          value: props.record.id
        }),
        username: Form.createFormField({
          value: props.record.username
        }),
        role: Form.createFormField({
          value: props.record.roleId
        }),
        status: Form.createFormField({
          value: props.record.status === 1 ? "正常" : "停用"
        })
      };
    }
  }
})(UserForm);
