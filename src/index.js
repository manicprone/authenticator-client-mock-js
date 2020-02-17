import objectUtils from './utils/object-utils';

const mockUserInfo = {
  id: null,
  username: null,
  display_name: null,
  avatar_url: null,
};

const mockAuth = {
  auth_token: null,
  expires_at: null,
};

export default class MockAuthenticator {
  constructor(options) {
    this.debug = objectUtils.get(options, 'debug', false);
    this.ttl = (options.ttl && !isNaN(options.ttl)) ? Number(options.ttl) : 0;
    this.uuidMode = objectUtils.get(options, 'uuidMode', false);
    this.state = {
      user_info: Object.assign({}, mockUserInfo),
      auth: Object.assign({}, mockAuth),
    };
  }

  authenticateUser(creds = {}) {
    return new Promise((resolve, reject) => {
      if (!creds.username) return reject({});

      // Mutate mock state...
      this.state.user_info.id = (this.uuidMode) ? creds.username : creds.username.length;
      this.state.user_info.username = (this.uuidMode) ? creds.username.slice(0, 8) : creds.username;
      this.state.user_info.display_name = (this.uuidMode) ? creds.username.slice(0, 8) : creds.username;
      this.state.user_info.avatar_url = generateAvatarURL(creds.username);

      // Generate token...
      const token = `token-${new Date().getTime()}`;
      this.state.auth.auth_token = token;
      let expiresAt = null;
      if (this.ttl === 0) expiresAt = Date.now();
      if (this.ttl > 0) expiresAt = Date.now() + this.ttl;
      this.state.auth.expires_at = expiresAt;

      // Return auth info...
      return resolve({ token, expires_at: expiresAt });
    });
  }

  fetchUserInfo(token) {
    const activeToken = token || this.state.auth.auth_token;
    if (!activeToken || !this.state.user_info.id) return Promise.reject({});
    return new Promise((resolve) => {
      return resolve({ ...this.state.user_info });
    });
  }

  expireUser(token) {
    const activeToken = token || this.state.auth.auth_token;
    if (!activeToken) return Promise.reject({});
    return new Promise((resolve) => {
      this.resetState();
      return resolve({});
    });
  }

  resetState() {
    this.state = {
      user_info: Object.assign({}, mockUserInfo),
      auth: Object.assign({}, mockAuth),
    };
  }
}

function generateAvatarURL(username = '') {
  switch (username) {
    case '|M|': return 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Dopamine.svg/2000px-Dopamine.svg.png';
    default: return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTenyQCcge4mKO5_BdFvT9gwC80tM1NTFv7kHCYWmUxF-D6-Bs8';
  }
}
