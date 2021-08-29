const input = process.openStdin()

export class Teclado {
  static ler(message: string): Promise<string> {
    return new Promise(resolve => {
      console.log(message)
      return input.addListener('data', (data) => resolve(data.toString().trim()))
    })
  }
}