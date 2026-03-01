import { createRouter, createWebHistory } from 'vue-router'
import AlunoFormPage from '../pages/AlunoFormPage.vue'
import AlunosListPage from '../pages/AlunosListPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/alunos',
    },
    {
      path: '/alunos',
      name: 'alunos-lista',
      component: AlunosListPage,
    },
    {
      path: '/alunos/novo',
      name: 'alunos-novo',
      component: AlunoFormPage,
    },
    {
      path: '/alunos/:id/editar',
      name: 'alunos-editar',
      component: AlunoFormPage,
    },
  ],
})
export default router
