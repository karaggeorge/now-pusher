import {RouteOptions} from 'now-integration';

import {authenticationJsonpCode, authenicationPackageJson} from '../code-snippets';
import {ENV_VARS} from '../constants';

const deployAuthEndpoint = async ({payload, zeitClient, utils}: RouteOptions) => {
  const projectName = (payload as any).project.name;
  const name = `pusher-authentication-${projectName}`;
  return zeitClient.fetchAndThrow('/v9/now/deployments', {
    method: 'POST',
    data: {
      name,
      files: [
        { file: 'index.js', data: authenticationJsonpCode },
        { file: 'package.json', data: authenicationPackageJson }
      ],
      env: ENV_VARS.reduce((acc, envVar) => ({...acc, [envVar.envName]: `@${utils.projectStore.secrets[envVar.key]}`}), {}),
      version: 2,
      target: 'production',
      builds: [{src: 'index.js', use: '@now/node'}]
    }
  } as any)
};

export default deployAuthEndpoint;
