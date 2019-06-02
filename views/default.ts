import {htm} from '@zeit/integration-utils';
import {RouteOptions} from 'now-integration';
import applyMainLayout from './layout';

import UsageView from './usage';
import AuthenticationView from './authentication';

const DefaultView = (options: RouteOptions) => applyMainLayout(options, htm`
  <Box width="100%" display="flex" flexDirection="column">
    ${UsageView(options)}
    <BR/>
    ${AuthenticationView(options)}
  </Box>
`);

export default DefaultView;
