import { SetMetadata } from '@nestjs/common';
import { RouteParametersType } from '../parameters/route-parameters';

export const RIGHTS_KEY = 'rights';
export const Rights = (...rights: RouteParametersType[]) =>
  SetMetadata(RIGHTS_KEY, rights);
