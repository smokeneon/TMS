import React, { useState, useEffect } from 'react'
import { Card, Statistic, Divider, Descriptions, Spin } from 'antd'
import { PageContainer } from '@ant-design/pro-layout';
import { getCourseDetails } from './api'
import { OpenState, ApprovalState} from '../../../common/const'
import { Map, Marker } from 'react-amap';
import axios from 'axios';
import moment from 'moment'
const Index = (props) => {
  const [record, setRecord] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [newAddress, setNewAddress] = useState('')
  useEffect(() => {
    setIsLoading(true)
   // 获取该课程的详情
   let newRecord
   getCourseDetails(props.location.query.courseId).then(res => {
     if(res.data.code === 0) {
      axios.get(`https://restapi.amap.com/v3/geocode/regeo?output=json&location=${res.data.data.address}&key=c37598c7e2b37eea85e2c5b7a7b7b30c&radius=1000&extensions=all`)
      .then(res => {
        setNewAddress(res.data.regeocode.formatted_address)
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
   })
  }, [])
  return (
    <>
    {
      isLoading ? <Spin />
      : (
        <PageContainer 
        title={record.courseName && record.courseName + ' 详情'} 
        content="该页面展示该课程的详情信息, 你可以通过点击按钮更新课程状态"
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
          <Statistic title="审批状态" value={'未审批'} />
          <Statistic title="开课状态" value={'已开课'} />
          <Statistic title="已申报" value={3} suffix=" 人" />
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
        title="地址信息"
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
      </PageContainer>
      )
    }
   </>
  )
}

export default Index
