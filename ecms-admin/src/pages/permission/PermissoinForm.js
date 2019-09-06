import React, { Component } from "react";
import { Form, Input, Select } from "antd";
const { Option } = Select;

class PermissionForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        {getFieldDecorator("id")(<Input style={{ display: "none" }}></Input>)}
        <Form.Item
          label="权限名"
          labelCol={{
            xs: { span: 24 },
            sm: { span: 4 }
          }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 16 }
          }}
        >
          {getFieldDecorator("title", {
            rules: [{ required: true, message: "请输入权限名" }]
          })(<Input></Input>)}
        </Form.Item>
        <Form.Item
          label="类型"
          labelCol={{
            xs: { span: 24 },
            sm: { span: 4 }
          }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 16 }
          }}
        >
          {getFieldDecorator("type", {
            rules: [{ required: true, message: "请输入类型" }]
          })(
            <Select>
              <Option value={1}>模块</Option>
              <Option value={2}>菜单</Option>
              <Option value={3}>操作</Option>
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
            rules: [{ required: true, message: "请输入状态" }]
          })(
            <Select>
              <Option value={1}>正常</Option>
              <Option value={0}>停用</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label="url"
          labelCol={{
            xs: { span: 24 },
            sm: { span: 4 }
          }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 16 }
          }}
        >
          {getFieldDecorator("url", {
            rules: [{ required: true, message: "请输入url" }]
          })(<Input></Input>)}
        </Form.Item>
        <Form.Item
          label="所属模块"
          labelCol={{
            xs: { span: 24 },
            sm: { span: 4 }
          }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 16 }
          }}
        >
          {getFieldDecorator("permission_id", {
            rules: [{ required: true, message: "请输入url" }]
          })(
            <Select>
              {this.props.module_list.map(i => {
                return(
                  <Option value={i.id} key={i.key}>{ i.title }</Option>
                )
              })}
            </Select>
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({
  name: "permission_form",
  mapPropsToFields(props) {
    if (props.form_type === "edit") {
      return {
        id: Form.createFormField({
          value: props.record.id
        }),
        title: Form.createFormField({
          value: props.record.title
        }),
        type: Form.createFormField({
          value:
            props.record.type === 1
              ? "模块"
              : props.record.type === 2
              ? "菜单"
              : "操作"
        }),
        status: Form.createFormField({
          value: props.record.status === 1 ? "正常" : "停用"
        }),
        url: Form.createFormField({
          value: props.record.url
        }),
        permission_id: Form.createFormField({
          value: props.record.permission_id
        })
      };
    }
  }
})(PermissionForm);
