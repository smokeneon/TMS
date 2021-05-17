import React, { useState, useEffect } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Descriptions, message, Space, Table, Typography, Tag, Spin } from 'antd'
import { getMe, getMyCourse, getMyApply } from './api'
import { connect, Link } from 'umi'
import { identityState } from '../../common/const'
import { OpenState, ApprovalState, applyState, } from '../../common/const'
import moment from 'moment'

const Index = (props) => {
  const { currentUser } = props;
  const [userInfo, setUserInfo] = useState({})
  const [userLoading, setUserLoading] = useState(false)

  const [courseInfo, setCourseInfo] = useState({})
  const [courseTableLoading, setCourseTableLoading] = useState(false)

  const [applyInfo, setApplyInfo] = useState({})
  const [applyTableLoading, setApplyTableLoading] = useState(false)

  const courseParams = { page: 1, size: 10, search: null }
  const applyParams = { page: 1, size: 10, search: null }
  
  
  const columns1 = [
    {
      title: '申报id',
      dataIndex: 'applyId',
      key: 'applyId',
      render: (text) => text,
    },
    {
      title: '申报编号',
      dataIndex: 'applyNumber',
      key: 'applyNumber',
      width: 150,
      render: (text, record) => (
        <Typography.Text style={{ width: 150 }} ellipsis={{ tooltip: text }}>
         {text}
        </Typography.Text>
      ),
    },
    {
      title: '申报课程名',
      dataIndex: 'courseName',
      key: 'owner',
      width: 150,
      render: (text, record) => (
        <Typography.Text style={{ width: 150 }} ellipsis={{ tooltip: text }}>
          {record.course.courseName}
        </Typography.Text>
      ),
    },
    {
      title: '参训者',
      dataIndex: 'realName',
      key: 'realName',
      width: 150,
      render: (text, record) => (
        <Typography.Text style={{ width: 150 }} ellipsis={{ tooltip: text }}>
          {record.stu[0] && record.stu[0].realname+' (' + record.stu[0].username + ')'}
        </Typography.Text>
      ),
    },
    {
      title: '专家',
      dataIndex: 'tea',
      key: 'tea',
      width: 150,
      render: (text, record) => (
        <Typography.Text style={{ width: 150 }} ellipsis={{ tooltip: text }}>
          {record.course && record.course.users[0] && record.course.users[0].realname+' (' + record.course.users[0].username + ')'}
        </Typography.Text>
      ),
    },
    {
      title: '当前状态',
      dataIndex: 'approvalState',
      key: 'approvalState',
      render: (text, record) => {
        if (text === 0) {
          return <Tag color="#87d068">{applyState[text]}</Tag>
        }
        if (text === 1) {
          return <Tag color="#2db7f5">{applyState[text]}</Tag>
        }
        if (text === 2) {
          return <Tag color="#f50">{applyState[text]}</Tag>
        }
      },
    },
  ];
  
  const columns2 = [
    {
      title: '课程名',
      dataIndex: 'courseName',
      key: 'courseName',
      width: 160,
      render: (text, record) => (
        <Typography.Text style={{ width: 160 }} ellipsis={{ tooltip: text }}>
           {text}
        </Typography.Text>
      ),
    },
    {
      title: '所属学科',
      dataIndex: 'subject',
      key: 'subject',
      width: 160,
      render: (text) => (
        <Typography.Text style={{ width: 160 }} ellipsis={{ tooltip: text }}>
          {text}
        </Typography.Text>
      ),
    },
    {
      title: '开课专家',
      dataIndex: 'teacher',
      key: 'teacher',
      width: 160,
      render: (text, record) => (
        <Typography.Text style={{ width: 160 }} ellipsis={{ tooltip: text }}>
          {record.users[0] && record.users[0].realname + ' (' + record.users[0].username + ')'}
        </Typography.Text>
      ),
    },
    {
      title: '是否开放申请',
      dataIndex: 'openState',
      key: 'openState',
      render: (text, record) => {
        if (record.approvalState === 2) {
          if (text === 0 ) {
            return (
              <Tag color="cyan">{OpenState[text]}</Tag>
            )
          }
          if (text === 1) {
            return (
              <Tag color="volcano">{OpenState[text]}</Tag>
            )
          }
          if (text === 2) {
            return (
              <Tag color="blue">{OpenState[text]}</Tag>
            )
          }
        } else {
          return (
            <Tag>不允许</Tag>
          )
        }
        
      },
    },
    {
      title: '审批状态',
      dataIndex: 'approvalState',
      key: 'approvalState',
      render: text => {
        if (text === 0) {
          return (
            <Tag color="cyan">{ApprovalState[text]}</Tag>
          )
        }

        if (text === 1) {
          return (
            <Tag color="orange">{ApprovalState[text]}</Tag>
          )
        }

        if (text === 2) {
          return (
            <Tag color="green">{ApprovalState[text]}</Tag>
          )
        }

        if (text === 3) {
          return (
            <Tag color="red">{ApprovalState[text]}</Tag>
          )
        }

      }
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      render: (text, record) => (
        <Space size="middle">
          <Link to={{
            pathname: '/tea/course/details',
            query: {
              courseId: record.courseId,
            }
          }}>
            <a>详情</a>
          </Link>
        </Space>
      ),
    },
  ]

  const paginationCourseOnChange = (page, size) => {
    const newRequestParma = courseParams
    newRequestParma.page = page
    newRequestParma.size = size
    getCourse(newRequestParma)
  }
  const paginationApplyOnChange = (page, size) => {
    const newRequestParma = courseParams
    newRequestParma.page = page
    newRequestParma.size = size
    getApply(newRequestParma)
  }
  const getMyInfo = () => {
    setUserLoading(true)
    getMe(currentUser.userId).then(res => {
      if (res.data.code === 0) {
        setUserInfo(res.data.data)
        setUserLoading(false)
      } else {
        message.error('获取用户信息失败')
      }
    }).catch(error => {
      message.error('获取用户信息失败')
    })
  }
  const getCourse = (params) => {
    // 一般为专家用户id
    setCourseTableLoading(true)
    let userId = currentUser.userId;
    getMyCourse(params, userId).then(res => {
      if( res.data.code === 0) {
        setCourseInfo(res.data)
        setCourseTableLoading(false)
      } else {
        message.error(res.data.message)
      }
    }).catch(error => {
      message.error('课程获取失败')
    })
  }
  const getApply = (params) => {
    setApplyTableLoading(true)
    let userId = currentUser.userId;
    getMyApply(params, userId).then(res => {
      if (res.data.code === 0 ) {
        setApplyInfo(res.data)
        setApplyTableLoading(false)
      } else {
        message.error(res.data.message)
      }
    }).catch( error => {
      message.error('申报获取失败')
    })
  }
  useEffect(() => {
    getMyInfo()
    getCourse(courseParams)
    getApply(applyParams)
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
      {
        userLoading ? <Spin /> : (
          <Descriptions>
          <Descriptions.Item label="用户编号">{ userInfo.stuNum }</Descriptions.Item>
          <Descriptions.Item label="用户名">{ userInfo.username }</Descriptions.Item>
          <Descriptions.Item label="真实姓名">{ userInfo.realname }</Descriptions.Item>
          <Descriptions.Item label="邮箱">{ userInfo.email }</Descriptions.Item>
          <Descriptions.Item label="角色">{ identityState[userInfo.identity]}</Descriptions.Item>
          <Descriptions.Item label="更新日期">{ moment(userInfo.timeStamp).format('YYYY-MM-DD')  }</Descriptions.Item>
        </Descriptions>

        )
      }
        
      </Card>
      {
        (currentUser.identity === 'stu' || currentUser.identity === 'admin') && (
        <Card
          title="我的申报"
          style={{
            margin: '16px 0 0 0'
          }}
        >
           <Table
            dataSource={applyInfo.data}
            columns={columns1}
            loading={applyTableLoading}
            rowKey="id"
            pagination={{
              showSizeChanger: true,
              total: Number(applyInfo.total),
              pageSize: Number(applyInfo.size),
              current: Number(applyInfo.page),
              onChange: paginationApplyOnChange,
            }}
            />
        </Card>
        )
      }
      {
         (currentUser.identity === 'tea' || currentUser.identity === 'admin') && (
          <Card
            title="我的课程"
            style={{
              margin: '16px 0 0 0'
            }}
          >
            <Table
              dataSource={courseInfo.data}
              columns={columns2}
              loading={courseTableLoading}
              rowKey="id"
              pagination={{
                showSizeChanger: true,
                total: Number(courseInfo.total),
                pageSize: Number(courseInfo.size),
                current: Number(courseInfo.page),
                onChange: paginationCourseOnChange,
              }}
              />
          </Card>
         )
      }
    </PageContainer>
  )
}

export default connect((user) => ({
  currentUser: user.user.currentUser
}))(Index);
