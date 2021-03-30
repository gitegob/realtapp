import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setApiKey, send } from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor(private config: ConfigService) {}
  templates = {
    newBid: this.config.get('email.newBidTemplate'),
    approvedBid: this.config.get('email.approvedBidTemplate'),
    rejectedBid: this.config.get('email.rejectedBidTemplate'),
  };

  /** Send new bid Email
   *
   * @param to the receiver
   * @param data template data
   * @returns
   */
  async sendNewBidEmail(
    to: string,
    data: any,
  ): Promise<HttpStatus.OK | HttpStatus.INTERNAL_SERVER_ERROR> {
    return await this.sendEmail(to, 'newBid', data);
  }

  /** Send approved bid Email
   *
   * @param to the receiver
   * @param data template data
   * @returns
   */
  async sendApprovedEmail(
    to: string,
    data: any,
  ): Promise<HttpStatus.OK | HttpStatus.INTERNAL_SERVER_ERROR> {
    return await this.sendEmail(to, 'approvedBid', data);
  }

  /** Send approved bid Email
   *
   * @param to the receiver
   * @param data template data
   * @returns
   */
  async sendRejectedEmail(
    to: string,
    data: any,
  ): Promise<HttpStatus.OK | HttpStatus.INTERNAL_SERVER_ERROR> {
    return await this.sendEmail(to, 'rejectedBid', data);
  }

  /** Send an Email
   *
   * @param to the receiver
   * @param data template data
   * @returns
   */
  private async sendEmail(
    to: string,
    template: string,
    data: any,
  ): Promise<HttpStatus.OK | HttpStatus.INTERNAL_SERVER_ERROR> {
    setApiKey(this.config.get('email.apiKey'));

    try {
      await send({
        from: this.config.get('email.sender'),
        templateId: this.templates[template],
        personalizations: [
          {
            to,
            dynamicTemplateData: { ...data },
          },
        ],
      });
      return HttpStatus.OK;
    } catch (err) {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
