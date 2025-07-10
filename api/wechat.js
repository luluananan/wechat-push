// api/wechat.js
import crypto from 'crypto';

export default function handler(req, res) {
  const TOKEN = 'testtoken';

  const { signature, timestamp, nonce, echostr } = req.query;

  if (!signature || !timestamp || !nonce || !echostr) {
    return res.status(400).send('Missing required query parameters');
  }

  const hash = crypto
    .createHash('sha1')
    .update([TOKEN, timestamp, nonce].sort().join(''))
    .digest('hex');

  if (hash === signature) {
    res.status(200).send(echostr);
  } else {
    res.status(403).send('Invalid signature');
  }
}
