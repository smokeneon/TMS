import React, { useState, useEffect } from 'react'
import { Card, message } from 'antd'
import { PageContainer } from '@ant-design/pro-layout';
import Editor from 'for-editor'
import { connect } from 'umi'
import { saveEssay } from './api'

const Index = (props) => {
  const { currentUser } = props;
  const [value, setValue] = useState('')
  const [firstEssay, setFirstEssay] = useState('yes')
  const [essayId, setEssayId] = useState(null)
  const handleChange =  value =>  {
    setValue(value)
  }
  const saveBtn = value => {
    let addRecord = {
      userId: currentUser.userId,
      content: value,
      firstEssay: 'yes',
    }
    if (firstEssay === 'yes') {
      saveEssay(addRecord).then(res => {
        if (res.data.code === 0) {
          message.success('文章首次保存成功')
          setEssayId(res.data.data.essayId)
          setFirstEssay('no')
        } else {
          message.error('文章首次保存失败')
        }
      }).catch(error => {
        message.error('文章首次保存失败')
      })
    }

    let updateRecord = {
      userId: currentUser.userId,
      content: value,
      firstEssay: 'no',
      essayId: essayId,
    }
    if (firstEssay === 'no') {
      saveEssay(updateRecord).then(res => {
        if (res.data.code === 0) {
          message.success('文章保存成功')
          setEssayId(res.data.data.essayId)
          setFirstEssay('no')
        } else {
          message.error('文章保存失败')
        }
      }).catch(error => {
        message.error('文章保存失败')
      })
    }
  }
  useEffect(() => {
   setFirstEssay('yes')
  }, [])
  useEffect(() => {
    console.log('firstEssay', essayId);
  }, [essayId])
  return (
    <PageContainer content="你可以使用该页面新建笔记，支持Markdown语法">
      <Editor 
        value={value} 
        placeholder="从这开始书写笔记"
        onChange={value => handleChange(value)} 
        onSave={value => saveBtn(value)}
        toolbar = {{
          h1: true, // h1
          h2: true, // h2
          h3: true, // h3
          h4: true, // h4
          img: false, // 图片
          link: true, // 链接
          code: true, // 代码块
          preview: true, // 预览
          expand: true, // 全屏
          /* v0.0.9 */
          undo: true, // 撤销
          redo: true, // 重做
          save: true, // 保存
          /* v0.2.3 */
          subfield: true, // 单双栏模式
        }}
      />
    </PageContainer>
  )
}

export default connect((user) => ({
  currentUser: user.user.currentUser
}))(Index);
