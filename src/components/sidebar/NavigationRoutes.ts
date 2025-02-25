export interface INavigationRoute {
  name: string
  displayName: string
  meta: { icon: string }
  children?: INavigationRoute[]
}

export default {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'mixing',
      displayName: 'menu.mixing',
      meta: {
        icon: 'vuestic-iconset-dashboard',
      },
    },
    {
      name: 'library',
      displayName: 'menu.library',
      meta: {
        icon: 'vuestic-iconset-statistics',
      },
      disabled: true,
      children: [
        {
          name: 'my-mixes',
          displayName: 'menu.myMixes',
        },
        // {
        //   name: 'progress-bars',
        //   displayName: 'menu.progressBars',
        // },
      ],
    },
    {
      name: 'user-study',
      displayName: 'menu.userStudy',
      meta: {
        icon: 'fa-graduation-cap',
      },
      disabled: true,
    },
    // {
    //   name: 'forms',
    //   displayName: 'menu.forms',
    //   meta: {
    //     icon: 'vuestic-iconset-forms',
    //   },
    //   disabled: true,
    //   children: [
    //     {
    //       name: 'form-elements',
    //       displayName: 'menu.formElements',
    //     },
    //     {
    //       name: 'medium-editor',
    //       displayName: 'menu.mediumEditor',
    //     },
    //   ],
    // },
    // {
    //   name: 'tables',
    //   displayName: 'menu.tables',
    //   meta: {
    //     icon: 'vuestic-iconset-tables',
    //   },
    //   children: [
    //     {
    //       name: 'markup',
    //       displayName: 'menu.markupTables',
    //     },
    //     // {
    //     //   name: 'data',
    //     //   displayName: 'menu.dataTables',
    //     // },
    //   ],
    // },
    // {
    //   name: 'ui',
    //   displayName: 'menu.uiElements',
    //   meta: {
    //     icon: 'vuestic-iconset-ui-elements',
    //   },
    //   disabled: true,
    //   children: [
    //     {
    //       name: 'buttons',
    //       displayName: 'menu.buttons',
    //     },
    //     {
    //       name: 'cards',
    //       displayName: 'menu.cards',
    //     },
    //     {
    //       name: 'chat',
    //       displayName: 'menu.chat',
    //     },
    //     {
    //       name: 'chips',
    //       displayName: 'menu.chips',
    //     },
    //     {
    //       name: 'collapses',
    //       displayName: 'menu.collapses',
    //     },
    //     {
    //       name: 'colors',
    //       displayName: 'menu.colors',
    //     },
    //     {
    //       name: 'color-pickers',
    //       displayName: 'menu.colorPickers',
    //     },
    //     {
    //       name: 'file-upload',
    //       displayName: 'menu.fileUpload',
    //     },
    //     {
    //       name: 'icon-sets',
    //       displayName: 'menu.icons',
    //       children: [
    //         {
    //           displayName: 'concrete',
    //           name: 'icon-set',
    //         },
    //       ],
    //     },
    //     {
    //       name: 'lists',
    //       displayName: 'menu.lists',
    //     },
    //     {
    //       name: 'modals',
    //       displayName: 'menu.modals',
    //     },
    //     {
    //       name: 'notifications',
    //       displayName: 'menu.notifications',
    //     },
    //     {
    //       name: 'popovers',
    //       displayName: 'menu.popovers',
    //     },
    //     {
    //       name: 'rating',
    //       displayName: 'menu.rating',
    //     },
    //     {
    //       name: 'sliders',
    //       displayName: 'menu.sliders',
    //     },
    //     {
    //       name: 'spinners',
    //       displayName: 'menu.spinners',
    //     },
    //     {
    //       name: 'tabs',
    //       displayName: 'menu.tabs',
    //     },
    //     // {
    //     //   name: "timelines",
    //     //   displayName: "menu.timelines",
    //     // },
    //     {
    //       name: 'tree-view',
    //       displayName: 'menu.treeView',
    //     },
    //     {
    //       name: 'typography',
    //       displayName: 'menu.typography',
    //     },
    //   ],
    // },
    // {
    //   name: 'pages',
    //   displayName: 'menu.pages',
    //   meta: {
    //     icon: 'vuestic-iconset-files',
    //   },
    //   disabled: true,
    //   children: [
    //     {
    //       name: 'login',
    //       displayName: 'menu.login-singup',
    //     },
    //     {
    //       name: '404-pages',
    //       displayName: 'menu.404-pages',
    //     },
    //     {
    //       name: 'faq',
    //       displayName: 'menu.faq',
    //     },
    //   ],
    // },
  ] as INavigationRoute[],
}
