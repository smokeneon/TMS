import React from 'react'
import { Card, } from 'antd'
import { PageContainer } from '@ant-design/pro-layout';
import CourseList from './components/List'

const Index = () => {
  return (
    <PageContainer>
      <Card
        title="查询表格"
      >
        <CourseList />
      </Card>
    </PageContainer>
  )
}

export default Index
