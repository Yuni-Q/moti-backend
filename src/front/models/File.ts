import API from '../utils/API';

export default class File {
	protected static readonly api: API = new API('/api');

	id?: number;

	cardUrl?: string;

	cardSvgUrl?: string;

	cardPngUrl?: string;

	part?: number;

	createdAt?: Date;

	updatedAt?: Date;
}
