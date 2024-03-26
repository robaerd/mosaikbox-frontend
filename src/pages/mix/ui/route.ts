import RouteViewComponent from '../../../layouts/RouterBypass.vue'

export default {
  name: 'ui',
  path: 'ui',
  component: RouteViewComponent,
  children: [
    {
      name: 'typography',
      path: 'typography',
      component: () => import('@/pages/mix/ui/typography/Typography.vue'),
    },
    {
      name: 'buttons',
      path: 'buttons',
      component: () => import('@/pages/mix/ui/buttons/Buttons.vue'),
      meta: {
        wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Buttons',
      },
    },
    {
      name: 'rating',
      path: 'rating',
      component: () => import('@/pages/mix/ui/rating/Rating.vue'),
      meta: {
        wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Rating',
      },
    },
    {
      name: 'color-pickers',
      path: 'color-pickers',
      component: () => import('@/pages/mix/ui/color-pickers/ColorPickers.vue'),
      meta: {
        wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Color-Pickers',
      },
    },
    // {
    //   name: "timelines",
    //   path: "timelines",
    //   component: () => import("../../../pages/admin/ui/timelines/Timelines.vue"),
    //   meta: {
    //     wikiLink: "https://github.com/epicmaxco/vuestic-admin/wiki/Timelines",
    //   },
    // },
    {
      name: 'notifications',
      path: 'notifications',
      component: () => import('@/pages/mix/ui/notifications/Notifications.vue'),
      meta: {
        wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Notifications',
      },
    },
    {
      path: 'icons',
      component: () => import('@/pages/mix/ui/icons/Icons.vue'),
      children: [
        {
          name: 'icon-sets',
          path: '', // Default route
          component: () => import('@/pages/mix/ui/icons/SetsList.vue'),
          meta: {
            wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Icons',
          },
        },
        {
          name: 'icon-set',
          path: ':name',
          component: () => import('@/pages/mix/ui/icons/IconSet.vue'),
          props: true,
          meta: {
            wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Icons',
          },
        },
      ],
    },
    {
      name: 'spinners',
      path: 'spinners',
      component: () => import('@/pages/mix/ui/spinners/Spinners.vue'),
    },
    {
      name: 'modals',
      path: 'modals',
      component: () => import('@/pages/mix/ui/modals/Modals.vue'),
      meta: {
        wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Modals',
      },
    },
    {
      name: 'cards',
      path: 'cards',
      component: () => import('@/pages/mix/ui/cards/Cards.vue'),
      meta: {
        wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Cards',
      },
    },
    {
      name: 'file-upload',
      path: 'file-upload',
      component: () => import('@/pages/mix/ui/file-upload/FileUpload.vue'),
      meta: {
        wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/File-Upload',
      },
    },
    {
      name: 'chips',
      path: 'chips',
      component: () => import('@/pages/mix/ui/chips/Chips.vue'),
      meta: {
        wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Chips',
      },
    },
    {
      name: 'tree-view',
      path: 'tree-view',
      component: () => import('@/pages/mix/ui/tree-view/TreeView.vue'),
      meta: {
        wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Tree-view',
      },
    },
    {
      name: 'collapses',
      path: 'collapses',
      meta: {
        wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Collapse',
      },
      component: () => import('@/pages/mix/ui/collapse/Collapses.vue'),
    },
    {
      name: 'colors',
      path: 'colors',
      component: () => import('@/pages/mix/ui/colors/Colors.vue'),
    },
    {
      name: 'sliders',
      path: 'sliders',
      component: () => import('@/pages/mix/ui/sliders/Sliders.vue'),
      meta: {
        wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Sliders',
      },
    },
    {
      name: 'popovers',
      path: 'popovers',
      component: () => import('@/pages/mix/ui/popovers/Popovers.vue'),
    },
    {
      name: 'chat',
      path: 'chat',
      component: () => import('@/pages/mix/ui/chat/ChatPage.vue'),
      meta: {
        wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Chat',
      },
    },
    {
      name: 'tabs',
      path: 'tabs',
      component: () => import('@/pages/mix/ui/tabs/Tabs.vue'),
      meta: {
        wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Tabs',
      },
    },
    {
      name: 'lists',
      path: 'lists',
      component: () => import('@/pages/mix/ui/lists/Lists.vue'),
      meta: {
        wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Lists',
      },
    },
  ],
}
