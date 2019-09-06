import React, { Component } from "react";
import { Transfer, Tree } from "antd";

const { TreeNode } = Tree;

const isChecked = (selectedKeys, eventKey) => {
  return selectedKeys.indexOf(eventKey) !== -1;
};

const generateTree = (treeNodes = [], checkedKeys = []) => {
  return treeNodes.map(({ children, ...props }) => (
    <TreeNode
      {...props}
      disabled={checkedKeys.includes(props.key)}
      key={props.key}
    >
      {generateTree(children, checkedKeys)}
    </TreeNode>
  ));
};

const TreeTransfer = ({ dataSource, targetKeys, ...restProps }) => {
  const transferDataSource = [];
  function flatten(list = []) {
    list.forEach(item => {
      transferDataSource.push(item);
      flatten(item.children);
    });
  }
  flatten(dataSource);

  return (
    <Transfer
      {...restProps}
      targetKeys={targetKeys}
      dataSource={transferDataSource}
      className="tree-transfer"
      render={item => item.title}
      showSelectAll={false}
    >
      {({ direction, onItemSelect, selectedKeys }) => {
        if (direction === "left") {
          const checkedKeys = [...selectedKeys, ...targetKeys];
          return (
            <Tree
              blockNode
              checkable
              checkStrictly
              defaultExpandAll
              checkedKeys={checkedKeys}
              onCheck={(
                _,
                {
                  node: {
                    props: { eventKey }
                  }
                }
              ) => {
                onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
              }}
              onSelect={(
                _,
                {
                  node: {
                    props: { eventKey }
                  }
                }
              ) => {
                onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
              }}
            >
              {generateTree(dataSource, targetKeys)}
            </Tree>
          );
        }
      }}
    </Transfer>
  );
};

class AccessFormClass extends Component {
  state = {
    targetKeys: this.props.rolePermission
  };

  componentWillUpdate(previousProps, previousState) {
    if (previousProps.rolePermission !== this.props.rolePermission) {
      this.setState({
        targetKeys: previousProps.rolePermission
      });
    }
  }

  onChange = targetKeys => {
    targetKeys = targetKeys.map(i => {
      return Number(i);
    });

    this.setState({
      targetKeys
    });
  };

  render() {
    return (
      <div>
        <TreeTransfer
          dataSource={this.props.allPermission}
          targetKeys={this.state.targetKeys}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default AccessFormClass;
