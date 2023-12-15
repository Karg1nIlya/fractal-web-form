import webpack from "webpack";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildDevServer } from "./buildDevServer";
import { buildResolvers } from "./buildResolvers";
import { IBuildOptions } from "./types/types";

export function buildWebpack(options: IBuildOptions): webpack.Configuration {
    const isDev = options.mode === 'development'

    const fileName = (ext: string) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

    console.log(options.paths.entry)

    const config: webpack.Configuration = {
        mode: options.mode ?? 'development',
        entry: options.paths.entry,
        output: {
            filename: fileName('js'),
            path: options.paths.output,
            clean: true,
            assetModuleFilename: `assets/${fileName('[ext]')}`
        },
        devtool: isDev ? 'inline-source-map' : false,
        devServer: isDev ? buildDevServer(options) : undefined, 
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
    }
    return config;
}
