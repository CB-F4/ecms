import React, { Component } from "react";

import { Form, Input, Icon, Select, Button } from "antd";

const { Option } = Select;

class RoleForm extends Component {
  constructor(props) {
    super(props);
    this.handleClean = this.handleClean.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (this.props.form_type === 'edit') {
        this.props.onSubmit({id: this.props.record.id, ...values});
        return;
      } 
      this.props.onSubmit(values);
      
    });
  }
  handleClean() {
    this.props.form.resetFields();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item
          label="角色名"
          labelCol={{
            xs: { span: 24 },
            sm: { span: 4 }
          }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 16 }
          }}
        >
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "请输入角色名" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            />
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
            rules: [{ required: true, message: "状态" }]
          })(
            <Select>
              <Option value="0">停用</Option>
              <Option value="1">正常</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">提交</Button>
          <Button onClick={this.handleClean}>清除</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({
  name: "role_form",
  mapPropsToFields(props) {
    if (props.form_type === 'edit') {
      return {
        name: Form.createFormField({
          value: props.record.name
        }),
        status: Form.createFormField({
          value: props.record.status === 1? '正常': '停用'
        })
      };
    } else {
      
    }
    
  }
})(RoleForm);
