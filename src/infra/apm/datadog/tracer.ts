// import { DISABLE_DATADOG, ENV } from '@src/conf';
// eslint-disable-next-line import/no-extraneous-dependencies
import tracer from 'dd-trace';
import { name, version } from '../../../../package.json';

const ENV = process.env.NODE_ENV;
tracer.init({
  // debug: (ENV === 'dev'),
  logInjection: true,
  // analytics: true,
  service: name,
  env: ENV,
  version,
  // enabled: true,
  // trackAsyncScope: false,
  plugins: false,
});

export default tracer;
