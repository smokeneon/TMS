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
    // console.log('currentUser, currentUser.id',currentUser, currentUser.id);
    const isLogin = currentUser && currentUser.userId;
    const token = localStorage.getItem('antd-pro-authority')
    const handleIsLogin = sessionStorage.getItem("isLogin")
    const queryString = stringify({
      redirect: window.location.href,
    });
    console.log('isLogin', isLogin);
    // if (!isLogin &&  window.location.pathname !== '/user/login') {
    //   return <Redirect to={`/user/login?${queryString}`} />;
    // }
    console.log('handleIslogin', handleIsLogin);
    if ((handleIsLogin === null || handleIsLogin === false) && window.location.pathname !== '/user/login') {
      message.warning('请先登陆！')
      return <Redirect to={`/user/login?${queryString}`} />;
    }
    // if ((handleIsLogin === null || handleIsLogin === false )&& window.location.pathname !== '/user/login') {
    //     message.warning('请先登陆！')
    //     return <Redirect to={`/user/login?${queryString}`} />;
    // } 
    // if (token === null && window.location.pathname !== '/user/login') {
    //   message.warning('请先登陆！')
    //   return <Redirect to={`/user/login?${queryString}`} />;
    // }
    // if ((!isLogin && loading) || !isReady || typeof(toke))
    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }

    // if (!isLogin && window.location.pathname !== '/user/login') {
    //   return <Redirect to={`/user/login?${queryString}`} />;
    // }
    console.log('children', children);
    return children;
  }
}

export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
