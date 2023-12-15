import { ModuleOptions } from "webpack";
import { IBuildOptions } from "./types/types";
import autoprefixer from "autoprefixer";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";

export function buildLoaders(options: IBuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === 'development'
    
    return [
        {
            test: /.(ts|js)x?$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: "ts-loader",
            
                    options: {
                        transpileOnly: isDev,
                        getCustomTransformers: () => ({
                            before: [isDev && ReactRefreshTypeScript()].filter(Boolean)
                        })
                    }
                }
            ]
            
        },

        {
            test: /\.css$/i,
            use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                autoprefixer({
                                    overrideBrowserslist:['ie >= 8', 'last 4 version']
                                })
                            ],
                        }
                    }
                }
            ]
        },

        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        },
    ]
}
