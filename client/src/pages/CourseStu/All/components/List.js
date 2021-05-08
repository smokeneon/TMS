import React, { useState, useEffect, forwardRef } from 'react'
import { Table, Space, Typography, Button, Drawer, Tag, Form, Input} from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { OpenState, ApprovalState } from '../../../../common/const'
import DrawerContent from './DrawerContent'
import { getUserList, } from '../api'

const formItemLayout = {
  labelCol: { span: 1 },
  wrapperCol: { span: 23 },
}



const SubjectList = forwardRef((props, ref) => {
  const [tableData, setTableData] = useState([])
  const [pagination, setPagination] = useState({})
  const [tableLoading, setTableLoading] = useState(true)
  const [searchLoading, setSearchLoading] = useState(false)
  const [drawRecord, setDrawRecord] = useState({})
  const requestParams = { page: 1, size: 10, search: null }
  const [drawerVisable, setDrawerVisable] = useState(false);
 
  const [form] = Form.useForm()
 
  const getList = params => {
    setTableLoading(true)
    getUserList(params).then(res => {
      if (res.status === 200) {
        const { page, size, data, total } = res.data
        setTableData(data)
        setPagination({page, size, total})
        setTableLoading(false)
      }
    })
  }


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
  const showDrawer = (record) => ()=> {
    setDrawRecord(record)
    setDrawerVisable(true);
  };
  const closeDrawer = () => {
    setDrawerVisable(false);
  };
  const columns = [
    {
      title: '课程名',
      dataIndex: 'courseName',
      key: 'courseName',
      width: 160,
      render: (text, record) => (
        <Typography.Text style={{ width: 160 }} ellipsis={{ tooltip: text }}>
            <a onClick={showDrawer(record)}>
            {text}
            </a>
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
      title: '操作',
      key: 'action',
      fixed: 'right',
      render: (text, record) => (
        <Space size="middle">
            <a onClick={showDrawer(record)}>详情</a>
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
            <Input placeholder="请输入名称" style={{ width: 200 }} />
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
        title={drawRecord.courseName + ' 详情'}
        placement="bottom"
        closable={false}
        onClose={closeDrawer}
        visible={drawerVisable}
        height="75vh"
      >
        <DrawerContent record={drawRecord} />
      </Drawer>
    </div>
  )
})

export default SubjectList
