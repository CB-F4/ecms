import React, { Component } from "react";
import { connect } from "react-redux";
import { actionCreator } from "./store";

import { Table, Button, Modal } from "antd";
import UserForm from "./UserForm";

class UserClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: null,
      form_type: "add"
    };
    this.formOpen = this.formOpen.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  formOpen(record, type='add') {
    this.setState({
      form_type: type,
      record
    });
    this.props.changeDialog(true);
  }

  handleCancel() {
    this.setState({
      recode: null,
      type: "add"
    });
    this.props.changeDialog(false);
  }

  handleSubmit() {
    this.refs.form.validateFields((err, values) => {
      if (values.status === "正常") {
        values.status = 1;
      } else if (values.status === "停用") {
        values.status = 0;
      }

      this.props.submitAction(values, this.state.form_type);
    });
  }

  componentDidMount() {
    this.props.getUserList();
  }

  render() {
    const columns = [
      {
        title: "id",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "用户名",
        dataIndex: "username",
        key: "username"
      },
      {
        title: "角色",
        dataIndex: "roleName",
        key: "roleName"
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        render: text => {
          return text === 0 ? (
            <span style={{ color: "red" }}>停用</span>
          ) : (
            <span>正常</span>
          );
        }
      },
      {
        title: "操作",
        render: record => (
          <div>
            <Button
              size="small"
              type="primary"
              style={{ marginRight: "5px" }}
              onClick={() => this.formOpen(record, "edit")}
            >
              编辑
            </Button>
            <Button
              size="small"
              type="danger"
              onClick={() => this.props.deleteAction(record.id)}
              disabled={record.status === 1 ? true : false}
            >
              删除
            </Button>
          </div>
        ),
        key: "action",
        width: 135
      }
    ];
    return (
      <div>
        <Button type="primary" onClick={() => this.formOpen(null, "add")}>
          增加用户
        </Button>
        <Table
          style={{
            marginTop: "20px"
          }}
          dataSource={this.props.dataSource}
          columns={columns}
          bordered
        />
        <Modal
          visible={this.props.dialog}
          onCancel={this.handleCancel}
          footer={[
            <Button type="primary" key="submit" onClick={this.handleSubmit}>
              提交
            </Button>,
            <Button key="cancel" onClick={this.handleCancel}>
              取消
            </Button>
          ]}
        >
          <UserForm
            ref="form"
            record={this.state.record}
            form_type={this.state.form_type}
          ></UserForm>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    dataSource: Array.from(state.getIn(["user", "list"])),
    dialog: state.getIn(["user", "dialog"])
  });

const mapDispatchToProps = dispatch => ({
  getUserList() {
    dispatch(actionCreator.getUserList());
  },
  changeDialog(isOpen) {
    dispatch(actionCreator.changeDialog(isOpen));
  },
  submitAction(record, type) {    
    record.role_id = record.role;
    delete record.role;
    record.password = 'hello';
    dispatch(actionCreator.submit(record, type));
  },
  deleteAction(id) {
    dispatch(actionCreator.userDelete(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserClass);
