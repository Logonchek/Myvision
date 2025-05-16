const nodemailer = require('nodemailer');
const fetch = require('node-fetch');

// Конфигурация почты
const transporter = nodemailer.createTransvert({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

// Конфигурация Telegram
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = '@logonchek';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, phone } = JSON.parse(event.body);

    // Отправка на почту
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'logonchek@mail.ru',
      subject: 'Новая заявка с сайта',
      text: `Имя: ${name}\nТелефон: ${phone}`,
      html: `
        <h3>Новая заявка с сайта</h3>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
      `
    });

    // Отправка в Telegram
    const text = `🆕 Новая заявка!\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}`;
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'HTML'
      })
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'Internal server error' })
    };
  }
};
