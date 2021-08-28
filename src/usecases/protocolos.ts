export interface IGaveta {
  compartimentos: { valor: number, quantidade: number }[]
  recuperarTotalDisponivel: () => number
}