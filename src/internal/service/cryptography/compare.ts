import bcrypt from 'bcrypt'

export default async function compare(text: string, hash: string) {
  return await bcrypt.compare(text, hash)
}
