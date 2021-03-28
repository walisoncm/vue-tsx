import { RouteConfig } from 'vue-router'

import Base from '@/layouts/Base'
import Welcome from '@/views/Welcome'

export const publicRoute: Array<RouteConfig> = [
  {
    path: '*',
    component: () => import('@/views/error/NotFound')
  },
  {
    path: '/',
    component: Base,
    redirect: '/welcome',
    children: [
      {
        path: 'welcome',
        name: 'welcome',
        meta: {
          title: 'welcome',
          group: 'gp',
          icon: 'mdi-view-dashboard'
        },
        component: Welcome
      }
    ]
  }
]

export const protectedRoute: Array<RouteConfig> = []
