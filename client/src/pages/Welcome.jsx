import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert } from 'antd';
import { useIntl } from 'umi';
import './Welcome.less';

export default () => {
  const intl = useIntl();
  return (
    <PageContainer>
      <Card>
        <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.alertMessage',
            defaultMessage: '一体化培训管理平台',
          })}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <div className="welcome" >
          <h1>欢迎使用，中小学教育信息化培训者培训管理平台</h1>
        </div>
      </Card>
    </PageContainer>
  );
};
