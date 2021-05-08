import React, { useRef } from 'react'
import { Card, } from 'antd'
import { PageContainer } from '@ant-design/pro-layout';
import UserList from './components/UserList'

const Index = () => {
  const getListRef = useRef(null)
  return (
    <PageContainer>
      <Card
        title="查询表格"
      >
        <UserList ref={getListRef} />
      </Card>
    </PageContainer>
  )
}

export default Index
