import React, {useState, useEffect} from 'react'
import { Descriptions, Table, Typography, Space, Modal, Form, Input, message } from 'antd';
import { OpenState, ApprovalState } from '../../../../common/const'
import { changeScoreRequest } from '../api'

const { Title} = Typography;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
  style: { padding: '12px 0 0 0' },
}
const DrawerContent = props => {
  const { record, getList, closeDrawer }  = props
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [drawerApply, setDrawerApply] = useState({})
  const [form] = Form.useForm()

  

  const columns = [
    {
      title: 'applyNumber',
      dataIndex: 'applyNumber',
      key: 'applyNumber',
    },
    {
      title: '课程名',
      dataIndex: 'courseName',
      key: 'courseName',
      render: (text, record) => {
        return record.course.courseName
      },
    },
    {
      title: '参训人',
      dataIndex: 'stuName',
      key: 'stuName',
      render: (text, record) => {
        return record.stu[0].realname + '(' + record.stu[0].username + ')'
      },
    },
    {
      title: '分数',
      dataIndex: 'score',
      key: 'score',
      render: (text, record) => {
        if (text === -1) {
          return '课程未完成'
        } else {
          return text
        }
      },
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      render: (text, record) => {
        if (record.course.openState === 2) {
          return (
            <Space size="middle">
               <a style={{ marginRight: 8 }}  onClick={showModal(record)}>
                  设置分数
                </a>
            </Space>
          )
        }
      }
    },
  ];
  
  const showModal = record => () => {
    setDrawerApply(record)
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(params => {
      changeScoreRequest(drawerApply, params.score)
      .then(res => {
        console.log('res', res);
        if(res.data.code === 0) {
          message.success(res.data.message)
          getList({ page: 1, size: 10, search: null })
          setIsModalVisible(false)
          closeDrawer()
        }else{
          message.error(res.data.message)
        }
      }).catch(error => {
        message.error('修改分数失败')
      })
    })
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Descriptions>
        <Descriptions.Item label="课程名">{record.courseName}</Descriptions.Item>
        <Descriptions.Item label="所属科目">{record.subject}</Descriptions.Item>
        <Descriptions.Item label="开课专家">{record.users[0] && record.users[0].realname + ' (' + record.users[0].username + ')'}</Descriptions.Item>
        <Descriptions.Item label="开课状态">{OpenState[record.openState]}</Descriptions.Item>
        <Descriptions.Item label="审批状态">{ApprovalState[record.approvalState]}</Descriptions.Item>
        <Descriptions.Item label="课程背景">{record.coureseBackground}</Descriptions.Item>
        <Descriptions.Item label="课程目标">{record.courseTarget}</Descriptions.Item>
        <Descriptions.Item label="课程架构">{record.courseFramework}</Descriptions.Item>
      </Descriptions>
      <div style={{
        padding: '24px 0 0 0'
      }}>
        <Title level={5}>该课程申报信息</Title>
        <Table dataSource={record.applys} columns={columns} pagination={false} />
      </div>

      <Modal 
        title="设置课程分数" 
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel} 
        destroyOnClose
        >
        <Form {...layout} form={form}>
          <Form.Item
            label="课程分数"
            name="score"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (typeof value === 'undefined' || value.trim() === '')
                    return Promise.reject(new Error('字符不能为空'))
                  if (value < 0 || value > 100) 
                    return Promise.reject(new Error('分数应介于0-100之间'))
                  return Promise.resolve('值可用')
                  }
              }),
            ]}
          >
            <Input placeholder="请输入课程分数" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

DrawerContent.defaultProps = {
  record: {},
}
export default DrawerContent
