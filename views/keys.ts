import {htm} from '@zeit/integration-utils';
import {RouteOptions} from 'now-integration';
import applyMainLayout from './layout';

const KeysView = (options: RouteOptions) => applyMainLayout(options, htm`
  <Box marginTop="20px" display="flex" flexDirection="column" alignItems="center" textAlign="center">
    <P>
      This integration connects your ZEIT project with your Pusher App
      <BR/>
      <BR/>
      To connect your Pusher App, visit your app's page from your <Link href="https://dashboard.pusher.com" target="_blank">Pusher dashboard</Link>, select the <B>App Keys</B> page and paste the credentials below:
    </P>
    <BR/>
    <BR/>
    <Textarea
      width="320px"
      height="120px"
      name="keys"
      placeholder=${`
app_id = ”794307”
key = ”my-key”
secret = ”my-secret”
cluster = ”us2”
      `.trim()}
    />
    <BR/>
    <Button shadow highlight action="setKeys">Connect</Button>
  </Box>
`);

export default KeysView;
