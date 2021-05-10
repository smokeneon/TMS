import React, { useState, useEffect } from 'react'
import { Card, message, Input } from 'antd'
import { PageContainer } from '@ant-design/pro-layout';
import Editor from 'for-editor'
import { connect } from 'umi'
import { saveEssay, getDetails } from './api'

const Index = (props) => {
  const { currentUser } = props;
  const [pageTitle, setPageTitle] = useState('')
  const [value, setValue] = useState('')
  const [title, setTitle] = useState('')
  const [firstEssay, setFirstEssay] = useState('yes')
  const [essayId, setEssayId] = useState(null)
  const handleChange =  value =>  {
    setValue(value)
  }
  const saveBtn = value => {
    if (title === '') {
      message.warning('请输入笔记标题')
      return 
    }
    if ( value === '') {
      message.warning('笔记内容不能为空')
      return 
    }
    let addRecord = {
      userId: currentUser.userId,
      content: value,
      firstEssay: 'yes',
      title: title
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
      title: title
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
  const titleChange = e => {
   setTitle(e.target.value)
  }

  

  useEffect(() => {
    //从路径判断是新增还是编辑页面
   if (props.location.pathname === '/essay/details') {
      setFirstEssay('no')
      getDetails(props.location.query.essayId).then(res => {
        if(res.data.code === 0) {
          setTitle(res.data.data.title)
          setValue(res.data.data.content)
          setPageTitle('编辑笔记')
        }else {
          message.error('笔记获取失败')
        }
      }).catch(error => {
        message.error('笔记获取失败')
      })
   } else {
    setFirstEssay('yes')
    setPageTitle('添加笔记')
   }
  }, [])
  return (
    <PageContainer
      title={title}
      content={'你可以使用该页面'+ pageTitle + '，支持Markdown语法'}
      extraContent={
        <Input placeholder="请输入文章标题" value={title} onChange={e => titleChange(e)} />
      }
    >
      <Editor 
        value={value} 
        placeholder="从这开始书写笔记"
        onChange={value => handleChange(value)} 
        onSave={value => saveBtn(value)}
        toolbar = {{
          h1: true, // h1
          h2: false, // h2
          h3: false, // h3
          h4: false, // h4
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
