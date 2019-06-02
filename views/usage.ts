import {htm} from '@zeit/integration-utils';
import {RouteOptions} from 'now-integration';
import {nodeCode, javascriptCode} from '../code-snippets';

const UsageView = ({utils}: RouteOptions) => {
  const {keys} = utils.projectStore;

  return htm`
    <H1>Using Pusher</H1>
    <Fieldset>
      <FsContent>
        <FsTitle>Server</FsTitle>
        <P>Add the pusher package to your project</P>
        <Code value=${encodeURIComponent('$ yarn add pusher')}/>
        <BR/>
        <P>Then, add the code below to your server</P>
        <Code lang="syntax" value=${encodeURIComponent(nodeCode)}/>
        <BR/>
        <P>The <Link href="https://github.com/pusher/pusher-http-node" target="_blank">docs</Link> contain more information on how to use the client</P>
      </FsContent>
      <FsFooter>
        The environment variables used above have already been added to your project
      </FsFooter>
    </Fieldset>
    <Fieldset>
      <FsContent>
        <FsTitle>Client</FsTitle>
        <P>Add the pusher package to your project</P>
        <Code value=${encodeURIComponent('$ yarn add pusher-js')}/>
        <P>or</P>
        <Code value=${encodeURIComponent('<script src="https://js.pusher.com/4.4/pusher.min.js"></script>')}/>
        <BR/>
        <P>Then, add the code below to your client</P>
        <Code lang="syntax" value=${encodeURIComponent(javascriptCode(keys))}/>
        <BR/>
        <P>The <Link href="https://pusher.com/docs/channels/getting_started/javascript" target="_blank">docs</Link> contain more information on how to use the client</P>
      </FsContent>
    </Fieldset>
  `;
};

export default UsageView;
