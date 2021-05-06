import React, { useState, useRef } from 'react'
import { Card, Button, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout';
import CourseList from './components/List'
import CourseAddModal from './components/AddModal'

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
        <CourseList ref={getListRef} />
      </Card>
      <CourseAddModal visable={modalVisable} hiddenModal={hiddenModal} addOrEdit="add" />
    </PageContainer>
  )
}

export default Index
