import Integration from 'now-integration';
import deployAuthEndpoint from '../utils/deploy-authentication-endpoint';

export default (app: Integration) => {
  app.use('deployAuth/:type', async (options, next) => {
    const {utils} = options;
    // private or presence
    const {type} = utils.params;

    let url = utils.projectStore.deploymentUrl;

    if (!url) {
      try {
        const deployment = await deployAuthEndpoint(options);
        url = deployment.url;
        utils.projectStore.deploymentUrl = url;
      } catch (error) {
        console.log('Got error', error);
        next();
      }
    }

    utils.projectStore[type] = {url, user: false};

    await utils.saveStore();

    next();
  });

  app.use('routeAuth/:type', async ({utils}, next) => {
    // private or presence
    const {type} = utils.params;

    const url = utils.get<string>(`${type}Url`);

    utils.projectStore[type] = {url, user: true};

    await utils.saveStore();

    next();
  });

  app.use('clearAuth/:type', async ({utils}, next) => {
    // private or presence
    const {type} = utils.params;

    delete utils.projectStore[type];

    if (!utils.projectStore.private && !utils.projectStore.presence) {
      delete utils.projectStore.deploymentUrl;
    }

    await utils.saveStore();

    next();
  });
};
