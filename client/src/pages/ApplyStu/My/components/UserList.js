import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Table, Space, Typography, Form, Input, Button, Popconfirm, message, Tag,  Drawer, Descriptions, Card } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Moment from 'moment'
import { applyState, ApprovalState, OpenState } from '../../../../common/const'
import { deleteItem, getApplyList } from '../api'
import { connect } from 'umi';
import moment from 'moment'
const formItemLayout = {
  labelCol: { span: 1 },
  wrapperCol: { span: 23 },
}

const SubjectList = forwardRef((props, ref) => {
  const { currentUser } = props;
  const [tableData, setTableData] = useState([])
  const [pagination, setPagination] = useState({})
  const [tableLoading, setTableLoading] = useState(true)
  const [searchLoading, setSearchLoading] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false)
  const [drawerRecord, setDrawerRecord] = useState({})
  const requestParams = { page: 1, size: 10, search: null, }
  const [form] = Form.useForm()
  let stuId = currentUser.userId;
  const getList = params => {
    setTableLoading(true)
    getApplyList(params, stuId).then(res => {
      if (res.status === 200) {
        const { page, size, data, total } = res.data
        setTableData(data)
        setPagination({page, size, total})
        setTableLoading(false)
      }
    }).catch(err => {
        message.error(err.message)
    })
  }

  useImperativeHandle(ref, () => ({
    getSubjectList: () => getList(requestParams),
  }))

  const paginationOnChange = (page, size) => {
    const newRequestParma = requestParams
    newRequestParma.page = page
    newRequestParma.size = size
    getList(newRequestParma)
  }
  const onSearch = async values => {
    setSearchLoading(true)
    const newRequestParma = requestParams
    newRequestParma.page = 1
    newRequestParma.search = values.searchText
    try {
      await getList(newRequestParma)
      setSearchLoading(false)
    } catch (error) {
      setSearchLoading(false)
    }
  }
  const deleteConfirm = record => () => {
    deleteItem(record.applyId).then(res => {
      if(res.data.code === 0) {
        message.success(res.data.message)
        getList(requestParams)
      } else {
        message.error(res.data.message)
      }
      
    }).catch(error => {
      message.error('删除失败')
    })
  }

  const showDetailDrawer = record => () => {
    setDrawerRecord(record)
    setShowDrawer(true)
  }

  const onClose = () => {
    setShowDrawer(false)
  };
  const columns = [
    {
      title: '申报id',
      dataIndex: 'applyId',
      key: 'applyId',
      width: 80,
      render: (text) => text,
    },
    {
      title: '申报编号',
      dataIndex: 'applyNumber',
      key: 'applyNumber',
      width: 120,
      render: (text, record) => (
        <Typography.Text style={{ width: 120 }} ellipsis={{ tooltip: text }}>
          <a onClick={showDetailDrawer(record)}>
          {text}
          </a>
        </Typography.Text>
      ),
    },
    {
      title: '申报课程名',
      dataIndex: 'courseName',
      key: 'owner',
      width: 120,
      render: (text, record) => (
        <Typography.Text style={{ width: 120 }} ellipsis={{ tooltip: text }}>
          {record.course.courseName}
        </Typography.Text>
      ),
    },
    {
      title: '参训者',
      dataIndex: 'realName',
      key: 'realName',
      width: 120,
      render: (text, record) => (
        <Typography.Text style={{ width: 120 }} ellipsis={{ tooltip: text }}>
          {record.stu[0] && record.stu[0].realname+' (' + record.stu[0].username + ')'}
        </Typography.Text>
      ),
    },
    {
      title: '专家',
      dataIndex: 'tea',
      key: 'tea',
      width: 120,
      render: (text, record) => (
        <Typography.Text style={{ width: 120 }} ellipsis={{ tooltip: text }}>
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
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={showDetailDrawer(record)}>
            详情
          </a>
        </Space>
      ),
    },
  ]

  useEffect(() => {
    getList(requestParams)
  }, [])
  return (
    <div>
      <div style={{padding: '0px 0 24px 0', display: 'flex', justifyContent: 'flex-end'}}>
        <Form onFinish={onSearch} form={form} layout="inline">
          <Form.Item name="searchText" {...formItemLayout}>
            <Input placeholder="请输入申报编号" style={{ width: 200 }} />
          </Form.Item>
          <Button icon={<SearchOutlined />} type="primary" loading={searchLoading} htmlType="submit">
            查询
          </Button>
        </Form>
      </div>
      <Table
        columns={columns}
        dataSource={tableData}
        loading={tableLoading}
        rowKey="id"
        pagination={{
          showSizeChanger: true,
          total: Number(pagination.total),
          pageSize: Number(pagination.size),
          current: Number(pagination.page),
          onChange: paginationOnChange,
        }}
      />
       <Drawer
        title="申报详情"
        placement="bottom"
        closable={false}
        onClose={onClose}
        height="70vh"
        visible={showDrawer}
      >
        <Card>
          <Descriptions title="基本信息">
            <Descriptions.Item label="申报编号">{drawerRecord.applyNumber}</Descriptions.Item>
            <Descriptions.Item label="分数">{ 
              drawerRecord.course 
              && drawerRecord.course.approvalState === 2 
              && drawerRecord.course.openState === 2 ? 
             (drawerRecord.score === '-1' ? drawerRecord.score : '分数未录入' ) 
             : '课程未完结'
            }</Descriptions.Item>
            <Descriptions.Item label="申报时间">{moment(drawerRecord.timeStamp).format('YYYY-MM-DD')}</Descriptions.Item>
            <Descriptions.Item label="申报姓名">{drawerRecord.stu && drawerRecord.stu["0"].realname}</Descriptions.Item>
            <Descriptions.Item label="申报用户名">{drawerRecord.stu && drawerRecord.stu["0"].username}</Descriptions.Item>
            <Descriptions.Item label="申报人邮箱">{drawerRecord.stu && drawerRecord.stu["0"].email}</Descriptions.Item>
          </Descriptions>

          <Descriptions title="课程信息">
            <Descriptions.Item label="课程id">{drawerRecord.course && drawerRecord.course.courseId}</Descriptions.Item>
            <Descriptions.Item label="课程名">{drawerRecord.course && drawerRecord.course.courseName}</Descriptions.Item>
            <Descriptions.Item label="所属科目">{drawerRecord.course && drawerRecord.course.subject}</Descriptions.Item>
            <Descriptions.Item label="开课时间">{
                  drawerRecord.course 
                  && (moment(parseInt(drawerRecord.course.startDate)).format("YYYY-MM-DD") + ' ~ ' + 
                    moment(parseInt(drawerRecord.course.endDate)).format("YYYY-MM-DD")
                  )}
            </Descriptions.Item>
            <Descriptions.Item label="审批状态">{drawerRecord.course && ApprovalState[drawerRecord.course.approvalState]}</Descriptions.Item>
            <Descriptions.Item label="开课状态">{drawerRecord.course && OpenState[drawerRecord.course.openState]}</Descriptions.Item>
            <Descriptions.Item label="专家姓名">{drawerRecord.course && drawerRecord.course.users && drawerRecord.course.users["0"].realname}</Descriptions.Item>
            <Descriptions.Item label="专家用户名">{drawerRecord.course && drawerRecord.course.users && drawerRecord.course.users["0"].username}</Descriptions.Item>
            <Descriptions.Item label="专家邮箱">{drawerRecord.course && drawerRecord.course.users && drawerRecord.course.users["0"].email}</Descriptions.Item>
          </Descriptions>
        </Card>
       
      </Drawer>
    </div>
  )
})

export default connect((user) => ({
  currentUser: user.user.currentUser
}))(SubjectList);
