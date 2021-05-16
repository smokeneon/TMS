import React, { useState, useEffect } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Descriptions, message, Space } from 'antd'
import { getMe } from './api'
import { connect } from 'umi'
import { identityState } from '../../common/const'
import moment from 'moment'

const Index = (props) => {
  const { currentUser } = props;
  const [userInfo, setUserInfo] = useState({})
 
  const getMyInfo = () => {
    getMe(currentUser.userId).then(res => {
      if (res.data.code === 0) {
        setUserInfo(res.data.data)
      } else {
        message.error('获取用户信息失败')
      }
    }).catch(error => {
      message.error('获取用户信息失败')
    })
  }
  useEffect(() => {
    getMyInfo()
  }, [])
  return (
    <PageContainer content="该页面展示你的账户信息">
      <Card
        title="用户信息"
        // extra={
        //   <Space>
        //     <Button>更改密码</Button>
        //     <Button type="primary">更改邮箱</Button>
        //   </Space>
        // }
      >
        <Descriptions>
          <Descriptions.Item label="用户编号">{ userInfo.stuNum }</Descriptions.Item>
          <Descriptions.Item label="用户名">{ userInfo.username }</Descriptions.Item>
          <Descriptions.Item label="真实姓名">{ userInfo.realname }</Descriptions.Item>
          <Descriptions.Item label="邮箱">{ userInfo.email }</Descriptions.Item>
          <Descriptions.Item label="角色">{ identityState[userInfo.identity]}</Descriptions.Item>
          <Descriptions.Item label="更新日期">{ moment(userInfo.timeStamp).format('YYYY-MM-DD')  }</Descriptions.Item>
        </Descriptions>

        
      </Card>
      {/* <Card
        title="我的申报"
        style={{
          margin: '16px 0 0 0'
        }}
      >

      </Card>
      <Card
        title="我的课程"
        style={{
          margin: '16px 0 0 0'
        }}
      >
      </Card> */}
    </PageContainer>
  )
}

export default connect((user) => ({
  currentUser: user.user.currentUser
}))(Index);
