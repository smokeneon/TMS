## TMS


中小学教育信息化培训者培训管理系统

前台 Umi + Antd Pro + Rematch 

后台 Nest + TypeORM + MySQL


部署流程 

前端本地执行yarn build后直接用sftp上传至服务器（nginx根据配置文件会执行更新）

进入服务器的tms-prod文件夹 cd server 

执行yarn build

然后cd dist 

新建文件夹 mkdir upload（上传文件路径，找不到会报错）

cd ..

pm2 restart ./dist/main.js

pm2 list

