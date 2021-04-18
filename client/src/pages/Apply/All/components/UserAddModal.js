import React,{ useState, useEffect } from 'react'

import { Form, Input, message, Modal, Select } from 'antd'
import T from 'prop-types'
import { addApply, editUser, getStuList, getCourseList } from '../api'

const { Option } = Select;

const addOrEditState = {
  add: '新建',
  edit: '编辑'
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
  style: { padding: '12px 0 0 0' },
}

const UserAddModal = props => {
  const { addOrEdit, visable, hiddenModal, record, getList } = props
  const [stuList, setStuList] = useState([])
  const [courseList, setCourseList] = useState([])
  const [form] = Form.useForm();
  const initModal = () => {
    hiddenModal()
    form.resetFields()
  }
  const handleOk = () => {
    form.validateFields().then(params => {
      if (addOrEdit === 'add') {
        addApply(params).then(res => {
          // console.log('res', res);
          if (res.status === 201 && res.data.code === 0) {
            message.success(res.data.message)
            initModal()
          } else {
            message.error(res.data.message)
          }
        })
      } else {
        editUser(record.userId, newParams).then(res => {
          if (res.status === 200 && res.data.code === 0) {
            message.success(res.data.message)
            initModal()
          } else {
            message.error(res.data.message)
          }
      })
    }
  })
  }   
  const handleCancel = () => {
    initModal()
  }
  useEffect(() => {
    if (record !== undefined) {
      form.setFieldsValue({...record})
    }
  }, [record])
  useEffect(() => {
    getCourseList().then(res => {
      if(res.data.code === 0) {
        setCourseList(res.data.data)
      }
    })
    getStuList().then(res => {
      if (res.data.code === 0) {
        setStuList(res.data.data)
      }else{
        message.error('参训者列表获取失败')
      }
    })
  }, [])

  return (
    <Modal
      title={addOrEditState[addOrEdit]}
      visible={visable}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
    >
    <Form {...layout} form={form}>
      <Form.Item
        label="申报编号"
        name="applyNumber"
        rules={[
          {
            required: true,
            message: '请输入申报编号!',
          },
        ]}
      >
        <Input placeholder="请输入申报编号" />
      </Form.Item>

      <Form.Item
        label="申报课程"
        name="courseId"
        rules={[
          {
            required: true,
            message: '请输入申报课程!',
          },
        ]}
      >
         <Select allowClear placeholder="请选择申报课程">
            {
              courseList.map(item => (
                <Option value={item.courseId}>{item.courseName + ' (' + item.courseId + ')'}</Option>
              ))
            }
        </Select>
      </Form.Item>
      

      <Form.Item
        label="参训者"
        name="stuIds"
        rules={[
          {
            required: true,
            message: '请选择参训者!',
          },
        ]}
      >
          <Select mode="multiple" allowClear placeholder="请选择参训者">
            {
              stuList.map(item => (
                <Option value={item.userId}>{item.realname + ' (' + item.username + ')'}</Option>
              ))
            }
        </Select>
      </Form.Item>
    </Form>
  </Modal>
  )
}

UserAddModal.propTypes = {
  addOrEdit: T.oneOf(['add', 'edit']),
}

UserAddModal.defaultProps = {
  addOrEdit: 'add',
}
export default UserAddModal
