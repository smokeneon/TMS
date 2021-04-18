import React from 'react'
import { Descriptions, Table } from 'antd';
import { OpenState, ApprovalState } from '../../../../common/const'
const DrawerContent = props => {
  const { record }  = props
  const columns = [
    {
      title: 'applyId',
      dataIndex: 'applyId',
      key: 'applyId',
    },
    {
      title: 'applyNumber',
      dataIndex: 'applyNumber',
      key: 'applyNumber',
    },
    {
      title: 'score',
      dataIndex: 'score',
      key: 'score',
    },
  ];
  return (
    <div>
      <Descriptions>
        <Descriptions.Item label="课程名">{record.courseName}</Descriptions.Item>
        <Descriptions.Item label="所属科目">{record.subject}</Descriptions.Item>
        <Descriptions.Item label="开课专家">{record.users[0] && record.users[0].realname + ' (' + record.users[0].username + ')'}</Descriptions.Item>
        <Descriptions.Item label="开课状态">{OpenState[record.openState]}</Descriptions.Item>
        <Descriptions.Item label="审批状态">{ApprovalState[record.approvalState]}</Descriptions.Item>
        <Descriptions.Item label="课程背景">{record.coureseBackground}</Descriptions.Item>
        <Descriptions.Item label="课程目标">{record.courseTarget}</Descriptions.Item>
        <Descriptions.Item label="课程架构">{record.courseFramework}</Descriptions.Item>
      </Descriptions>
      <Table dataSource={record.applys} columns={columns} />
    </div>
  )
}

DrawerContent.defaultProps = {
  record: {},
}
export default DrawerContent
