import path from 'path';
import webpack from 'webpack';
import clientConfig from './full-stack/client/webpack.config';
import serverConfig from './full-stack/server/webpack.config';
import { EnvVariables } from './cfg/build/types/types';

export default (env: EnvVariables) => {
  const configClient: webpack.Configuration = clientConfig(env);
  const configServer: webpack.Configuration = serverConfig(env);
  return [configClient, configServer];
};
