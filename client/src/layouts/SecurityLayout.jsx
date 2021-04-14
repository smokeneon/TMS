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
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, currentUser } = this.props; // You can replace it to your authentication rule (such as check token exists)
    const isLogin = currentUser && currentUser.userId;
    if (!isLogin &&  window.location.pathname !== '/user/login') {
      message.warning('请先登陆！')
      return <Redirect to={`/user/login`} />;
    }
    // if ((handleIsLogin === null || handleIsLogin === false) && window.location.pathname !== '/user/login') {
    //   message.warning('请先登陆！')
    //   return <Redirect to={`/user/login?${queryString}`} />;
    // }
    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }
    return children;
  }
}

export default connect(({ login, loading }) => ({
  currentUser: login.userData,
  loading: loading.models.user,
}))(SecurityLayout);
