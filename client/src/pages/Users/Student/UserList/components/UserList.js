import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Table, Space, Typography, Form, Input, Button, Popconfirm, message } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Moment from 'moment'

import { getAppSubjectList, deleteSubjectItem } from '../api'

const formItemLayout = {
  labelCol: { span: 1 },
  wrapperCol: { span: 23 },
}

const SubjectList = forwardRef((props, ref) => {
  const [tableData, setTableData] = useState([])
  const [pagination, setPagination] = useState({})
  const [tableLoading, setTableLoading] = useState(true)
  const [searchLoading, setSearchLoading] = useState(false)
  const requestParams = { page: 1, size: 10, search: null }
  const [form] = Form.useForm()

  const getList = params => {
    setTableLoading(true)

    setTableData([])
    setPagination({})
    setTableLoading(false)
    // getAppSubjectList(params).then(res => {
    //   const { data, ...rest } = res || {}
    //   setTableData(data || [])
    //   setPagination(rest || {})
    //   setTableLoading(false)
    // })
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
      form.resetFields()
      setSearchLoading(false)
    } catch (error) {
      setSearchLoading(false)
    }
  }
  const deleteConfirm = subjectId => () => {
    deleteSubjectItem(subjectId).then(res => {
      message.success(res)
      getList(requestParams)
    })
  }

  const columns = [
    {
      title: '应用主体名称',
      dataIndex: 'name',
      key: 'name',
      width: 160,
      render: (text) => (
        <Typography.Text style={{ width: 160 }} ellipsis={{ tooltip: text }}>
          {text}
        </Typography.Text>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 160,
      render: (text) => (
        <Typography.Text style={{ width: 160 }} ellipsis={{ tooltip: text }}>
          {text}
        </Typography.Text>
      ),
    },
    {
      title: '负责人',
      dataIndex: 'owner',
      key: 'owner',
      width: 160,
      render: (text, record) => (
        <Typography.Text style={{ width: 160 }} ellipsis={{ tooltip: text }}>
          {record.owner}
        </Typography.Text>
      ),
    },
    {
      title: '操作人',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '操作时间',
      dataIndex: 'updatedTime',
      key: 'updatedTime',
      width: 200,
      render: time => Moment(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>编辑</a>
          <Popconfirm
            title="你确定删除此条吗?"
            onConfirm={deleteConfirm(record.id)}
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
          total: pagination.totalCount,
          pageSize: pagination.pageSize,
          current: pagination.currentPage,
          onChange: paginationOnChange,
        }}
      />
    </div>
  )
})

export default SubjectList
