export class InvalidValueError extends Error {
  constructor() {
    super('O valor fornecido deve ser um número inteiro')
    this.name = 'InvalidValueError'
  }
}
