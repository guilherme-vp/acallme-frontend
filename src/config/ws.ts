const { GATEWAY_URL } = process.env

export const gatewayUrl = GATEWAY_URL ?? 'http://localhost:5005'
