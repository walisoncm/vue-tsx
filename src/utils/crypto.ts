import { createHash, HexBase64Latin1Encoding } from 'crypto'

export const sha256 = (data: string, encode: HexBase64Latin1Encoding = 'hex') => {
  return createHash('sha256')
    .update(data)
    .digest(encode)
}
