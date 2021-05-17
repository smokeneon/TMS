import React,{ useEffect, useState }  from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Tag, Row, Col, Carousel, Divider, message, Skeleton } from 'antd';
import './Welcome.less';
import WelcomeSvg from '../assets/welcome.svg'
import WelcomeSvg2 from '../assets/welcome2.svg'
import WelcomeSvg3 from '../assets/welcome3.svg'
import { connect } from 'umi'
import { SmileOutlined } from '@ant-design/icons'
import { identityState } from '../common/const'
import { Pie, ChartCard, MiniArea,TagCloud  } from 'ant-design-pro/lib/Charts';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import axios from 'axios'
import numeral from 'numeral';
import moment from 'moment';
import 'ant-design-pro/dist/ant-design-pro.css'

const Welcome = (props) => {
  const { currentUser } = props;
  const [pieData, setPieData] = useState([])
 
  const [histogramData, setHistogramData] = useState([])
  const [histogramTotal, setHistogramTotal] = useState(0)

  const [hotData, setHotData] = useState([])
  const [weather, setWeather] = useState({})
  const [pieLoading, setPieLoading] = useState(false)
  const [histogramLoading, setHistogramLoading] = useState(false)
  const [hotLoading, setHotLoading] = useState(false)
  // 获取饼图数据
  const pieDate = () => {
    setPieLoading(true)
    axios.get('/api/course/pie').then(res => {
      if(res.data.code === 0) {
        let newData = res.data.data.map(item => {
          return {
            x: item.x,
            y: parseInt(item.y),
          }
        })
        setPieData(newData)
        setPieLoading(false)
      } else {
        message.error(res.data.message)
      }
    }).catch(error => {
      message.error('饼图数据获取失败')
    })
  }

  const hotCourse = () => {
    setHotLoading(true)
    axios.get('/api/course/hot').then(res => {
      console.log('res',res);
      if(res.data.code === 0) { 
        let newData = res.data.data.map(item => {
          return {
            name: item.courseName,
            value: parseInt(item.mount),
          }
        })
        setHotData(newData)
        setHotLoading(false)
      } else {
        message.error(res.data.message)
      }
    }).catch(error => {
      message.error('热门课程获取失败')
    })
  }

  const applyData = () => {
    setHistogramLoading(true)
    axios.get('/api/apply/histogram').then(res => {
      if(res.data.code === 0) {
        let newData = res.data.data.map(item => {
          return {
            x: moment(item.time).format('YYYY-MM-DD') ,
            y: parseInt(item.mount),
          }
        })
        setHistogramTotal(parseInt(res.data.count["0"].total))
        setHistogramData(newData)
        setHistogramLoading(false)
      } else {
        message.error(res.data.message)
      }
    }).catch(error => {
      message.error('饼图数据获取失败')
    })
  }
  useEffect(() => {
    pieDate()
    applyData()
    hotCourse()
    // 查天气
    axios.get('https://restapi.amap.com/v3/weather/weatherInfo?city=610100&key=c37598c7e2b37eea85e2c5b7a7b7b30c')
      .then(res => {
        if(res.data.info === 'OK') {
          setWeather(res.data.lives["0"])
        }
      })
  }, [])
  useEffect(() => {
    console.log('histogramData', histogramData);
  }, [histogramData])
  return (
    <PageContainer
      title={
      <div>
      你好，{ currentUser.realname + ' (' + currentUser.username + ') '}
        <Tag icon={<SmileOutlined />} color="blue">
          { currentUser.identity &&  identityState[currentUser.identity]}
        </Tag>
      </div>
      }
      content="欢迎使用，中小学教育信息化培训者培训管理系统"
      extraContent={
        <>
          <div>西安市: {weather.weather + ' ' + weather.temperature +'度'}</div>
        </> 
      }
    >

      <Row>

         {/* 轮播图 */}
         <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <div style={{margin: '6px'}}>
          <Carousel autoplay>
            <div>
            <Row style={{backgroundColor: '#fff', padding:'12px'}}>
              <Col xs={24} sm={24} md={10} lg={10} xl={10}>
              <div className="welcome" >
                <div className="pic">
                  <img src={WelcomeSvg3}></img>   
                </div>
              </div>
              </Col>
              <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                <div style={{padding: '16px'}}>
                    <div style={{fontSize: '1rem', display:'flex', justifyContent: 'center'}}>
                    一键式申报课程，一站式参训者管理
                    </div>
                    <div style={{fontSize: '0.9rem', display:'flex', justifyContent: 'center'}}>
                      One click application course, one stop participant management
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            </div>

            <div>
            <Row style={{backgroundColor: '#fff', padding:'12px'}}>
              <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                <div style={{display: 'flex', alignItems: 'center', height: '100%', padding: '0 0 0 16px'}}>
                <div style={{padding: '16px'}}>
                    <div style={{fontSize: '1rem', display:'flex', justifyContent: 'center'}}>
                    多角色多权限管理，提升协作效率
                    </div>
                    <div style={{fontSize: '0.9rem', display:'flex', justifyContent: 'center'}}>
                    Multi role and multi authority management to improve cooperation efficiency
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={10} lg={10} xl={10}>
              <div className="welcome" >
                <div className="pic">
                  <img src={WelcomeSvg2}></img>   
                </div>
              </div>
              </Col>
           
            </Row>
            </div>

            <div>
            <Row style={{backgroundColor: '#fff', padding:'12px'}}>
              <Col xs={24} sm={24} md={10} lg={10} xl={10}>
              <div className="welcome" >
                <div className="pic">
                  <img src={WelcomeSvg}></img>   
                </div>
              </div>
              </Col>
              <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                  <div style={{padding: '16px'}}>
                    <div style={{fontSize: '1rem', display:'flex', justifyContent: 'center'}}>
                    多平台兼容，用户可在移动端进行操作
                    </div>
                    <div style={{fontSize: '0.9rem', display:'flex', justifyContent: 'center'}}>
                    Multi platform compatible, users can operate on the mobile terminal
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            </div>

          
          </Carousel>
          </div>
        </Col>
        
        <Col xs={24} sm={24} md={14} lg={14} xl={14}>
          <Card 
            title="学科占比"
            style={{margin: '6px'}}
            >
            {/* <div  style={{height:'23.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', clear: 'both'}}> */}
             {
               !pieLoading ? (
                <Pie
                  hasLegend
                  title="累计学科"
                  subTitle="所属学科"
                  data={pieData}
                  height={260}
                />
               ):(
                <Skeleton active />
               )
             }
            
            {/* </div> */}
          </Card>
        </Col>
        <Col xs={24} sm={24} md={10} lg={10} xl={10}>
          <Row>
            <Col span={24}>
              {
                !histogramLoading ? (
                  <ChartCard 
                      title="总申报数"
                      total={numeral(histogramTotal).format('0,0')}
                      contentHeight={40}
                      style={{margin: '6px'}}
                    >
                    <MiniArea line height={35} data={histogramData} />
                  </ChartCard>
                ):(
                  <div style={{backgroundColor: '#fff'}}>
                    <Skeleton active />
                  </div>
                )
              }
            </Col>
            <Col span={24}>
              <Card style={{margin: '6px'}} title="热门选课">
                {
                  !hotLoading ? (
                    <TagCloud data={hotData} height={102} />
                  ):(
                  <Skeleton active />
                  )
                }
                
              </Card>
            </Col>
          </Row>
         
        </Col>
       
      </Row>
     
    </PageContainer>
  );
};


export default connect((user) => ({
  currentUser: user.user.currentUser
}))(Welcome);