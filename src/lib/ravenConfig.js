import Raven from 'raven-js';

const sentry_key = 'f4d92bcfa4934415ac0ca6fb9a81d073';
const sentry_app = '123206';
export const sentry_url = `https://${sentry_key}@app.getsentry.com/${sentry_app}`;

export function logException(ex, context) {
  Raven.captureException(ex, {
    extra: context
  });
  /*eslint no-console:0*/
  window && window.console && console.error && console.error(ex);
}
