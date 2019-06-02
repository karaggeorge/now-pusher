import Integration, {requireProject} from 'now-integration';
import DefaultView from './views/default';
import keysActions from './actions/keys';
import authenticationActions from './actions/authentication';

const app = new Integration({defaultRoute: DefaultView});

app.extend(requireProject());
app.extend(keysActions);
app.extend(authenticationActions);

export default app.handler;
