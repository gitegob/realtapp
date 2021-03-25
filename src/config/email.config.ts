import { InternalServerErrorException } from '@nestjs/common';
import { setApiKey, send } from '@sendgrid/mail';
import env from '../env';

setApiKey(env.SGRID_KEY);

const templates = {
  verification: 'd-b9ee24be898d443397f49384b9c16b5b',
  new_bid: '',
  approved: '',
};

/** Send Email
 *
 * @param to the receiver
 * @param template template name
 * @param data template data
 * @returns
 */
export const sendEmail = async (to: string, template: string, data: any) => {
  try {
    await send({
      from: env.SENDER_EMAIL,
      subject: 'Verify your Email',
      templateId: templates[template],
      personalizations: [
        {
          to,
          dynamicTemplateData: { ...data },
        },
      ],
    });
    return 200;
  } catch (err) {
    return 500;
  }
};
