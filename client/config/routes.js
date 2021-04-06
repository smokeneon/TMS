export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: '欢迎',
                icon: 'smile',
                component: './Welcome',
              },
              {
                path: '/admin',
                name: '管理员',
                icon: 'crown',
                component: './Admin',
                authority: ['admin'],
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: '二级页面',
                    icon: 'smile',
                    component: './Welcome',
                    authority: ['admin'],
                  },
                ],
              },
              {
                name: '用户管理A',
                icon: 'table',
                path: '/user-list',
                component: './UserList',
              },
              {
                name: '课程管理A',
                icon: 'table',
                path: '/course',
                component: './Course',
              },
              {
                name: '申报管理A',
                icon: 'table',
                path: '/apply',
                component: './Apply',
              },
              {
                name: '参训者管理',
                icon: 'table',
                path: '/student',
                component: './Student',
              },
              {
                name: '专家管理',
                icon: 'table',
                path: '/teacher',
                component: './Teacher',
              },
              {
                name: '课程管理(我的)',
                icon: 'table',
                path: '/my-course',
                component: './MyCourse',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
