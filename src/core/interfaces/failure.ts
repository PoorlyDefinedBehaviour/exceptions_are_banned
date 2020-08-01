export interface Failure {
  readonly type: string
  readonly field: string
  readonly message: string
  readonly extensions?: any
}
