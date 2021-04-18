import React,{ useState, useEffect } from 'react'

import { Form, Input, message, Modal, Select } from 'antd'
import T from 'prop-types'
import { addCourse, editUser, getTeaList } from '../api'

const { Option } = Select;
const { TextArea } = Input;

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
  const [teaList, setTeaList] = useState([])
  const [form] = Form.useForm();
  const initModal = () => {
    hiddenModal()
  }
  const handleOk = () => {
    form.validateFields().then(params => {
      console.log('params', params);
      if (addOrEdit === 'add') {
        addCourse(params).then(res => {
          if(res.data.code === 0){
            message.success('课程添加成功')
            initModal()
          }else{
            message.warning('课程添加失败')
          }
        }).catch(err => {
          message.error('课程添加失败')
        })
      }
      // if (addOrEdit === 'add') {
      //   addCourse(params).then(res => {
      //     // if (res.status === 201 && res.data.code === 0) {
      //     //   message.success(res.data.message)
      //     //   initModal()
      //     } else {
      //       message.error(res.data.message)
      //     }
      //   })
      // } 
    //   else {
    //     editUser(record.courseId, newParams).then(res => {
    //       if (res.status === 200 && res.data.code === 0) {
    //         message.success(res.data.message)
    //         initModal()
    //       } else {
    //         message.error(res.data.message)
    //       }
    //   })
    // }
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
    getTeaList().then(res => {
      if (res.data.code === 0) {
        setTeaList(res.data.data)
      }else{
        message.error('专家列表获取失败')
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
        label="课程名"
        name="courseName"
        rules={[
          {
            required: true,
            message: '请输入课程名!',
          },
        ]}
      >
        <Input placeholder="请输入课程名" />
      </Form.Item>

      <Form.Item
        label="所属学科"
        name="subject"
        rules={[
          {
            required: true,
            message: '请输入所属学科!',
          },
        ]}
      >
        <Input placeholder="请输入所属学科" />
      </Form.Item>

      <Form.Item
        label="课程背景"
        name="coureseBackground"
        rules={[
          {
            required: true,
            message: '请输入课程背景!',
          },
        ]}
      >
        <TextArea showCount maxLength={100} placeholder="请输入课程背景" />
      </Form.Item>

      <Form.Item
        label="课程目标"
        name="courseTarget"
        rules={[
          {
            required: true,
            message: '请输入课程目标!',
          },
        ]}
      >
        <TextArea showCount maxLength={100} placeholder="请输入课程目标" />
      </Form.Item>

      <Form.Item
        label="课程框架"
        name="courseFramework"
        rules={[
          {
            required: true,
            message: '请输入课程框架!',
          },
        ]}
      >
        <TextArea showCount maxLength={100} placeholder="请输入课程框架" />
      </Form.Item>

      <Form.Item
        label="开课专家"
        name="teaId"
        rules={[
          {
            required: true,
            message: '请选择开课专家!',
          },
        ]}
      >
          <Select allowClear placeholder="请选择开课专家">
            {
              teaList.map(item => (
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
