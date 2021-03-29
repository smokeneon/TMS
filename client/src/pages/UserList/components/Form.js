import React, { useState, useEffect } from 'react'
import { Form, Input, Select } from 'antd'
import T from 'prop-types'
import { getSubjectSelect } from '../api'

const { Option } = Select

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
  style: { padding: '12px 0 0 0' },
}

const AddOrEditForm = props => {
  const { addOrEdit, ...rest } = props
  const [selectItem, setSelectItem] = useState([])
  // 获取主体框
  const getSelectItem = () => {
    getSubjectSelect().then(res => {
      setSelectItem(res)
    })
  }
  useEffect(() => {
    getSelectItem()
  }, [])
  return (
    <Form {...layout} {...rest}>
      <Form.Item
        label="主体"
        name="appSubjectId"
        rules={[
          {
            required: true,
            message: '请选择主体!',
          },
        ]}
      >
        <Select
          allowClear
          style={{ width: '100%' }}
          placeholder="请选择应用主体"
          disabled={addOrEdit === 'edit'}
        >
          {selectItem.map(item => (
            <Option key={item.id}>{item.name}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="名称"
        name="name"
        rules={[
          {
            required: true,
            message: '请输入名称!',
          },
        ]}
      >
        <Input placeholder="请输入" disabled={addOrEdit === 'edit'} />
      </Form.Item>

      <Form.Item
        label="描述"
        name="description"
        rules={[
          {
            required: true,
            message: '请输入描述!',
          },
        ]}
      >
        <Input.TextArea placeholder="请输入" rows={3} />
      </Form.Item>
    </Form>
  )
}

AddOrEditForm.propTypes = {
  addOrEdit: T.oneOf(['add', 'edit']),
}

AddOrEditForm.defaultProps = {
  addOrEdit: 'add',
}

export default AddOrEditForm
