export class GoogleSheetsError extends Error {
  constructor(
    message: string,
    public readonly range?: string,
    public readonly cause?: unknown,
  ) {
    super(message)
    this.name = 'GoogleSheetsError'
  }
}
