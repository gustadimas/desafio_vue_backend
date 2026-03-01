<template>
  <section>
    <h2>{{ tituloPagina }}</h2>

    <p v-if="store.erro" class="feedback erro">{{ store.erro }}</p>
    <p v-if="carregandoPagina" class="feedback info">Carregando...</p>

    <AlunoForm
      v-else
      :loading="store.salvando"
      :submit-label="textoBotao"
      :valor-inicial="store.selecionado"
      @submit="salvar"
      @cancelar="voltar"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AlunoForm from '../components/AlunoForm.vue'
import type { CreateAlunoDto } from '../api/alunos'
import { useAlunosStore } from '../stores/alunos'

const route = useRoute()
const router = useRouter()
const store = useAlunosStore()

const idParam = computed(() => Number(route.params.id))
const modoEdicao = computed(() => route.name === 'alunos-editar')
const tituloPagina = computed(() => (modoEdicao.value ? 'Editar aluno' : 'Novo aluno'))
const textoBotao = computed(() => (modoEdicao.value ? 'Atualizar' : 'Salvar'))
const carregandoPagina = computed(() => modoEdicao.value && store.carregandoItem)

onMounted(async () => {
  store.limparErro()
  store.selecionado = null

  if (modoEdicao.value) {
    if (!Number.isFinite(idParam.value)) {
      store.erro = 'ID invalido para edicao.'
      return
    }
    await store.carregarAluno(idParam.value)
  }
})

async function salvar(payload: CreateAlunoDto) {
  if (modoEdicao.value) {
    const atualizado = await store.atualizarAluno(idParam.value, payload)
    if (atualizado) {
      await router.push('/alunos')
    }
    return
  }

  const criado = await store.criarAluno(payload)
  if (criado) {
    await router.push('/alunos')
  }
}

async function voltar() {
  await router.push('/alunos')
}
</script>
