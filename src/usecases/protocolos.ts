export interface IGaveta {
  compartimentos: { valor: number, quantidade: number }[]
  recuperarTotalDisponivel: () => number
  recuperarQuantidadeDeNotasDisponiveis: () => { valor: number, quantidade: number }[]
}

export interface IFormatadorMoeda {
  formatar: (valor: number) => string
}