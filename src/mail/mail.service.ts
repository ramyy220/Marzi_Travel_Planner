import { Injectable } from '@nestjs/common';
const Mailjet = require('node-mailjet');
import { ContactDto } from '../auth/dto/ContactDto';
	
@Injectable()
export class MailService {

  async SendSignupMailConfirmation(userEmail: string) {
    const mailjet = new Mailjet({
		apiKey: process.env.MJ_APIKEY_PUBLIC,
		apiSecret: process.env.MJ_APIKEY_PRIVATE
	  });
	
    const request = mailjet
	.post("send", {'version': 'v3.1'})
	.request({
		"Messages":[
				{
						"From": {
								"Email": "ramyamr70@gmail.Com",
								"Name": "Ramy AMRANI"
						},
						"To": [
								{
										"Email": userEmail,
								}
						],
						"Subject": 'Signup confirmation',
            "HTMLPart": '<h3>Hello, thank you for signing up</h3>',
				}
		]
	})
  request
	.catch((err) => {
		console.log(err.statusCode)
	})
  }
  

  async SendForgotPasswordMail(userEmail: string, code: string, url: string) {
	const mailjet = new Mailjet({
		apiKey: process.env.MJ_APIKEY_PUBLIC,
		apiSecret: process.env.MJ_APIKEY_PRIVATE
	  });
	
	const request = mailjet.post('send', { version: 'v3.1' }).request({
	  "Messages": [
		{
		  "From": {
			"Email": 'ramyamr70@gmail.com',
			"Name": 'Ramy AMRANI'
		  },
		  "To": [
			{
			  "Email": userEmail
			}
		  ],
		  "Subject": 'Reset password',
		  "HTMLPart": `<h3>Hello, click on the link to reset your password</h3><a href="${url}">Reset password</a><p><strong>Code: ${code}</strong></p><p>Code will expire in 10 minutes</p>`
		}
	  ]
	});
	
	// Attendre la réponse de l'envoi du mail
	const response = await request;
	console.log(response.body);
  }

  async sendContactEmail(contactDto: ContactDto) {
	const { name, email, message } = contactDto;
	const mailjet = new Mailjet({
	  apiKey: process.env.MJ_APIKEY_PUBLIC,
	  apiSecret: process.env.MJ_APIKEY_PRIVATE
	});
  
	const request = mailjet.post("send", {'version': 'v3.1'}).request({
	  "Messages":[
		{
		  "From": {
			"Email": "ramyamr70@gmail.com",
			"Name": "Ramy AMRANI"
		  },
		  "To": [
			{
			  "Email": "ramyamr70@gmail.com",  
			  "Name": "Support"
			}
		  ],
		  "Subject": 'New Contact Message',
		  "HTMLPart": `<h3>You have a new contact message from: ${name} (${email})</h3><p>${message}</p>`
		}
	  ]
	});
  
	const response = await request;
	console.log(response.body);
	return { message: 'Contact email sent successfully' };
  }
}