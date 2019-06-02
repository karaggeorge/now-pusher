import {htm} from '@zeit/integration-utils';
import {RouteOptions} from 'now-integration';
import {authenticationCode, authenticationUserClientCode, authenticationAutoClientCode} from '../../code-snippets';


const TypeView = ({utils}: RouteOptions, type: string) => {
  const {[type]: {url, user} = {url: '', user: false}} = utils.projectStore;

  const data = {
    ...utils.projectStore.keys,
    url
  };

  if (url) {
    return htm`
      <Fieldset>
        <FsContent>
          <FsTitle>${type === 'private' ? 'Private' : 'Presence'} Channels</FsTitle>
          <FsSubtitle>Now that ${user ? 'your' : 'the'} authenication endpoint is all set up, replace your client code with the snippet below:</FsSubtitle>
          <Code value=${encodeURIComponent(user ? authenticationUserClientCode(type, data) : authenticationAutoClientCode(type, data))}
          <BR/>
          <Box display="flex" justifyContent="flex-end" marginTop="8px">
            <Button small warning action=${`clearAuth/${type}`}>Remove Configuration</Button>
          </Box>
        </FsContent>
        <FsFooter>
          <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
            ${user ? 'Or we can generate and deploy the above endpoint for you' : 'Or you can deploy the endpoint yourself'}
            <Button small secondary action="${user ? `deployAuth/${type}` : `clearAuth/${type}`}">Generate & Deploy</Button>
          </Box>
        </FsFooter>
      </Fieldset>
    `;
  } else {
    return htm`
      <Fieldset>
        <FsContent>
          <FsTitle>${type === 'private' ? 'Private' : 'Presence'} Channels</FsTitle>
          <FsSubtitle>You'll need to deploy the following code to create an authentication endpoint:</FsSubtitle>
          <Code value=${encodeURIComponent(authenticationCode(type))}
          <BR/>
          <BR/>
          <P>Once you've deployed the code in this project, enter the relative url of the endpoint below:</P>
          <Input name=${`${type}Url`} placeholder="/pusher/auth"/>
          <Box display="flex" justifyContent="flex-end">
            <Button action=${`routeAuth/${type}`}>Save</Button>
          </Box>
        </FsContent>
        <FsFooter>
          <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
            Or we can generate and deploy the above endpoint for you
            <Button small secondary action=${`deployAuth/${type}`}>Generate & Deploy</Button>
          </Box>
        </FsFooter>
      </Fieldset>
    `;
  }
}

export default TypeView;
