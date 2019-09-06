import React, { Component } from "react";
import { connect } from "react-redux";
import { actionCreator } from "./store";
import { Table, Button, Modal } from "antd";
import PermissionForm from "./PermissoinForm";

class PermissionClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form_type: "add",
      record: null
    };
    this.formOpen = this.formOpen.bind(this);
    this.permissionDelete = this.permissionDelete.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  formOpen(record, type) {
    this.setState({
      record,
      form_type: type
    });
    this.props.changeDialog(true);
  }

  handleCancel() {
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

  permissionDelete(id) {
    this.props.deleteAction(id);
  }

  componentDidMount() {
    this.props.getAllPermission();
  }

  render() {
    const columns = [
      {
        title: "id",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "权限名",
        dataIndex: "title",
        key: "title"
      },
      {
        title: "url",
        dataIndex: "url",
        key: "url"
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        render: i => {
          return <span>{i === 1 ? "正常" : "停用"}</span>;
        }
      },
      {
        title: "更新时间",
        dataIndex: "updated_at",
        key: "updated_at",
        render: i => {
          const date = new Date(i);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const currentDate = year + "/" + month + "/" + day;
          return <span>{currentDate}</span>;
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
              onClick={() => this.permissionDelete(record.id)}
            >
              删除
            </Button>
          </div>
        )
      }
    ];
    return (
      <div>
        <Button
          type="primary"
          style={{ marginBottom: "20px" }}
          onClick={() => this.formOpen(null, "add")}
        >
          新增权限
        </Button>
        <Table
          bordered
          dataSource={this.props.dataSource}
          columns={columns}
        ></Table>
        <Modal
          visible={this.props.dialog}
          onCancel={this.handleCancel}
          title="编辑权限"
          footer={[
            <Button type="primary" key="submit" onClick={this.handleSubmit}>
              提交
            </Button>,
            <Button key="cancel" onClick={this.handleCancel}>
              取消
            </Button>
          ]}
        >
          <PermissionForm
            ref="form"
            form_type={this.state.form_type}
            record={this.state.record}
            module_list={this.props.module_list}
          ></PermissionForm>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dataSource: Array.from(state.getIn(["permission", "list"])),
  dialog: state.getIn(["permission", "dialog"]),
  module_list: state.getIn(["permission", "module_list"])
});

const mapDispatchToProps = dispatch => ({
  getAllPermission() {
    dispatch(actionCreator.getAllPermission());
  },
  changeDialog(isOpen) {
    dispatch(actionCreator.changeDialog(isOpen));
  },
  submitAction(record, type) {
    if (record.type === '模块') {
      record.type = 1;
    } else if (record.type === '菜单') {
      record.type = 2;
    } else if (record.type === '操作') {
      record.type = 3;
    }
    dispatch(actionCreator.submit(record, type));
  },
  deleteAction(id) {
    dispatch(actionCreator.permissionDelete(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PermissionClass);
