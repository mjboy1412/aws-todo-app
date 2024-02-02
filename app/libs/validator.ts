import { z, Schema } from 'zod';
import { errorMap } from 'zod-validation-error';

z.setErrorMap(errorMap);

function validate(schema: Schema, payload: Record<string, any>) {
  return schema.safeParse(payload);
}

export { validate };
