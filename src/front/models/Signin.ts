import { IncomingMessage } from 'http';
import API from '../utils/API';

export default class Signin {
	protected static readonly api: API = new API('/api');

	accessToken?: string;

	refreshToken?: string;

	signUp?: boolean;

	public static postSignin({
		accessToken,
		body,
		req,
	}: {
		accessToken: string;
		body: { snsType: string };
		req?: IncomingMessage;
	}): Promise<Signin> {
		return this.api.post(`/v1/signin/`, body, {
			headers: { Authorization: accessToken },
			extra: { req },
		});
	}

	public static postSigninRefresh({ token, req }: { token: string; req?: IncomingMessage }): Promise<Signin> {
		return this.api.post(
			`/v1/signin/refresh`,
			{},
			{
				headers: { Authorization: token },
				extra: { req },
			},
		);
	}

	public static postSigninGoogle({ code }: { code: string }): Promise<Signin> {
		return this.api.post(`/v1/signin/google`, { code });
	}
}
