import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ic:round-article',
      keepAlive: true,
      order: 1000,
      title: $t('article.title'),
    },
    name: 'Article',
    path: '/article',
    children: [
      {
        meta: {
          title: $t('article.description'),
        },
        name: 'ArticleList',
        path: '/article/list',
        component: () => import('#/views/article/index.vue'),
      },
      {
        meta: {
          title: $t('article.publish'),
        },
        name: 'ArticlePublish',
        path: '/article/publish',
        component: () => import('#/views/article/publish.vue'),
      },
      {
        meta: {
          title: $t('article.edit'),
        },
        name: 'ArticleEdit',
        path: '/article/eidt/:id',
        component: () => import('#/views/article/publish.vue'),
      },
    ],
  },
];

export default routes;
