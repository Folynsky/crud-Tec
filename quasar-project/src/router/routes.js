const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },

      // Paths para el apartado de categorías
      { path: 'categories', component: () => import('pages/admin/categories/categoryIndex.vue') },
      { path: 'createCategory', component: () => import('pages/admin/categories/createCategory.vue') },
      {
        path: 'updateCategory/:idcategoria',
        name: 'updateCategory',
        component: () => import('pages/admin/categories/editCategory.vue')
      },

      {
        path: '/products',
        component: () => import('pages/admin/items/itemsIndex.vue')
      },
      { path: '/createProduct', component: () => import('pages/admin/items/createItem.vue') },
      {
        path: '/updateProduct/:id_material',
        name: 'updateProduct',
        component: () => import('pages/admin/items/editItem.vue')
      }

    ]
  },

  // Siempre deja este al final
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
