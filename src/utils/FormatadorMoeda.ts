export class FormatadorMoeda  {
  static formatar(value: number) {
    const padrao = Intl.NumberFormat('pt-Br', {
      style: 'currency',
      currency: 'BRL'
    })

    return padrao.format(value).replace(/\s/, " ")
  }
}