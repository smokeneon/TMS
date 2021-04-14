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
                path: '/users',
                name: '用户管理',
                icon: 'crown',
                authority: ['admin'],
                routes: [
                  {
                    path: '/users/all',
                    name: '所有用户',
                    icon: 'smile',
                    component: './Users/All',
                    authority: ['admin'],
                  },
                  {
                    path: '/users/tea',
                    name: '专家',
                    component: './Users/Teacher',
                    authority: ['admin']
                  },
                  {
                    path: '/users/stu',
                    name: '参训者',
                    component: './Users/Student',
                    authority: ['admin']
                  },
                  {
                    path: '/users/admin',
                    name: '管理员',
                    component: './Users/Admin',
                    authority: ['admin']
                  }
                ],
              },
              {
                path: '/course',
                name: '课程管理',
                icon: 'crown',
                authority: ['admin'],
                routes: [
                  {
                    path: '/course/all',
                    name: '所有课程',
                    icon: 'smile',
                    component: './Course/All',
                    authority: ['admin'],
                  },
                  {
                    path: '/course/not-approved',
                    name: '未审批课程',
                    component: './Course/NotApproved',
                    authority: ['admin']
                  },
                  {
                    path: '/course/approved',
                    name: '已审批课程',
                    component: './Course/Approved',
                    authority: ['admin']
                  }
                ],
              },
              {
                path: '/apply',
                name: '申报管理',
                icon: 'crown',
                authority: ['admin'],
                routes: [
                  {
                    path: '/apply/all',
                    name: '所有申报',
                    icon: 'smile',
                    component: './Apply/All',
                    authority: ['admin'],
                  },
                  {
                    path: '/apply/doing',
                    name: '进行中的申报',
                    component: './Apply/Doing',
                    authority: ['admin']
                  },
                  {
                    path: '/apply/finished',
                    name: '已完成的申报',
                    component: './Apply/Finished',
                    authority: ['admin']
                  },
                  {
                    path: '/apply/not-finished',
                    name: '未完成的申报',
                    component: './Apply/NotFinished',
                    authority: ['admin']
                  }
                ],
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
