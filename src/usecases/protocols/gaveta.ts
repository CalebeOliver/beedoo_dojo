import { Compartimento } from "./compartimento";

export interface IGaveta {
  compartimentos: Compartimento[]
  recuperarTotalDisponivel: () => number
  removerNotas: (notas: Compartimento) => void
  recuperarQuantidadeDeNotasDisponiveis: () => { valor: number, quantidade: number }[]
}