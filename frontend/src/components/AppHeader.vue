<template>
  <header class="app-header">
    <div class="app-header-content">
      <h1>CRUD de Alunos</h1>
      <nav>
        <RouterLink class="header-link" to="/alunos">Alunos</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
