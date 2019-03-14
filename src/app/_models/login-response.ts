import { User } from './user';

export class LoginResponse {
    success: boolean;
    payload: { token: '', user: User };
    message: string;
}
