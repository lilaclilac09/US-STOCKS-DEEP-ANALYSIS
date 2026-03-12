import { Resend } from 'resend';

const resend = new Resend(process.env.VITE_RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).end();

  const { alert, stockData } = req.body;

  await resend.emails.send({
    from: 'US Stocks Alert <alert@yourdomain.com>',
    to: ['your-email@example.com'],           // ← 改成你的邮箱
    subject: `🚨 ${alert.symbol} 警报触发！`,
    html: `
      <h2>${alert.symbol} 已触发警报</h2>
      <p>类型：${alert.type}</p>
      <p>目标：${alert.target}</p>
      <p>当前价格：${stockData.currentPrice}</p>
      <p>时间：${new Date().toLocaleString()}</p>
    `,
  });

  res.status(200).json({ success: true });
}
