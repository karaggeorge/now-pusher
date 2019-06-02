import Integration from 'now-integration';
import KeysView from '../views/keys';
import {ENV_VARS} from '../constants';

export default (app: Integration) => {
  app.use('setKeys', async ({utils, zeitClient}, next) => {
    const keysText = utils.get<string>('keys');

    if (!keysText) {
      next();
    }

    const keys = keysText.trim().split('\n').reduce((acc, keyPair) => {
      const [key, value] = keyPair.split('=').map(s => s.trim());

      return {
        ...acc,
        [key]: value.substr(1, value.length - 2)
      }
    }, {} as {[key: string]: string});

    utils.projectStore.keys = keys;
    utils.projectStore.secrets = {};

    for (const envVar of ENV_VARS) {
      const secretName = await zeitClient.ensureSecret(envVar.secretName, keys[envVar.key]);
      utils.projectStore.secrets[envVar.key] = secretName;
      await zeitClient.upsertEnv(utils.projectId, envVar.envName, secretName);
    }

    await utils.saveStore();

    next();
  });

  app.use('resetKeys', async ({utils}, next) => {
    delete utils.projectStore.keys;
    delete utils.projectStore.private;
    delete utils.projectStore.presence;
    delete utils.projectStore.deploymentUrl;
    await utils.saveStore();
    next();
  });

  app.use(async (options, next) => {
    if (options.utils.projectStore.keys) {
      next();
    } else {
      return KeysView(options);
    }
  });
}
