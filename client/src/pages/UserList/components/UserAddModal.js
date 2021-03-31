import React,{ useState, useEffect } from 'react'

import { Form, Input, message, Modal, Select } from 'antd'
import T from 'prop-types'
import { addUser, editUser } from '../api'

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
  const [initValue, setInitValue] = useState(null)
  const [form] = Form.useForm();
  const initModal = () => {
    hiddenModal()
  }
  const handleOk = () => {
    form.validateFields().then(params => {
      const newParams = {
        ...params,
        identity: params.identity.toString(),
        stuNum: '123456'
      }
      if (addOrEdit === 'add') {
        addUser(newParams).then(res => {
          console.log('res', res);
          if (res.status === 201 && res.data.code === 0) {
            message.success(res.data.message)
            initModal()
          } else {
            message.error(res.data.message)
          }
        })
      } else {
        editUser(record.id, newParams).then(res => {
          if (res.status === 201 && res.data.code === 0) {
            message.success(res.data.message)
            initModal()
            getList()
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
   setInitValue(record)
  }, [props])
  return (
    <Modal title={addOrEditState[addOrEdit]} visible={visable} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
     <Form {...layout} form={form} initialValues={initValue} preserve={false} >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        >
         <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item
          label="姓名"
          name="realname"
          rules={[
            {
              required: true,
              message: '请输入姓名!',
            },
          ]}
        >
         <Input placeholder="请输入姓名" />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
          ]}
        >
          <Input.Password placeholder="请输入密码" disabled={addOrEdit === 'edit'} />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            {
              required: true,
              message: '请输入邮箱!',
            },
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>

        <Form.Item
          label="身份"
          name="identity"
          rules={[
            {
              required: true,
              message: '请选择身份!',
            },
          ]}
        >
           <Select mode="multiple" allowClear >
            <Option value="stu">参训者</Option>
            <Option value="tea">专家</Option>
            <Option value="admin">管理员</Option>
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
  record: {},
}
export default UserAddModal
