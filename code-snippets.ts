
export const authenticationJsonpCode = `
const { parse } = require('url')
const Pusher = require('pusher');

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  forceTLS: true
});

module.exports = (req, res) => {
  const { query } = parse(req.url, true)
  const socketId = query.socket_id;
  const channel = query.channel_name;
  const callback = query.callback;

  const auth = JSON.stringify(
    query.userId ?
      pusher.authenticate(socketId, channel, {user_id: query.userId}) :
      pusher.authenticate(socketId, channel)
  );

  const cb = callback.replace(/\"/g,"") + "(" + auth + ");";

  res.setHeader('Content-Type', 'application/javascript');
  res.end(cb);
};
`.trim();

export const authenicationPackageJson = `
{
  "name": "pusher-test",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "delay": "^4.2.0",
    "micro": "^9.3.4",
    "pusher": "^2.2.0",
    "pusher-js": "^4.4.0",
    "urlencoded-body-parser": "^2.0.1"
  }
}
`.trim();

export const authenticationCode = (type: string) => `
const parse = require('urlencoded-body-parser');
const Pusher = require('pusher');

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  forceTLS: true
});

module.exports = async (req, res) => {
  const body = await parse(req);
  res.end(JSON.stringify(pusher.authenticate(body.socket_id, body.channel_name${type === 'private' ? '' : ', {user_id: body.userId}'})));
};
`.trim();

export const javascriptCode = (data: {[key: string]: string}) => `
const pusher = new Pusher('${data.key}', {
  cluster: '${data.cluster}',
  forceTLS: true
});
`.trim();

export const nodeCode = `
const Pusher = require('pusher');

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  forceTLS: true
});
`.trim();

export const authenticationUserClientCode = (type: string, data: {[key: string]: string}) => `
const pusher = new Pusher('${data.key}', {
  cluster: '${data.cluster}',
  forceTLS: true,
  authEndpoint: '${data.url}'${type === 'private' ? '' : `,
  auth: {
    params: {
      userId: 'unique_user_id'
    }
  }`}
});
`.trim();

export const authenticationAutoClientCode = (type: string, data: {[key: string]: string}) => `
const pusher = new Pusher('${data.key}', {
  cluster: '${data.cluster}',
  forceTLS: true,
  authTransport: 'jsonp',
  authEndpoint: 'https://${data.url}'${type === 'private' ? '' : `,
  auth: {
    params: {
      userId: 'unique_user_id'
    }
  }`}
});
`.trim();
