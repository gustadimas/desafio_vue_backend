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
import { getApiErrorMessage } from '../api/errors'

export const useAlunosStore = defineStore('alunos', {
  state: () => ({
    lista: [] as Aluno[],
    selecionado: null as Aluno | null,
    carregandoLista: false,
    carregandoItem: false,
    salvando: false,
    erro: '',
    sucesso: '',
  }),
  actions: {
    limparMensagens() {
      this.erro = ''
      this.sucesso = ''
    },
    definirErro(mensagem: string) {
      this.erro = mensagem
      this.sucesso = ''
    },
    definirSucesso(mensagem: string) {
      this.sucesso = mensagem
      this.erro = ''
    },
    async carregarLista() {
      this.carregandoLista = true
      this.erro = ''
      try {
        this.lista = await listar()
      } catch (error) {
        this.definirErro(getApiErrorMessage(error))
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
        this.definirErro(getApiErrorMessage(error))
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
        this.definirSucesso('Aluno criado com sucesso.')
        return aluno
      } catch (error) {
        this.definirErro(getApiErrorMessage(error))
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
        this.definirSucesso('Aluno atualizado com sucesso.')
        return aluno
      } catch (error) {
        this.definirErro(getApiErrorMessage(error))
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
        this.definirSucesso('Aluno removido com sucesso.')
        return true
      } catch (error) {
        this.definirErro(getApiErrorMessage(error))
        return false
      } finally {
        this.salvando = false
      }
    },
  },
})
