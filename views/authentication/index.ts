import {htm} from '@zeit/integration-utils';
import { RouteOptions } from 'now-integration';
import TypeView from './type';

const AuthenticationView = (options: RouteOptions) => {
  console.log(options.payload);
  return htm`
    <H1>Authenticating Users</H1>
    <P>In order to use private or presence channels you'll need the following configurations</P>
    ${TypeView(options, 'private')}
    <BR/>
    ${TypeView(options, 'presence')}
  `;
};

export default AuthenticationView;
