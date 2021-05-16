import React from 'react'
import { Descriptions, Table, Typography, Space, } from 'antd';
import { OpenState, ApprovalState } from '../../../../common/const'

const { Title} = Typography;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
  style: { padding: '12px 0 0 0' },
}
const DrawerContent = props => {
  const { record }  = props

  const columns = [
    {
      title: 'applyNumber',
      dataIndex: 'applyNumber',
      key: 'applyNumber',
    },
    {
      title: '课程名',
      dataIndex: 'courseName',
      key: 'courseName',
      render: (text, record) => {
        return record.course.courseName
      },
    },
    {
      title: '参训人',
      dataIndex: 'stuName',
      key: 'stuName',
      render: (text, record) => {
        return record.stu[0].realname + '(' + record.stu[0].username + ')'
      },
    },
    {
      title: '分数',
      dataIndex: 'score',
      key: 'score',
      render: (text, record) => {
        if (text === -1) {
          return '课程未完成'
        } else {
          return text
        }
      },
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
      {/* 参训者不显示 */}
      {/* <div style={{
        padding: '24px 0 0 0'
      }}>
        <Title level={5}>该课程申报信息</Title>
        <Table dataSource={record.applys} columns={columns} pagination={false} />
      </div> */}
    </div>
  )
}

DrawerContent.defaultProps = {
  record: {},
}
export default DrawerContent
