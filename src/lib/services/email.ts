import { VAL_TOWN_API_KEY } from '$env/static/private';
import { HttpStatus } from '$lib/constants/error';
import { ApiError } from '$lib/models/ApiError';
import type { IGetInTouchEmailRequest } from '$lib/types/email';

const genericEmailErrorMessage =
	'An error occurred while sending your message. Please try again later.';

const sendEmail = async (subject: string, message: string) => {
	try {
		if (!subject || !message)
			throw new ApiError('Please provide a subject and message.', HttpStatus.BAD_REQUEST);

		const res = await fetch('https://api.val.town/v1/run/jakelundberg.sendEmail', {
			method: 'POST',
			headers: { Authorization: `Bearer ${VAL_TOWN_API_KEY}` },
			body: JSON.stringify({ args: [subject, message] })
		});

		if (res.status >= 200 && res.status < 300) {
			const data = await res.json();

			if (data.status >= 200 && data.status < 300) {
				const parsedData = JSON.parse(atob(data.body));

				if (parsedData.status !== 'ok') {
					console.log('Error sending email: ', parsedData);

					throw new ApiError(genericEmailErrorMessage, HttpStatus.SERVER);
				}
			} else {
				console.log('Error sending email | Error in val.town data response', data);

				throw new ApiError(genericEmailErrorMessage, HttpStatus.SERVER);
			}
		} else {
			console.log('Error received from val.town', res);

			throw new ApiError(genericEmailErrorMessage, HttpStatus.SERVER);
		}
	} catch (err) {
		if (err instanceof ApiError) {
			throw err;
		} else {
			console.log('Unknown error sending email: ', err);

			throw new ApiError(genericEmailErrorMessage, HttpStatus.SERVER);
		}
	}
};

export const sendGetInTouchEmail = async ({ email, subject, message }: IGetInTouchEmailRequest) => {
	try {
		// TODO: validate email address is in correct format
		// TODO: validate subject and message do not contain any malicious code

		if (!email)
			throw new ApiError('Please provide an email address.', HttpStatus.INVALID_ARG, 'email');
		if (!subject)
			throw new ApiError('Please provide a subject.', HttpStatus.INVALID_ARG, 'subject');
		if (!message)
			throw new ApiError('Please provide a message.', HttpStatus.INVALID_ARG, 'message');

		const emailSubject = `getInTouch request: ${subject}`;

		const emailHtml = `
      <div>${message}</div>
      <div>From: ${email}</div>`;

		await sendEmail(emailSubject, emailHtml);
	} catch (err) {
		if (err instanceof ApiError) {
			throw err;
		} else {
			console.log('Unknown error sending getInTouch email: ', err);
			throw new ApiError(genericEmailErrorMessage, HttpStatus.SERVER);
		}
	}
};
