import React from 'react'
import { Card } from 'antd'
import { PageContainer } from '@ant-design/pro-layout';
import AddForm from './components/AddForm'
const Index = (props) => {
  return (
    <PageContainer>
      <Card
        title="课程提交表单"
      >
       <AddForm {...props} />
      </Card>
    </PageContainer>
  )
}

export default Index
