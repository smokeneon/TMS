import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect, connect } from 'umi';
import { stringify } from 'querystring';
import { message } from 'antd';

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }


  render() {

    const { isReady } = this.state;
    const { children, loading, currentUser } = this.props; // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）

    const isLogin = currentUser && currentUser.userId;

    const token = localStorage.getItem('token')

    const getTokenTime = localStorage.getItem('getTokenTime')
    console.log('getTokenTime', getTokenTime);
    const getNowTime = new Date().getTime()
    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }
    // 1h 3600000
    if ((getTokenTime != null && (getNowTime - getTokenTime) > 3600000)) {
      message.warning('登陆超时，请重新登陆！')
      return <Redirect to={`/user/login`} />;
    }

    if (!isLogin && window.location.pathname !== '/user/login' || token === null) {
      return <Redirect to={`/user/login`} />;
    }

    return children;
  }
}

export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);

