import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Table, Space, Typography, Form, Input, Button, Popconfirm, message, Tag } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Moment from 'moment'
import UserAddModal from './UserAddModal'

import { deleteItem, getUserList } from '../api'
import { identityState } from '../../../../common/const'

const formItemLayout = {
  labelCol: { span: 1 },
  wrapperCol: { span: 23 },
}

const SubjectList = forwardRef((props, ref) => {
  const [modalVisable, setModalVisable] = useState(false)
  const [tableData, setTableData] = useState([])
  const [pagination, setPagination] = useState({})
  const [tableLoading, setTableLoading] = useState(true)
  const [searchLoading, setSearchLoading] = useState(false)
  const [chooseItem, setChooseItem] = useState({})
  const requestParams = { page: 1, size: 10, search: null }
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
  const deleteConfirm = id => () => {
    deleteItem(id).then(res => {
      message.success(res.data.message)
      getList(requestParams)
    })
  }
  const openModal = record => () => {
    setChooseItem({...record})
    setModalVisable(true)
  } 
  const hiddenModal = () => {
    setModalVisable(false)
    getList(requestParams)
  }
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: 160,
      render: (text) => (
        <Typography.Text style={{ width: 160 }} ellipsis={{ tooltip: text }}>
          {text}
        </Typography.Text>
      ),
    },
    // {
    //   title: '密码',
    //   dataIndex: 'password',
    //   key: 'password',
    //   width: 160,
    //   render: (text) => (
    //     <Typography.Text style={{ width: 160 }} ellipsis={{ tooltip: text }}>
    //       {text}
    //     </Typography.Text>
    //   ),
    // },
    {
      title: '学号',
      dataIndex: 'stuNum',
      key: 'owner',
      width: 160,
      render: (text, record) => (
        <Typography.Text style={{ width: 160 }} ellipsis={{ tooltip: text }}>
          {text}
        </Typography.Text>
      ),
    },
    {
      title: '身份',
      dataIndex: 'identity',
      key: 'identity',
      render: (text) => (
        <Tag>{identityState[text]}</Tag>
      )
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    // {
    //   title: '操作时间',
    //   dataIndex: 'updatedTime',
    //   key: 'updatedTime',
    //   width: 200,
    //   render: time => Moment(time).format('YYYY-MM-DD HH:mm:ss'),
    // },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={openModal(record)}>编辑</a>
          <Popconfirm
            title="你确定删除此条吗?"
            onConfirm={deleteConfirm(record.userId)}
            okText="是"
            cancelText="否"
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  useEffect(() => {
    getList(requestParams)
  }, [])
  useEffect(() => {
    console.log('pagination',pagination);
  }, [pagination])
  return (
    <div>
      <div style={{padding: '0px 0 24px 0'}}>
        <Form onFinish={onSearch} form={form} layout="inline">
          <Form.Item name="searchText" {...formItemLayout}>
            <Input placeholder="请输入名称" style={{ width: 200 }} />
          </Form.Item>
          <Button icon={<SearchOutlined />} loading={searchLoading} htmlType="submit">
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
          total: pagination.total,
          pageSize: pagination.size,
          current: pagination.page,
          onChange: paginationOnChange,
        }}
      />
      <UserAddModal 
        visable={modalVisable} 
        hiddenModal={hiddenModal} 
        addOrEdit="edit" 
        record={chooseItem}
        getList={getList}
      />
    </div>
  )
})

export default SubjectList
