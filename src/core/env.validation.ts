import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, validateSync } from 'class-validator';

class EnvVariables {
  @IsNotEmpty()
  PORT: string;

  @IsNotEmpty()
  JWT_ACCESS_SECRET: string;
}

export function validate(config: Record<string, string>) {
  const envVariable = plainToInstance(EnvVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(envVariable, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return envVariable;
}
