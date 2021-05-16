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
                icon: 'user',
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
                icon: 'fire',
                authority: ['admin'],
                routes: [
                  {
                    path: '/course/all',
                    name: '所有课程',
                    icon: 'fire',
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
                icon: 'rocket',
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
              // 参训者身份菜单
              {
                path: '/stu/course/all',
                name: '全部课程',
                icon: 'fire',
                component: './CourseStu/All',
                authority: ['stu', 'tea'],
              },
              {
                path: '/stu/course/canApply',
                name: '可申请课程',
                icon: 'fire',
                component: './CourseStu/CanApply',
                authority: ['stu'],
              },
              {
                path: '/stu/apply/my',
                name: '我的申报',
                icon: 'smile',
                component: './ApplyStu/My',
                authority: ['stu'],
              },
              // 专家身份菜单
              {
                path: '/tea/course/add',
                name: '添加课程',
                icon: 'fire',
                component: './CourseTea/Add',
                authority: ['tea'],
              },
              {
                path: '/tea/course/my',
                name: '我的课程',
                icon: 'fire',
                component: './CourseTea/My',
                authority: ['tea'],
              },
              {
                path: '/tea/course/details',
                icon: 'fire',
                component: './CourseTea/Details',
                authority: ['tea'],
              },
              // 所有身份都可访问的
              {
                path: '/note',
                name: '新建笔记',
                icon: 'insertRowRight',
                component: './Editor/',
                authority: ['stu', 'tea', 'admin'],
              },
              {
                path: '/essay/details',
                icon: 'insertRowRight',
                component: './Editor/',
                authority: ['stu', 'tea', 'admin'],
              },
              {
                path: '/myNote',
                name: '我的笔记',
                icon: 'insertRowRight',
                component: './MyNote/',
                authority: ['stu', 'tea', 'admin'],
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
