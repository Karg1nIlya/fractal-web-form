export interface IBuildPaths {
    entry: string,
    html: string,
    output: string,
    src: string,
    public: string
}

export type BuildMode = 'production' | 'development';

export interface IBuildOptions {
    port: number,
    paths: IBuildPaths,
    mode: BuildMode,
    analyzerBundles?: boolean
}