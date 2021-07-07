import { NextApiRequest, NextApiResponse } from 'next';
import webpush from 'web-push';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'POST') {
    try {
      const sub = req.body;
      console.log(req.body);
      const pushConfig = {
        endpoint: sub.endpoint,
        keys: {
          auth: sub.keys.auth,
          p256dh: sub.keys.p256dh,
        },
      };

      webpush.setVapidDetails('mailto:lyh6425@gmail.com', process.env.PUSH_PUBLIC_KEY!, process.env.PUSH_PRIVATE_KEY!);

      // push server에 message send
      webpush
        .sendNotification(
          pushConfig,
          JSON.stringify({
            title: '새로운 방명록',
            context: '글',
          }),
        )
        .catch((err) => {
          console.error(err);
        });
      res.status(200).json({ post: '글' });
    } catch (error) {
      console.log(error);
    }
  }
};
