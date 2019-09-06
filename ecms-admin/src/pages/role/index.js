import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Button, Modal } from "antd";
import { actionCreator } from "./store";
import RoleForm from "./RoleForm";
import AccessForm from "./AccessForm";

class RoleClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form_type: "add",
      record: null
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleAccessCancel = this.handleAccessCancel.bind(this);
    this.accessOpen = this.accessOpen.bind(this);
    this.handleAccessSubmit = this.handleAccessSubmit.bind(this);
  }

  formOpen(record, type = "add") {
    this.props.editDialogAction(true);
    this.setState({
      form_type: type,
      record
    });
  }

  accessOpen(record) {
    this.setState({
      record
    });
    this.props.getRolePermission(record.id);
    setTimeout(() => {
      this.props.changeAccessDialogAction(true);
    }, 200);
    
  }

  handleCancel() {
    this.props.editDialogAction(false);
    this.setState({
      record: {
        name: "",
        stauts: ""
      }
    });
  }

  handleAccessCancel() {
    this.props.changeAccessDialogAction(false);
  }
  handleAccessSubmit() {
    const keys = this.refs.accessForm.state.targetKeys;
    this.props.accessAction(keys,  this.state.record.id);
    
  }

  handleFormSubmit(record) {
    this.props.formSubmitAction(record, this.state.form_type);
  }

  componentDidMount() {
    this.props.getListAction();
  }

  render() {
    const columns = [
      {
        title: "id",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "角色",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "stauts",
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
              style={{
                backgroundColor: "#FF9900",
                marginRight: "5px"
              }}
              onClick={() => this.accessOpen(record)}
            >
              授权
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
        width: 195
      }
    ];
    return (
      <div>
        <Button type="primary" onClick={() => this.formOpen(null, "add")}>
          增加角色
        </Button>
        <Table
          dataSource={this.props.dataSource}
          columns={columns}
          bordered
          style={{
            marginTop: "20px"
          }}
        />
        <Modal
          title="编辑角色"
          visible={this.props.edit_dialog}
          onCancel={this.handleCancel}
          footer={null}
        >
          <RoleForm
            record={this.state.record}
            onSubmit={this.handleFormSubmit}
            form_type={this.state.form_type}
          ></RoleForm>
        </Modal>
        <Modal
          title="授权"
          visible={this.props.access_dialog}
          onCancel={this.handleAccessCancel}
          footer={[
            <Button key="submit" type="primary" onClick={this.handleAccessSubmit}>
              提交
            </Button>,
            <Button key="cancel" onClick={this.handleAccessCancel}>
              取消
            </Button>
          ]}
        >
          <AccessForm
            allPermission={this.props.allPermission}
            rolePermission={this.props.rolePermission}
            ref="accessForm"
          ></AccessForm>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataSource: Array.from(state.getIn(["role", "list"])),
    edit_dialog: state.getIn(["role", "edit_dialog"]),
    access_dialog: state.getIn(["role", "access_dialog"]),
    allPermission: state.getIn(["role", "all_permission"]),
    rolePermission: state.getIn(["role", "role_permission"])
  };
};

const mapDispatchToProps = dispatch => ({
  getListAction() {
    dispatch(actionCreator.getRoleList());
  },
  formSubmitAction(record, type) {
    dispatch(actionCreator.formSubmit(record, type));
  },
  editDialogAction(isOpen) {
    dispatch(actionCreator.editDialog(isOpen));
  },
  changeAccessDialogAction(isOpen) {
    dispatch(actionCreator.changeAccessDialog(isOpen));
  },
  deleteAction(id) {
    dispatch(actionCreator.roleDelete(id));
  },
  getRolePermission(rid) {
    dispatch(actionCreator.getRolePermission(rid));
  },
  accessAction(keys, rid) {
    dispatch(actionCreator.accessSubmit(keys, rid));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleClass);
