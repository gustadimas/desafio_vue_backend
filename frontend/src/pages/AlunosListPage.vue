<template>
  <section>
    <div class="page-header">
      <h2>Alunos</h2>
      <RouterLink class="btn btn-primary" to="/alunos/novo">Novo aluno</RouterLink>
    </div>

    <p v-if="store.erro" class="feedback erro">{{ store.erro }}</p>
    <p v-if="store.carregandoLista" class="feedback info">Carregando alunos...</p>

    <div v-if="!store.carregandoLista" class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Idade</th>
            <th>Curso</th>
            <th>Acoes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="aluno in store.lista" :key="aluno.id">
            <td>{{ aluno.id }}</td>
            <td>{{ aluno.nome }}</td>
            <td>{{ aluno.email }}</td>
            <td>{{ aluno.idade }}</td>
            <td>{{ aluno.curso }}</td>
            <td class="actions">
              <RouterLink class="btn btn-secondary btn-sm" :to="`/alunos/${aluno.id}/editar`">
                Editar
              </RouterLink>
              <button class="btn btn-danger btn-sm" :disabled="store.salvando" @click="confirmarExclusao(aluno.id)">
                Excluir
              </button>
            </td>
          </tr>
          <tr v-if="store.lista.length === 0">
            <td colspan="6">Nenhum aluno cadastrado.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useAlunosStore } from '../stores/alunos'

const store = useAlunosStore()

onMounted(() => {
  store.carregarLista()
})

async function confirmarExclusao(id: number) {
  const ok = window.confirm('Tem certeza que deseja excluir este aluno?')
  if (!ok) return
  await store.removerAluno(id)
}
</script>
