export interface IGetInTouchEmailRequest {
	email: string;
	subject: string;
	message: string;
}

export interface IEmailResonse {
	status: 'ok' | 'error';
	error?: string;
	message?: string;
}
