import React from 'react'
import { Descriptions } from 'antd';
import { OpenState, ApprovalState } from '../../../common/const'
const DrawerContent = props => {
  const { record }  = props
  return (
    <div>
      <Descriptions>
        <Descriptions.Item label="课程名">{record.courseName}</Descriptions.Item>
        <Descriptions.Item label="所属科目">{record.subject}</Descriptions.Item>
        <Descriptions.Item label="开课专家">{record.teacher}</Descriptions.Item>
        <Descriptions.Item label="开课状态">{OpenState[record.openState]}</Descriptions.Item>
        <Descriptions.Item label="申请状态">{ApprovalState[record.applyState]}</Descriptions.Item>
        <Descriptions.Item label="课程背景">{record.coureseBackground}</Descriptions.Item>
        <Descriptions.Item label="课程目标">{record.courseTarget}</Descriptions.Item>
        <Descriptions.Item label="课程架构">{record.courseFramework}</Descriptions.Item>
      
      </Descriptions>
    </div>
  )
}

DrawerContent.defaultProps = {
  record: {},
}
export default DrawerContent
