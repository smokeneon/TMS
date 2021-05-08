import React,{ useState, useEffect } from 'react'

import { Form, Input, message, Modal, Select, DatePicker, Spin } from 'antd'
import T from 'prop-types'
import { addCourse, editUser, getTeaList } from '../api'
import axios from 'axios';
import moment from 'moment'

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const addOrEditState = {
  add: '新建',
  edit: '编辑'
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
  style: { padding: '12px 0 0 0' },
}


let timer = null
const UserAddModal = props => {
  const { addOrEdit, visable, hiddenModal, record, getList } = props
  const [teaList, setTeaList] = useState([])
  const [address, setAddress] = useState([])
  const [mapPicUrl, setMapPicUrl] = useState('')
  const [addressItem, setAddressItem] = useState('')
  const [isShowMap, setisShowMap] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [form] = Form.useForm();
 

  const initModal = () => {
    form.resetFields()
    hiddenModal()
  }
  let newParams
  let  startDate;
  let endDate;
  const handleOk = () => {
    form.validateFields().then(params => {
      setConfirmLoading(true)
      startDate = Number(params.openingTime[0]._d)
      endDate = Number(params.openingTime[1]._d)
      delete params.openingTime
      newParams = {
        ...params,
        startDate,
        endDate,
      }
      if (addOrEdit === 'add') {
        addCourse(newParams).then(res => {
          if(res.data.code === 0){
            message.success('课程添加成功')
            setConfirmLoading(false);
            initModal()
          }else{
            message.warning('课程添加失败')
          }
        }).catch(err => {
          message.error('课程添加失败')
        })
      } else {
        
        let editParams = {
          ...newParams,
          address: record.coordinate,
        }
        // 把穿过来的坐标删除
        delete editParams.coordinate
        delete editParams.teaId
        editUser(record.courseId, editParams).then(res => {
          if(res.data.code === 0){
            message.success('课程修改成功')
            setConfirmLoading(false);
            initModal()
          } else {
            message.warning('课程修改失败')
          }
        }).catch(err => {
          message.error('课程修改失败')
        })
      }
  })
  }   
  const handleCancel = () => {
    initModal()
  }
  
  const handleSearch = (value) => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      axios.get(`https://restapi.amap.com/v3/assistant/inputtips?output=JSON&city=029&citylimit=true&keywords=${value}&key=c37598c7e2b37eea85e2c5b7a7b7b30c`)
      .then(res => {
        setAddress(res.data.tips)
      })
    }, 300)
  }
  const handleChange = (value) => {
    setisShowMap(false)
    setAddressItem(value)
    axios.get(`https://restapi.amap.com/v3/staticmap?location=${value}&zoom=15&size=750*300&markers=mid,,A:116.481485,39.990464&key=c37598c7e2b37eea85e2c5b7a7b7b30c`, {
      responseType: "arraybuffer",
    })
      .then(
        response => {
          　　return 'data:image/png;base64,' + btoa(
          　　　　new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
          　　);
        }
      )
      .then(data => {
        setMapPicUrl(data)
        setisShowMap(true)
      })
      .catch(error => {
        console.log('获取地图静态图发生错误', error);
      })
    setisShowMap(true)
  }
  let newRecord;
  useEffect(() => {
    if (record !== undefined) {
      // 转换时间
      const startDate = moment(+record.startDate)
      const endDate = moment(+record.endDate)
      let teaId = record.users && record.users[0].userId
      newRecord = {
        ...record,
        openingTime: [startDate, endDate],
        teaId: teaId
      }
      form.setFieldsValue({...newRecord})
    
    }
  }, [record])
  useEffect(() => {
    getTeaList().then(res => {
      if (res.data.code === 0) {
        setTeaList(res.data.data)
      }else{
        message.error('专家列表获取失败')
      }
    })
    return () => {
      clearTimeout(timer)
      timer = null
    }
  }, [])
  return (
    <Modal
      title={addOrEditState[addOrEdit]}
      visible={visable}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
      confirmLoading={confirmLoading}
    >
    <Form {...layout} form={form}>
      <Form.Item
        label="课程名"
        name="courseName"
        rules={[
          {
            required: true,
            message: '请输入课程名!',
          },
        ]}
      >
        <Input placeholder="请输入课程名" disabled={addOrEdit === 'edit'} />
      </Form.Item>

      <Form.Item
        label="所属学科"
        name="subject"
        rules={[
          {
            required: true,
            message: '请输入所属学科!',
          },
        ]}
      >
        <Input placeholder="请输入所属学科" />
      </Form.Item>

      <Form.Item
        label="课程背景"
        name="coureseBackground"
        rules={[
          {
            required: true,
            message: '请输入课程背景!',
          },
        ]}
      >
        <TextArea showCount maxLength={100} placeholder="请输入课程背景" />
      </Form.Item>

      <Form.Item
        label="课程目标"
        name="courseTarget"
        rules={[
          {
            required: true,
            message: '请输入课程目标!',
          },
        ]}
      >
        <TextArea showCount maxLength={100} placeholder="请输入课程目标" />
      </Form.Item>

      <Form.Item
        label="课程框架"
        name="courseFramework"
        rules={[
          {
            required: true,
            message: '请输入课程框架!',
          },
        ]}
      >
        <TextArea showCount maxLength={100} placeholder="请输入课程框架" />
      </Form.Item>

      <Form.Item
        label="开课专家"
        name="teaId"
        rules={[
          {
            required: true,
            message: '请选择开课专家!',
          },
        ]}
      >
          <Select allowClear placeholder="请选择开课专家" disabled={addOrEdit === 'edit'}>
            {
              teaList.map(item => (
                <Option value={item.userId}>{item.realname + ' (' + item.username + ')'}</Option>
              ))
            }
        </Select>
      </Form.Item>

      <Form.Item
        label="开课时间"
        name="openingTime"
        rules={[
          {
            required: true,
            message: '请输入开课时间!',
          },
        ]}
      >
        <RangePicker style={{ width: '100%'}} format="YYYY-MM-DD" />
      </Form.Item>
      {/* <Form.Item
          label="开课地址"
          name="address"
          rules={[
            {
              required: true,
              message: '请输入开课地址!',
            },
          ]}
        >
          <Input placeholder="请输入自定义地址" />
      </Form.Item> */}

    <Form.Item
        label="开课地址"
        name="address"
        rules={[
          {
            required: true,
            message: '请选择开课地址!',
          },
        ]}
      >
          <Select
            allowClear
            placeholder="请选择开课地址"
            showSearch
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            // onChange={handleChange}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={null}
            disabled={addOrEdit === 'edit'}
          >
            {
              address.map(item => (
                <Option value={item.location}>{item.name + ' (' + item.district + ')'}</Option>
              ))
            }
        </Select>
      </Form.Item>
     
    </Form>
    {
      addressItem && (
        isShowMap ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img src={mapPicUrl} alt="地图加载中..." width="100%" height="200" />
          </div>
        ) : (
          <Spin />
        )
      )
    }
  </Modal>
  )
}

UserAddModal.propTypes = {
  addOrEdit: T.oneOf(['add', 'edit']),
}

UserAddModal.defaultProps = {
  addOrEdit: 'add',
}
export default UserAddModal
