export interface PasskeyRegistrationRequest {
  userId: string
  email: string
  displayName?: string
}

export interface PasskeyCredential {
  id: string
  rawId: string
  response: any
  type: string
}

export default {}
