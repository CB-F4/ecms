import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Form, Input, Button, Icon, Row, Col } from 'antd';

import { FormComponentProps } from 'antd/lib/form';
import styles from './Login.less';

interface IFormComponentProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  submitting: boolean;
}

@connect(({ loading }: { loading: { effects: { [key: string]: string } } }) => ({
  submitting: loading.effects['user/login'],
}))
class LoginPage extends PureComponent<IFormComponentProps> {
  state = {};

  componentDidMount() {
    this.handleGetCaptcha();
  }

  handleGetCaptcha = () => {
    // this.setState({
    //   captcha: `/api/admin/captcha?random=${Math.random()}`,
    // });
  };

  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'login/login',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;

    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <div className={styles.main}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('username')(
              <Input
                size="large"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password')(
              <Input
                size="large"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              type="primary"
              loading={submitting}
              htmlType="submit"
              className={styles.loginFormButton}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Form.create<IFormComponentProps>()(LoginPage);
