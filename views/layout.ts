import {htm} from '@zeit/integration-utils';
import {RouteOptions} from 'now-integration';

import {LOGO} from '../constants';

const applyMainLayout = (options: RouteOptions, View: any) => htm`
  <Page>
    <Box width="100%" display="flex" flexDirection="column" minHeight="100%">
      <Box width="100%" display="flex" justifyContent="space-between" marginBottom="40px">
        <ProjectSwitcher/>
        ${options.utils.projectStore.keys ? htm`<P>Click <Link action="resetKeys">here</Link> to change your keys</P>` : ''}
      </Box>
      <Box flexGrow="1" width="100%" display="flex" flexDirection="column" alignItems="center">
        <Img src=${LOGO} width="240"/>
        <BR/>
        ${View}
      </Box>
      <Box marginTop="20px" display="flex" justifyContent="center">
        <P>Built with ❤️ by <Link href="https://github/karaggeorge" target="_blank">George Karagkiaouris</Link> for the ZEIT Hackathon</P>
      </Box>
    </Box>
  </Page>
`;

export default applyMainLayout;
