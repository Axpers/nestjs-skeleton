import { plainToInstance } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumberString,
  IsPort,
  IsString,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {
  @IsNotEmpty()
  @IsString()
  DB_HOST: string;

  @IsNotEmpty()
  @IsNumberString()
  @IsPort()
  DB_PORT: number;

  @IsNotEmpty()
  @IsString()
  DB_USERNAME: string;

  @IsNotEmpty()
  @IsString()
  DB_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  DB_DATABASE: string;

  @IsNotEmpty()
  @IsString()
  JWT_SECRET: string;

  constructor(
    DB_HOST: string,
    DB_PORT: number,
    DB_USERNAME: string,
    DB_PASSWORD: string,
    DB_DATABASE: string,

    JWT_SECRET: string,
  ) {
    this.DB_HOST = DB_HOST;
    this.DB_PORT = DB_PORT;
    this.DB_USERNAME = DB_USERNAME;
    this.DB_PASSWORD = DB_PASSWORD;
    this.DB_DATABASE = DB_DATABASE;

    this.JWT_SECRET = JWT_SECRET;
  }
}

export function validate(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const validatedConfig = plainToInstance(EnvironmentVariables, config);
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
