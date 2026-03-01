<template>
  <form class="form-card" @submit.prevent="handleSubmit">
    <div class="field">
      <label for="nome">Nome</label>
      <input id="nome" v-model.trim="form.nome" type="text" />
    </div>

    <div class="field">
      <label for="email">E-mail</label>
      <input id="email" v-model.trim="form.email" type="email" />
    </div>

    <div class="field">
      <label for="idade">Idade</label>
      <input id="idade" v-model.number="form.idade" type="number" min="16" />
    </div>

    <div class="field">
      <label for="curso">Curso</label>
      <input id="curso" v-model.trim="form.curso" type="text" />
    </div>

    <p v-if="erroLocal" class="feedback erro">{{ erroLocal }}</p>

    <div class="form-actions">
      <button class="btn btn-primary" type="submit" :disabled="loading">
        {{ loading ? 'Salvando...' : submitLabel }}
      </button>
      <button class="btn btn-secondary" type="button" :disabled="loading" @click="$emit('cancelar')">
        Cancelar
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { Aluno, CreateAlunoDto } from '../api/alunos'

const props = defineProps<{
  loading?: boolean
  submitLabel: string
  valorInicial?: Aluno | null
}>()

const emit = defineEmits<{
  submit: [payload: CreateAlunoDto]
  cancelar: []
}>()

const erroLocal = ref('')

const form = reactive<CreateAlunoDto>({
  nome: '',
  email: '',
  idade: 16,
  curso: '',
})

watch(
  () => props.valorInicial,
  (valor) => {
    form.nome = valor?.nome ?? ''
    form.email = valor?.email ?? ''
    form.idade = valor?.idade ?? 16
    form.curso = valor?.curso ?? ''
    erroLocal.value = ''
  },
  { immediate: true },
)

function handleSubmit() {
  erroLocal.value = ''

  if (!form.nome || !form.email || !form.curso) {
    erroLocal.value = 'Preencha nome, e-mail e curso.'
    return
  }

  if (form.idade < 16) {
    erroLocal.value = 'A idade minima e 16 anos.'
    return
  }

  emit('submit', {
    nome: form.nome,
    email: form.email,
    idade: Number(form.idade),
    curso: form.curso,
  })
}
</script>
