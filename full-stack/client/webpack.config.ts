import path from 'path';
import webpack from 'webpack';
import { BuildPaths, EnvVariables } from '../../cfg/build/types/types';
import { buildClientWebpack } from '../../cfg/build/buildWebpack';

const clientConfig = (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, '../../build', 'client'),
    entry: { client: path.resolve(__dirname, 'src', 'client.tsx') },
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
  };
  const config: webpack.Configuration = buildClientWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? 'development',
    paths,
  });
  return config;
};

export default clientConfig;
