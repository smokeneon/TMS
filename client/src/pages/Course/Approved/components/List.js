import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Table, Space, Typography, Button, Popconfirm, message, Drawer, Card, Tag, Menu, Dropdown, Form, Input} from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Moment from 'moment'
import AddModal from './AddModal'
import { OpenState, ApprovalState } from '../../../../common/const'
import DrawerContent from './DrawerContent'
import axios from 'axios'
import { deleteItem, getUserList, changeApprovalRequest, changeOpeningRequest } from '../api'
import { Link } from 'umi'
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
      if(res.data.code === 0 ) {
        message.success(res.data.message)
        getList(requestParams)
      } else {
        message.error(res.data.message)
      }
    }).catch(error => {
      message.error('删除失败')
    })
  }
  const openModal = record => async () => {
    let res = await axios.get(`https://restapi.amap.com/v3/geocode/regeo?output=json&location=${record.address}&key=c37598c7e2b37eea85e2c5b7a7b7b30c&radius=1000&extensions=all`)
    setChooseItem({...record, address: res.data.regeocode.formatted_address, coordinate: record.address })
    setModalVisable(true)
  } 
  const hiddenModal = () => {
    setModalVisable(false)
    getList(requestParams)
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
          <a onClick={openModal(record)}>编辑</a>
          <Popconfirm
            title="你确定删除此条吗?"
            onConfirm={deleteConfirm(record.courseId)}
            okText="是"
            cancelText="否"
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]
  const changeOpenState = ({ key }) => {
    changeOpeningRequest(drawRecord.courseId, key).then(res => {
      if (res.data.code === 0) {
        message.success(res.data.message)
        getList(requestParams)
        setDrawerVisable(false); 
      } else {
        message.error(res.data.message)
      }
    }).catch(error => {
      message.error('更新状态失败')
    })
  };
  const changeApprovalState = ({key}) => {
    changeApprovalRequest(drawRecord.courseId, key).then(res => {
      if (res.data.code === 0) {
        message.success(res.data.message)
        getList(requestParams)
        setDrawerVisable(false); 
      } else {
        message.error(res.data.message)
      }
    }).catch(error => {
      message.error('更新状态失败')
    })
  }
  const menu1 = (
    <Menu onClick={changeOpenState}>
      <Menu.Item key="0">
        <a>未开课</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a>开放申请</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a>已完结</a>
      </Menu.Item>
    </Menu>
  );

  const menu2 = (
    <Menu onClick={changeApprovalState}>
      <Menu.Item key="0">
        <a>未提交</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a>审批中</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a>审批成功</a>
      </Menu.Item>
      <Menu.Item key="3">
        <a>审批失败</a>
      </Menu.Item>
    </Menu>
  );


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
          total: Number(pagination.total),
          pageSize: Number(pagination.size),
          current: Number(pagination.page),
          onChange: paginationOnChange,
        }}
      />
      <AddModal 
        visable={modalVisable} 
        hiddenModal={hiddenModal} 
        addOrEdit="edit" 
        record={chooseItem}
        getList={getList}
      />
       <Drawer
        title={drawRecord.courseName + ' 详情'}
        placement="bottom"
        closable={false}
        onClose={closeDrawer}
        visible={drawerVisable}
        height="75vh"
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >  
            {
              drawRecord.approvalState === 2 ? (
                <Dropdown overlay={menu1} trigger={['click']}>
                  <Button style={{ marginRight: 8 }}>
                    设置开放状态
                  </Button>
                </Dropdown>
              ) : ''
            }
           
            <Dropdown overlay={menu2} trigger={['click']} >
              <Button type="primary">
                设置申报状态
              </Button>
            </Dropdown>
            
          </div>
        }
      >
        <DrawerContent record={drawRecord} getList={getList} closeDrawer={closeDrawer} />
      </Drawer>
    </div>
  )
})

export default SubjectList
