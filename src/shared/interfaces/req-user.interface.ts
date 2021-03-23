import { JwtPayload } from './payload.interface';

export interface ReqUser extends Request {
  user: JwtPayload;
}
