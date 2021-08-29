import { FormatadorMoeda } from '../utils/FormatadorMoeda'
import { CaixaEletronico } from "./CaixaEletronico"
import { Teclado } from '../utils/teclado'
import { Gaveta } from "./Gaveta"

const gaveta = new Gaveta([
  { valor: 100, quantidade: 100 },
  { valor: 50, quantidade: 100 },
  { valor: 20, quantidade: 100 },
  { valor: 10, quantidade: 100 }
])

const caixaEletronico = new CaixaEletronico(gaveta, FormatadorMoeda);

(async () => {
  while (true) {
    const valor = await Teclado.ler('Quanto você deseja sacar?')
    try {
      const message = caixaEletronico.sacar(Number.parseInt(valor))
      console.info("\n" + message)
      console.log(`(saldo no caixa: ${gaveta.recuperarTotalDisponivel()})\n`)
    } catch ({ message }) {
      console.error(message)
    }
  }
})()