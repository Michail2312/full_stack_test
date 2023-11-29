import path from 'path';
import webpack from 'webpack';

import { BuildPaths, EnvVariables } from '../../cfg/build/types/types';
import { buildServerWebpack } from '../../cfg/build/buildWebpack';


const serverConfig = (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, '../../build', 'server'),
    entry: { server: path.resolve(__dirname, 'src', 'server.ts') },
    src: path.resolve(__dirname, 'src'),
  };
  const config: webpack.Configuration = buildServerWebpack({
    port: env.port ?? 3001,
    mode: env.mode ?? 'development',
    paths,
  });
  return config;
};

export default serverConfig;
