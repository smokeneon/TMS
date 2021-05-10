import React, { useEffect, useState } from 'react'
import { Card, Row, Col, message, Typography, Skeleton, Empty, Button } from 'antd'
import { PageContainer } from '@ant-design/pro-layout';
import { getEssayList, deleteEssay } from './api'
import { connect } from 'umi'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from 'umi';


const { Paragraph, Text } = Typography;
const { Meta } = Card;

const Index = (props) => {
  const { currentUser } = props;
  const [essayList, setEssayList] = useState([])
  const [loading, setLoading] = useState(true)

  const deleteEssayItem = id => () => {
    deleteEssay(id).then(res => {
      if(res.data.code === 0) {
        message.success('删除成功')
        getList()
      }else{
        message.error('删除失败')
      }
    }).catch(error => {
      message.error('删除失败')
    })
  }
  const getList = () => {
    getEssayList(currentUser.userId).then(res => {
      if(res.data.code === 0) {
        setEssayList(res.data.data)
        setLoading(false)
      }else{
        message.error('笔记获取失败')
      }
    }).catch(error => {
      message.error('笔记获取失败')
    })
  }
  useEffect(() => {
   getList()
  }, [])
  return (
    <PageContainer content="该页面你可以编辑，删除笔记">
      <Card
        title="笔记管理"
      >
         <Row style={{padding: '12px 0 24px 0'}}>
         <Skeleton loading={loading} active avatar paragraph={{ rows: 6 }}>
         {
              essayList.length != 0 ? essayList.map( item => {
               return (
                <Col xs={24} sm={12} md={8} lg={8} xl={6} 
                  style={{
                    margin: '0 0 16px 0', 
                    display: 'flex', 
                    justifyContent: 'center'
                  }}
                >
                  <Card
                    hoverable
                    style={{ width: 200 }}
                    cover={<img alt='img' src={'https://picsum.photos/400/250?random='+ Math.random() } />}
                    actions={[
                      <Link to={{
                        pathname: '/essay/details',
                        query: {
                          essayId: item.essayId,
                        }
                      }}>
                        <EditOutlined key="edit" />
                      </Link>,
                      <DeleteOutlined key="delete" onClick={deleteEssayItem(item.essayId)} />,
                    ]}
                  >
                    {/* <Meta title={item.title} description={item.introduction} /> */}
                    <Meta title={item.title} description={
                      <Paragraph ellipsis={{ rows: 1, ellipsis: '...' }}>{item.introduction}</Paragraph>
                    } />
                    
                  </Card>
                </Col>
               )
             }) : (
               <div style={{width: '100%'}}>
                <Empty>
                  <Link to="/note">
                    <Button type="primary">立即新建笔记</Button>
                  </Link>
                </Empty>
               </div>
             )
           }
         </Skeleton>
        </Row>
      </Card>
    </PageContainer>
  )
}

export default connect((user) => ({
  currentUser: user.user.currentUser
}))(Index);
