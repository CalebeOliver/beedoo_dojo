export class UnavaiableValueError extends Error {
  constructor() {
    super('O valor solicitado não está disponível')
    this.name = 'UnavaiableValueError'
  }
}
