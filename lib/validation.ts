import { z, ZodSchema } from 'zod'

/**
 * Validates input using a Zod schema and returns either the parsed data or throws an HTTP error
 */
export function validateInput<Input, Output>(
  input: Input,
  schema: ZodSchema<Output>,
  statusCode: number = 400
): Output {
  try {
    return schema.parse(input)
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new HTTPInputError(error.errors, statusCode)
    }
    throw error
  }
}

/**
 * Custom error class for input validation errors
 */
export class HTTPInputError extends Error {
  public readonly errors: z.ZodIssue[]
  public readonly statusCode: number

  constructor(errors: z.ZodIssue[], statusCode: number = 400) {
    super('Input validation error')
    this.errors = errors
    this.statusCode = statusCode
    Object.setPrototypeOf(this, HTTPInputError.prototype)
  }
}

/**
 * Creates an API response for validation errors
 */
export function createValidationError(error: HTTPInputError) {
  return Response.json(
    { 
      error: 'Validation failed', 
      details: error.errors 
    }, 
    { status: error.statusCode }
  )
}