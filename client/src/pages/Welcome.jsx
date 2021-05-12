import React,{ useEffect, useState }  from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Tag, Row, Col, Carousel, Divider } from 'antd';
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

const tags = [];
let courses = ['概率论与数理统计','数字电子技术', '电路分析基础', '计算机网络', '医学护理', '口语交际', '离散数学', '英语', 'Oracle', '数字逻辑于技术','概率论与数理统计','数字电子技术', '电路分析基础', '计算机网络', '医学护理', '口语交际', '离散数学', '英语', 'Oracle', '数字逻辑于技术']
for (let i = 0; i < courses.length; i += 1) {
  tags.push({
    name: courses[i],
    value: Math.floor(Math.random() * 50) + 20,
  });
}

const salesPieData = [
  {
    x: '医学',
    y: 3,
  },
  {
    x: '计算机',
    y: 6,
  },
  {
    x: '数学',
    y: 2,
  },
  {
    x: '物理学',
    y: 1,
  },
  {
    x: '职业素养',
    y: 3,
  },
  {
    x: '心理学',
    y: 3,
  },
];

const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 100) + 10,
  });
}
const Welcome = (props) => {
  const { currentUser } = props;
  const [weather, setWeather] = useState({})
  useEffect(() => {
    axios.get('https://restapi.amap.com/v3/weather/weatherInfo?city=610100&key=c37598c7e2b37eea85e2c5b7a7b7b30c')
      .then(res => {
        if(res.data.info === 'OK') {
          setWeather(res.data.lives["0"])
        }
      })
  }, [])
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
      content="欢迎使用，中小学教育信息化培训者培训管理平台"
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
              <Pie
                hasLegend
                title="累计学科"
                subTitle="所属学科"
                data={salesPieData}
                height={260}
              />
            {/* </div> */}
          </Card>
        </Col>
        <Col xs={24} sm={24} md={10} lg={10} xl={10}>
          <Row>
            <Col span={24}>
              <ChartCard 
                  title="总申报数"
                  total={numeral(59).format('0,0')}
                  contentHeight={40}
                  style={{margin: '6px'}}
                >
                <MiniArea line height={35} data={visitData} />
              </ChartCard>
            </Col>
            <Col span={24}>
              <Card style={{margin: '6px'}} title="热门选课">
                <TagCloud data={tags} height={102} />
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