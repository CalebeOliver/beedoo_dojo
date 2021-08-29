import { Compartimento, IGaveta } from "./protocolos";

export class Gaveta implements IGaveta {
  compartimentos: Compartimento[];

  constructor(compartimentos: Compartimento[]) {
    this.compartimentos = compartimentos
  }

  recuperarTotalDisponivel(): number {
    return this.compartimentos
      .map(({ valor, quantidade }) => valor * quantidade)
      .reduce((anterior, atual) => anterior + atual) || 0
  }

  removerNotas({ valor, quantidade }: Compartimento) {
    const indiceCompartimentoExistente = this.compartimentos.findIndex((compartimento) => compartimento.valor === valor)

    if (indiceCompartimentoExistente < 0) {
      throw new Error(`Este caixa não tem notas de ${valor}`)
    }

    if (this.compartimentos[indiceCompartimentoExistente].quantidade < quantidade) {
      throw new Error('O caixa não tem notas suficientes')
    }

    this.compartimentos[indiceCompartimentoExistente].quantidade -= quantidade
  }

  recuperarQuantidadeDeNotasDisponiveis() {
    return this.compartimentos
  }

}