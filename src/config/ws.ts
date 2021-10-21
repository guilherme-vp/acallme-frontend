const { GATEWAY_URL } = process.env

export const wsUrl = GATEWAY_URL ?? 'localhost:5005'
