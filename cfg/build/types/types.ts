export type BuildMode = 'development' | 'production';

export interface EnvVariables {
  mode: BuildMode;
  port: number;
}

export interface BuildPaths {
  entry: { [key: string]: string };
  output: string;
  html?: string;
  src: string;
}
export interface BuildOptions {
  port: number;
  paths: BuildPaths;
  mode: BuildMode;
}
