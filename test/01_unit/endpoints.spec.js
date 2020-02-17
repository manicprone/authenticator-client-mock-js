import { expect } from 'chai';
import MockClient from '../../src';

describe('MOCK ENDPOINTS', () => {

  describe('authenticateUser', () => {
    it('should prepare the instance according to the provided creds', () => {
      const clientCredsBasic = new MockClient({ ttl: 3000 });
      const clientCredsUUID = new MockClient({ ttl: 3000, uuidMode: true });

      const credsBasic = {
        username: 'fakeuser',
        password: 'not-used',
      };
      const credsUUID = {
        username: '385954C0-F844-4310-AEF2-D60F7E70F846',
        password: null,
      };

      const withCredsBasic = clientCredsBasic.authenticateUser(credsBasic)
        .then(() => {
          const stateUserInfo = clientCredsBasic.state.user_info || {};
          expect(stateUserInfo).to.deep.equal({
            id: 8,
            username: credsBasic.username,
            display_name: credsBasic.username,
            avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTenyQCcge4mKO5_BdFvT9gwC80tM1NTFv7kHCYWmUxF-D6-Bs8',
          });
        });

      const withCredsUUID = clientCredsUUID.authenticateUser(credsUUID)
        .then(() => {
          const stateUserInfo = clientCredsUUID.state.user_info || {};
          expect(stateUserInfo).to.deep.equal({
            id: '385954C0-F844-4310-AEF2-D60F7E70F846',
            username: '385954C0',
            display_name: '385954C0',
            avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTenyQCcge4mKO5_BdFvT9gwC80tM1NTFv7kHCYWmUxF-D6-Bs8',
          });
        });

      return Promise.all([
        withCredsBasic,
        withCredsUUID,
      ]);
    });

    it('should recognize the M sign', () => {
      const client = new MockClient({ ttl: 3000 });
      const creds = {
        username: '|M|',
      };

      return client.authenticateUser(creds)
        .then(() => {
          const stateUserInfo = client.state.user_info || {};
          expect(stateUserInfo).to.deep.equal({
            id: 3,
            username: creds.username,
            display_name: creds.username,
            avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Dopamine.svg/2000px-Dopamine.svg.png',
          });
        });
    });

    it('should return an object with a generated token and expiration timestamp', () => {
      const client = new MockClient({ ttl: 3000 });
      const creds = {
        username: 'fakeuser',
        password: 'not-used',
      };

      return client.authenticateUser(creds)
        .then((payload) => {
          expect(payload).to.have.keys(['token', 'expires_at']);

          const expiresAtAsString = (payload.expires_at) ? payload.expires_at.toString() : '';
          expect(expiresAtAsString.length).to.equal(13); // timestamp with millis precision
        });
    });
  });

}); // END - MOCK ENDPOINTS
