import { IncomingMessage } from 'http';
import API from '../utils/API';
import File from './File';
import Mission from './Mission';
import User from './User';

export default class Answer {
	protected static readonly api: API = new API('/api');

	id?: number;

	userId?: number;

	missionId?: number;

	fileId?: number;

	imageUrl?: string;

	content?: string;

	date?: string;

	setDate?: string;

	no?: number;

	file?: File;

	mission?: Mission;

	user?: User;

	createdAt?: Date;

	updatedAt?: Date;

	public static postAnswers({
		formData,
		token,
		req,
	}: {
		formData: FormData;
		token: string;
		req?: IncomingMessage;
	}): Promise<void> {
		return this.api.post(`/v1/answers/`, formData, {
			headers: { Authorization: token, 'Content-Type': 'multipart/form-data' },
			extra: { req },
		});
	}

	public static putAnswersId({
		formData,
		answer,
		token,
		req,
	}: {
		formData: FormData;
		answer: Answer;
		token: string;
		req?: IncomingMessage;
	}): Promise<void> {
		return this.api.put(`/v1/answers/${answer.id}`, formData, {
			headers: { Authorization: token, 'Content-Type': 'multipart/form-data' },
			extra: { req },
		});
	}

	public static getAnswersId({
		id,
		token,
		req,
	}: {
		id: string;
		token: string;
		req?: IncomingMessage;
	}): Promise<Answer> {
		return this.api.get(
			`/v1/answers/${id}`,
			{},
			{
				headers: { Authorization: token },
				extra: { req },
			},
		);
	}

	public static getAnswersWeek({
		token,
		req,
	}: {
		token: string;
		req?: IncomingMessage;
	}): Promise<{ answers: Answer[]; today: string }> {
		return this.api.get(
			`/v1/answers/week`,
			{},
			{
				headers: { Authorization: token },
				extra: { req },
			},
		);
	}

	public static getAnswersList({
		token,
		id,
		req,
	}: {
		token: string;
		id?: number;
		req?: IncomingMessage;
	}): Promise<Answer[][]> {
		return this.api.get(
			`/v1/answers/list`,
			{ answerId: id },
			{
				headers: { Authorization: token },
				extra: { req },
			},
		);
	}

	public static getAnswersListId({
		token,
		id,
		req,
	}: {
		token: string;
		id: number;
		req?: IncomingMessage;
	}): Promise<Answer[]> {
		return this.api.get(
			`/v1/answers/list/${id}`,
			{},
			{
				headers: { Authorization: token },
				extra: { req },
			},
		);
	}
}
