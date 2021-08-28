export class UnavaiableNotesForValueError extends Error {
  constructor() {
    super("Ná há notas disponíveis para o valor informado.")
    this.name = 'UnavaiableNotesForValueError'
  }
}
