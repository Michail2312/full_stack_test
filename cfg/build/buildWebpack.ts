import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildClientPlugins, buildServerPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/types';

export function buildClientWebpack(
  options: BuildOptions
): webpack.Configuration {
  const { mode, paths } = options;
  const isDev = mode === 'development';
  return {
    mode: mode ?? 'development',
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: '[name].[contenthash].js',
      clean: true,
    },
    plugins: buildClientPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devServer: isDev ? buildDevServer(options) : undefined,
    devtool: isDev && 'inline-source-map',
  };
}

export function buildServerWebpack(
  options: BuildOptions
): webpack.Configuration {
  const { mode, paths } = options;
  const isDev = mode === 'development';
  return {
    mode: mode ?? 'development',
    target: 'node',
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: '[name].js',
      clean: true,
    },
    externals: {
      express: "require('express')",
    },
    plugins: buildServerPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devtool: isDev && 'inline-source-map',
  };
}
