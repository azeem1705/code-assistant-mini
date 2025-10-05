import { validate } from 'class-validator';

export async function AppValidationError(input: object) {
  const errors = await validate(input);
  if (errors.length > 0) {
    return errors;
  }
  return null;
}