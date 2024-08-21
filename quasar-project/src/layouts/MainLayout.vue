<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/TSJZapopan_Logo.jpg/220px-TSJZapopan_Logo.jpg">
          </q-avatar>
          Bienvenido al centro de inventarios del tecnologico
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <!-- drawer content -->
      <q-list>

        <q-item to="/categories" clickable v-riper>
          <q-item-section avatar>
            <q-icon name="category" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Categorias</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/products" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="shopping_basket" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Inventariado</q-item-label>
          </q-item-section>
        </q-item>


      </q-list>

      <q-item to="/" clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="arrow_back" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Salir</q-item-label>
        </q-item-section>
      </q-item>
    
      
      
    </q-drawer>
    <q-list></q-list>
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  created() {
    if (!localStorage.getItem('loggedIn')) {
      this.$router.push('/login');
    }
  },
}
</script>