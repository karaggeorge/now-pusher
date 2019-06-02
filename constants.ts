
export const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://pusher.now.sh' : 'http://localhost:5005';
export const LOGO = `${BASE_URL}/static/PusherLogo.svg`;

export const ENV_VARS = [
  {envName: 'PUSHER_APP_ID', secretName: 'pusher_app_id', key: 'app_id'},
  {envName: 'PUSHER_KEY', secretName: 'pusher_key', key: 'key'},
  {envName: 'PUSHER_SECRET', secretName: 'pusher_secret', key: 'secret'},
  {envName: 'PUSHER_CLUSTER', secretName: 'pusher_cluster', key: 'cluster'},
];
