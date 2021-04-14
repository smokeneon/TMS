import React, { useState, useEffect } from 'react'

import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import T from 'prop-types'

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
  style: { padding: '12px 0 0 0' },
}
const addOrEditState = {
  add: '新增',
  edit: '编辑',
}

const subjectAddModal = props => {
  const { addOrEdit, ...rest } = props
  const [isDisabled, setIsDisabled] = useState(false)


  useEffect(() => {
    if (addOrEdit === 'edit') setIsDisabled(true)
  }, [])

  return (
    <Button type="primary"><PlusOutlined />新增</Button>
  )
}

subjectAddModal.propTypes = {
  addOrEdit: T.oneOf(['add', 'edit']),
}

subjectAddModal.defaultProps = {
  addOrEdit: 'add',
}
export default subjectAddModal
