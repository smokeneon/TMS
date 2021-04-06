import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  SolutionOutlined,
  KeyOutlined
} from '@ant-design/icons';

import { Alert, Tabs, message } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { FormattedMessage } from 'umi';
import styles from './index.less';
import { connect } from 'umi';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [type, setType] = useState('account');

  const handleSubmit = (values) => {
    console.log('type', type);
    if (type === 'account') {
      const { dispatch } = props;
      dispatch({
        type: 'login/login',
        payload: { ...values, type },
      });
    }
    if (type === 'register') {
      message.success('注册成功')
    }
   
  };

  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          searchConfig: {
            submitText: '登录 / 注册',
          },
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values);
          return Promise.resolve();
        }}
      >
         <Tabs activeKey={type} onChange={setType}>
          <Tabs.TabPane
            key="account"
            tab="登陆"
          />
          <Tabs.TabPane
            key="register"
            tab="注册"
          />
        </Tabs>

        {status === 'error' && loginType === 'account' && !submitting && (
          <LoginMessage
            content="账户或密码错误"
          />
        )}
        {type === 'account' && (
          <>
            <ProFormText
              name="userName"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder="用户名: 测试账号admin"
              rules={[
                {
                  required: true,
                  message: "用户名不能为空"
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder="密码: 测试账号admin"
              rules={[
                {
                  required: true,
                  message: "密码不能为空"
                },
              ]}
            />
            <div
              style={{
                marginBottom: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
              </a>
            </div>
          </>
        )}

        {type === 'register' && (
          <>
           <ProFormText
              name="userName"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder="请输入用户名"
              rules={[
                {
                  required: true,
                  message: "用户名不能为空",
                },
              ]}
            />
             <ProFormText
              name="realName"
              fieldProps={{
                size: 'large',
                prefix: <SolutionOutlined  className={styles.prefixIcon} />,
              }}
              placeholder="请输入真实姓名"
              rules={[
                {
                  required: true,
                  message: "真实姓名不能为空"
                },
              ]}
            />
             <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder="请输入密码"
              rules={[
                {
                  required: true,
                  message: "密码不能为空",
                },
              ]}
            />
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MailOutlined className={styles.prefixIcon} />,
              }}
              name="email"
              placeholder="邮箱"
              rules={[
                {
                  required: true,
                  message: "请输入邮箱",
                },
                {
                  pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$$/,
                  message: '邮箱格式错误',
                },
              ]}
            />
            <ProFormCaptcha
            fieldProps={{
              size: 'large',
              prefix: <KeyOutlined className={styles.prefixIcon} />,
            }}
            captchaProps={{
              size: 'large',
            }}
            phoneName="email"
            name="code"
            rules={[
              {
                required: true,
                message: '请输入验证码',
              },
            ]}
            placeholder="请输入验证码"
            onGetCaptcha={(email) => {
              // await waitTime(1000);
              setTimeout(() => {
                message.success(`邮箱 ${email} 验证码发送成功!`);
              }, 1000);
             
            }}
          />
          </>
        )}

        {status === 'error' && loginType === 'mobile' && !submitting && (
          <LoginMessage content="验证码错误" />
        )}
       
      </ProForm>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
