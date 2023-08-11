import { VAL_TOWN_API_KEY } from '$env/static/private';
import type { IGetInTouchEmailRequest } from '$lib/types/email';

async function sendEmail(subject: string, message: string) {
  // TODO: validate user data

  const res = await fetch('https://api.val.town/v1/run/jakelundberg.sendEmail', {
    method: 'POST',
    headers: { Authorization: `Bearer ${VAL_TOWN_API_KEY}` },
    body: JSON.stringify({args: [subject, message]}),
  });

  const data = await res.json();

  if (data.status >= 200 && data.status < 300) {
    return { status: 'ok' };
  } else {
    return { status: 'error', error: data.error };
  }
}

export const sendGetInTouchEmail = ({ email, subject, message }: IGetInTouchEmailRequest) => {
  const emailSubject = `getInTouch request: ${subject}`;

  const emailHtml = `
    <div>${message}</div>
    <div>From: ${email}</div>`;

  return sendEmail(emailSubject, emailHtml);
};