import { http } from './http'
import type { components } from './generated/schema'

export type CreateAlunoDto = components['schemas']['CreateAlunoDto']
export type UpdateAlunoDto = components['schemas']['UpdateAlunoDto']
export type Aluno = CreateAlunoDto & { id: number }

const recurso = '/aluno'
export async function listar(): Promise<Aluno[]> {
  const { data } = await http.get<Aluno[]>(recurso)
  return data
}

export async function buscar(id: number): Promise<Aluno> {
  const { data } = await http.get<Aluno>(`${recurso}/${id}`)
  return data
}

export async function criar(payload: CreateAlunoDto): Promise<Aluno> {
  const { data } = await http.post<Aluno>(recurso, payload)
  return data
}

export async function atualizar(id: number, payload: UpdateAlunoDto): Promise<Aluno> {
  const { data } = await http.patch<Aluno>(`${recurso}/${id}`, payload)
  return data
}

export async function remover(id: number): Promise<Aluno> {
  const { data } = await http.delete<Aluno>(`${recurso}/${id}`)
  return data
}
