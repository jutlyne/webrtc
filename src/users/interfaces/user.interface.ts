import { JwtPayload } from 'jsonwebtoken';

export interface UserAttributes {
	id: number;
	username: string;
	email: string;
	password?: string;
	avatar?: string;
	status?: number;
	created_at: Date;
	updated_at: Date;
	deleted_at?: Date;
}

export interface AuthAttributes {
	email: string;
	password: string;
	remember?: boolean;
}

export interface UserPayload extends Pick<AuthAttributes, 'email'>, JwtPayload {
	id: number;
	username: string;
	avatar: string;
	expires?: string | number;
}
