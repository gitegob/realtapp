import { setApiKey, send } from '@sendgrid/mail';
import env from '../env';

setApiKey(env.SGRID_KEY);

const templates = {
  new_bid: 'd-86ac7139e57c4016809452422a270e76',
  approved_bid: 'd-ac4d7faa7e464c8998268210c161cfc1',
  rejected_bid: 'd-256c09c5660b40fbacff4fb5c1d1000d',
};

/** Send new bid Email
 *
 * @param to the receiver
 * @param template template name
 * @param data template data
 * @returns
 */
export const sendNewBidEmail = async (
  to: string,
  template: string,
  data: any,
) => {
  if (env.NODE_ENV === 'production') {
    try {
      await send({
        from: env.SENDER_EMAIL,
        subject: 'New Bid Alert',
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
  } else return Promise.resolve(200);
};

/** Send approved bid Email
 *
 * @param to the receiver
 * @param template template name
 * @param data template data
 * @returns
 */
export const sendApprovedEmail = async (
  to: string,
  template: string,
  data: any,
) => {
  if (env.NODE_ENV === 'production') {
    try {
      await send({
        from: env.SENDER_EMAIL,
        subject: 'Your bid has been approved!',
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
  } else return Promise.resolve(200);
};

/** Send rejected bid Email
 *
 * @param to the receiver
 * @param template template name
 * @param data template data
 * @returns
 */
export const sendRejectedEmail = async (
  to: string,
  template: string,
  data: any,
) => {
  if (env.NODE_ENV === 'production') {
    try {
      await send({
        from: env.SENDER_EMAIL,
        subject: 'Your bid has been rejected!',
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
  } else return Promise.resolve(200);
};
