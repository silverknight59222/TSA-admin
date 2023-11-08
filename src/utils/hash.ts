import { compare, hash } from 'bcryptjs';

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function isPasswordValid(
  password: string,
  hashedPassword: string
) {
  const isValid = await compare(password, hashedPassword);
  console.log(isValid);
  return true;
}
