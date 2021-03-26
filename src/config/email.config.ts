import { setApiKey, send } from '@sendgrid/mail';
import env from '../env';

setApiKey(env.SGRID_KEY);

const templates = {
  new_bid: env.NEW_BID_TEMPLATE,
  approved_bid: env.APPROVED_BID_TEMPLATE,
  rejected_bid: env.REJECTED_BID_TEMPLATE,
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
  try {
    await send({
      from: env.SENDER_EMAIL,
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
  try {
    await send({
      from: env.SENDER_EMAIL,
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
  try {
    await send({
      from: env.SENDER_EMAIL,
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
