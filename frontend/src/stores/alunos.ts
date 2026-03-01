import axios from 'axios'
import { defineStore } from 'pinia'
import {
  atualizar,
  buscar,
  criar,
  listar,
  remover,
  type Aluno,
  type CreateAlunoDto,
  type UpdateAlunoDto,
} from '../api/alunos'

function getMensagemErro(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string | string[] } | undefined
    if (Array.isArray(data?.message)) {
      return data.message.join(', ')
    }
    if (typeof data?.message === 'string' && data.message.length > 0) {
      return data.message
    }
    if (typeof error.message === 'string' && error.message.length > 0) {
      return error.message
    }
  }

  if (error instanceof Error && error.message.length > 0) {
    return error.message
  }

  return 'Ocorreu um erro inesperado.'
}

export const useAlunosStore = defineStore('alunos', {
  state: () => ({
    lista: [] as Aluno[],
    selecionado: null as Aluno | null,
    carregandoLista: false,
    carregandoItem: false,
    salvando: false,
    erro: '',
  }),
  actions: {
    limparErro() {
      this.erro = ''
    },
    async carregarLista() {
      this.carregandoLista = true
      this.erro = ''
      try {
        this.lista = await listar()
      } catch (error) {
        this.erro = getMensagemErro(error)
      } finally {
        this.carregandoLista = false
      }
    },
    async carregarAluno(id: number) {
      this.carregandoItem = true
      this.erro = ''
      try {
        this.selecionado = await buscar(id)
      } catch (error) {
        this.erro = getMensagemErro(error)
        this.selecionado = null
      } finally {
        this.carregandoItem = false
      }
    },
    async criarAluno(payload: CreateAlunoDto): Promise<Aluno | null> {
      this.salvando = true
      this.erro = ''
      try {
        const aluno = await criar(payload)
        return aluno
      } catch (error) {
        this.erro = getMensagemErro(error)
        return null
      } finally {
        this.salvando = false
      }
    },
    async atualizarAluno(id: number, payload: UpdateAlunoDto): Promise<Aluno | null> {
      this.salvando = true
      this.erro = ''
      try {
        const aluno = await atualizar(id, payload)
        return aluno
      } catch (error) {
        this.erro = getMensagemErro(error)
        return null
      } finally {
        this.salvando = false
      }
    },
    async removerAluno(id: number): Promise<boolean> {
      this.salvando = true
      this.erro = ''
      try {
        await remover(id)
        this.lista = this.lista.filter((aluno) => aluno.id !== id)
        return true
      } catch (error) {
        this.erro = getMensagemErro(error)
        return false
      } finally {
        this.salvando = false
      }
    },
  },
})
