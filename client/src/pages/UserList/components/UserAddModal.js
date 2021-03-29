import React,{ useState } from 'react'

import { Form, Input, message, Modal, Select } from 'antd'
import T from 'prop-types'
import { addUser } from '../api'

const { Option } = Select;

const addOrEditState = {
  add: '新建',
  eidt: '编辑'
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
  style: { padding: '12px 0 0 0' },
}

const UserAddModal = props => {
  const { addOrEdit, visable, hiddenModal } = props
  const [selectItem, setSelectItem] = useState([])
  const [form] = Form.useForm();
  const handleOk = () => {
    form.validateFields().then(params => {
      console.log(params);
      const newParams = {
        ...params,
        stuNum: '123456'
      }
      addUser(newParams).then(res => {
        if (res.status === 201) {
          message.success('新建用户成功')
          hiddenModal()
          
        } else {
          message.error('新建用户失败')
        }
      })
      // form.submit()
    })
  }
  const handleCancel = () => {
    hiddenModal()
  }
  return (
    <Modal title={addOrEditState[addOrEdit]} visible={visable} onOk={handleOk} onCancel={handleCancel}>
     <Form {...layout} form={form}>
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
}
export default UserAddModal
