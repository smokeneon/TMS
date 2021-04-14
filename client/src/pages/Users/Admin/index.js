import React, { useState, useRef } from 'react'
import { Card, Button, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout';
import UserList from './components/UserList'
import UserAddModal from './components/UserAddModal'

const Index = () => {
  const [modalVisable, setModalVisable] = useState(false)
  const getListRef = useRef(null)
  const hiddenModal = () => {
    setModalVisable(false)
  }
  return (
    <PageContainer>
      <Card
        title="查询表格"
        extra={
          <Button type="primary" onClick={() => setModalVisable(true)}><PlusOutlined />新增</Button>
        }
      >
        <UserList ref={getListRef} />
      </Card>
      <UserAddModal visable={modalVisable} hiddenModal={hiddenModal} addOrEdit="add" />
    </PageContainer>
  )
}

export default Index
