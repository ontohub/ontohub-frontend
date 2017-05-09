import {
  authenticateSession
} from 'ontohub-frontend/tests/helpers/ember-simple-auth';

export function signIn(application, username = 'ada') {
  const userTokenData = btoa(`{"user_id":"${username}","exp":1493192602}`);

  authenticateSession(application, {
    data: {
      id: 'authenticationtoken',
      type: 'authentication_tokens',
      attributes: {
        // eslint-disable-next-line max-len
        token: `eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.${userTokenData}._vLn9KCMOfhTls26mRW_3Z322UmxsIidzLiE7uPJGCpTf_NluBiWbXCe-6ifyloR61VKjJU4kwF4-4-zEasSPw`
      }
    },
    jsonapi: { version: '1.0' }
  });
}