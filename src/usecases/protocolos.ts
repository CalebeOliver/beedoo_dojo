export interface Compartimento {
  valor: number, quantidade: number
}

export interface IGaveta {
  compartimentos: Compartimento[]
  recuperarTotalDisponivel: () => number
  removerNotas: (notas: Compartimento) => void
  recuperarQuantidadeDeNotasDisponiveis: () => { valor: number, quantidade: number }[]
}

export interface IFormatadorMoeda {
  formatar: (valor: number) => string
}