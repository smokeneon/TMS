import React, { useState, useEffect } from 'react'
import { Card, Statistic, Button, Descriptions, Spin, Modal, Form, Table, Input, Space, message, Badge , Menu, Dropdown, Upload } from 'antd'
import { PageContainer } from '@ant-design/pro-layout';
import { getCourseDetails } from './api'
import { OpenState, ApprovalState} from '../../../common/const'
import { Map, Marker } from 'react-amap';
import axios from 'axios';
import moment from 'moment'
import { connect } from 'umi';
import { changeScoreRequest, changeApprovalRequest, changeOpeningRequest, getFilesList, downloadFile } from './api'
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
  style: { padding: '12px 0 0 0' },
}
const Index = (props) => {
  const { currentUser } = props;
  const [record, setRecord] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [newAddress, setNewAddress] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false)
  const [applysItem, setApplysItem] = useState({})
  const [filesList, setFilesList] = useState([])
  const [form] = Form.useForm()

  const filesColumns = [
    {
      title: '文件id',
      dataIndex: 'fileId',
      key: 'fileId',
    },
    {
      title: '文件名',
      dataIndex: 'path',
      key: 'path',
      render: (text,record) => {
        let title = text.split('/')
        return title["3"]
      }
    },
    {
      title: '上传时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text,record) => {
        return moment(text).format('YYYY-MM-DD')
      }
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (text,record) => {
        return moment(text).format('YYYY-MM-DD')
      }
    },
  ]
  const showModal = (record) => () => {
    setApplysItem(record)
    setIsModalVisible(true);
  };
  const handleOk = () => {
    form.validateFields().then(params => {
      changeScoreRequest(applysItem, params.score)
      .then(res => {
        if(res.data.code === 0) {
          message.success(res.data.message)
          setIsModalVisible(false)
          getCourseById()
        }else{
          message.error(res.data.message)
        }
      }).catch(error => {
        message.error('修改分数失败')
      })
    })
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // 申报信息
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
      title: '申报者',
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
      render: (text, scoreRecord) => {
        console.log('text,scoreRecord', text, scoreRecord);
        if (scoreRecord.course &&  scoreRecord.course.openState === 2 && scoreRecord.course.approvalState === 2) {
          if (text === -1) {
            return '分数未录入'
          } else {
            return text
          }
        } else {
          return '课程未完结'
        }
      },
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      render: (text, record) => {
        if (record.course.openState === 2) {
          return (
            <Space size="middle">
               <a style={{ marginRight: 8 }}  onClick={showModal(record)}>
                  设置分数
                </a>
            </Space>
          )
        }
      }
    },
  ];

  // 初始化页面
  const getCourseById = () => {
    setIsLoading(true)
    // 获取该课程的详情
    let newRecord
    getCourseDetails(props.location.query.courseId).then(res => {
    if(res.data.code === 0) {
      axios.get(`https://restapi.amap.com/v3/geocode/regeo?output=json&location=${res.data.data.address}&key=c37598c7e2b37eea85e2c5b7a7b7b30c&radius=1000&extensions=all`)
       .then(res => {
         setNewAddress(res.data.regeocode.formatted_address)
       }).catch(error => {
         message.error('地址获取失败')
       })
 
       newRecord = {
         ...res.data.data,
         // 经度
         longitude: res.data.data.address.split(",")["0"],
         // // 纬度
         latitude: res.data.data.address.split(',')["1"],
       }
       setRecord(newRecord)
       setIsLoading(false)
      }
    }).catch(error => {
      message.error('课程详情获取失败')
    })
    // 获取文件列表
    getFilesList(props.location.query.courseId).then(res => {
        if(res.data.code === 0) {
          setFilesList(res.data.data)
        }else{
          message.error('文件列表获取失败')
        }
    }).catch(error => {
      message.error('文件列表获取失败')
    })
  }
  const changeOpenState = ({ key }) => {
    changeOpeningRequest(record.courseId, key).then(res => {
      if (res.data.code === 0) {
        message.success(res.data.message)
        getCourseById()
      } else {
        message.error(res.data.message)
      }
    }).catch(error => {
      message.error('更新状态失败')
    })
  };
  const changeApprovalState = ({key}) => {
    changeApprovalRequest(record.courseId, key).then(res => {
      if (res.data.code === 0) {
        message.success(res.data.message)
        getCourseById()
      } else {
        message.error(res.data.message)
      }
    }).catch(error => {
      message.error('更新状态失败')
    })
  }
  const menu1 = (
    <Menu onClick={changeOpenState}>
      <Menu.Item key="0">
        <a>未开课</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a>开放申请</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a>已完结</a>
      </Menu.Item>
    </Menu>
  );

  const menu2 = (
    <Menu onClick={changeApprovalState}>
      <Menu.Item key="0">
        <a>未提交</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a>审批中</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a>审批成功</a>
      </Menu.Item>
      <Menu.Item key="3">
        <a>审批失败</a>
      </Menu.Item>
    </Menu>
  );

  const uploadProps = {
    name: 'file',
    multiple: true,
    action: '/api/files',
    data: {
      userId: currentUser.userId,
      courseId: props.location.query.courseId,
    },
    // beforeUpload() {
    //   if(fileTitle === '') {
    //     message.warning('请输入用户名')
    //     return false
    //   }
    //   return true
    // },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} 文件上传成功`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 文件上传失败`);
      }
    },
  };

  const uploadModalOk = () => {
    setIsUploadModalVisible(false)
    getCourseById()
  }

  const uploadModalCancel = () => {
    setIsUploadModalVisible(false)
  }
  const uploadBtn = () => {
    setIsUploadModalVisible(true)
  }
  const downloadAll = () => {
    downloadFile(props.location.query.courseId)
  }
  useEffect(() => {
    getCourseById()
  }, [])
  return (
    <>
    {
      isLoading ? <Spin />
      : (
      <PageContainer 
        title={record.courseName && record.courseName + ' 详情'} 
        content="该页面展示该课程的详情信息"
        extraContent={
        <Space>
         
          {
            currentUser.identity === 'tea' ? (
              <>
                <Button
                  style={{ marginRight: 8 }}
                  onClick={() => changeApprovalState({key: "1"})}
                  disabled={record.approvalState != 0}
                >
                  提交审批
                </Button>
                <Dropdown overlay={menu1} trigger={['click']} disabled={record.approvalState != 2}>
                  <Button type="primary">
                    更新开课状态
                  </Button>
                </Dropdown>
              </>
            ) : ''
          }
          {
            currentUser.identity === 'admin' ? (
            <>
              <Dropdown overlay={menu1} trigger={['click']} disabled={record.approvalState != 2}>
                <Button style={{ marginRight: 8 }}>
                  更新开课状态
                </Button>
              </Dropdown>
                <Dropdown overlay={menu2} trigger={['click']} >
                  <Button type="primary">
                    更新申报状态
                  </Button>
              </Dropdown>
            </>
            ) : ''
          } 
        </Space>}
        
      >
        <Card
          style={{margin: '0 0 12px 0'}}
        >
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '12px'
        }}>
          <Statistic title="审批状态" value={ApprovalState[record.approvalState]} prefix={
            record.approvalState === 3 ? <Badge status="error" /> : (
              record.approvalState === 2 ? <Badge status="success" /> : (
                record.approvalState === 1 ? <Badge status="processing" /> : (
                  record.approvalState === 0 ? <Badge status="default" /> : ''
                )
              )
            )
          } />
          <Statistic title="开课状态" value={record.approvalState === 2 ? OpenState[record.openState] : '不允许'} prefix={
            record.approvalState === 2 ? (
              record.openState === 2 ? <Badge status="error" /> : (
                record.openState === 1 ? <Badge status="success" /> : (
                  record.openState === 0 ? <Badge status="warning" /> : ''
                )
              )
            ) : <Badge status="default" />
          }
          />
          <Statistic title="已申报" value={record.applys.length} suffix=" 人" />
        </div>
        </Card>
        <Card
          title="课程信息"
          style={{margin: '0 0 12px 0'}}
        >
          <div>
            <Descriptions style={{padding: '12px 0 0 0'}}>
              <Descriptions.Item label="课程名">{record.courseName}</Descriptions.Item>
              <Descriptions.Item label="所属科目">{record.subject}</Descriptions.Item>
              <Descriptions.Item label="开课专家">{record.users && record.users[0].realname}</Descriptions.Item>
              <Descriptions.Item label="开课时间">{moment(Number(record.startDate)).format("YYYY-MM-DD") + '~' + moment(Number(record.endDate)).format("YYYY-MM-DD")}</Descriptions.Item>
              <Descriptions.Item label="地址" span={2}>{newAddress}</Descriptions.Item>
              <Descriptions.Item label="课程背景">{record.coureseBackground}</Descriptions.Item>
              <Descriptions.Item label="课程目标">{record.courseTarget}</Descriptions.Item>
              <Descriptions.Item label="课程架构">{record.courseFramework}</Descriptions.Item>
              
            </Descriptions>
          </div>
        </Card>
        <Card
          title="课程文件"
          style={{margin: '0 0 12px 0'}}
          extra={
            <Space>
               <Button onClick={downloadAll}>下载全部</Button>
              {
                currentUser.identity === 'tea' || currentUser.identity === 'admin' && (
                  <Button type="primary" onClick={uploadBtn}>上传文件</Button>
                )
              }
            </Space>
          }
        >
          <div style={{
            padding: '12px',
          }}>
            <Table dataSource={filesList} columns={filesColumns}/>
          </div>
        </Card>
        <Card
          title="地址信息"
          style={{margin: '0 0 12px 0'}}
        >
          <div style={{
            width: '100%',
            height: '300px'
          }}>
            <Map 
              plugins={['ToolBar']}
              center={{longitude:  record.longitude && record.longitude, latitude: record.latitude && record.latitude }}
              zoom={14}
            >
              <Marker position={{longitude: record.longitude && record.longitude, latitude: record.latitude && record.latitude}} />
            </Map>
          </div>
        </Card>
        {
          (currentUser.identity === 'admin' || currentUser.identity === 'tea') && (
            <Card
                title="申报信息"
                style={{margin: '0 0 12px 0'}}
            >
                <Table dataSource={record.applys} columns={columns} />
            </Card>
          )
        }
       
        <Modal 
        title="设置课程分数" 
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel} 
        destroyOnClose
        >
        <Form {...layout} form={form}>
          <Form.Item
            label="课程分数"
            name="score"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (typeof value === 'undefined' || value.trim() === '')
                    return Promise.reject(new Error('字符不能为空'))
                  if (value < 0 || value > 100) 
                    return Promise.reject(new Error('分数应介于0-100之间'))
                  return Promise.resolve('值可用')
                  }
              }),
            ]}
          >
            <Input placeholder="请输入课程分数" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="上传文件" visible={isUploadModalVisible} onOk={uploadModalOk} onCancel={uploadModalCancel}>
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">拖动或点击该区域上传文件</p>
        </Dragger>
      </Modal>
      </PageContainer>
      )
    }
   </>
  )
}

export default connect((user) => ({
  currentUser: user.user.currentUser
}))(Index);

