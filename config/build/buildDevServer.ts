import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { IBuildOptions } from './types/types';

export function buildDevServer(options: IBuildOptions): DevServerConfiguration {
    return {
        port: options.port ?? 3000,
        open: true,
        historyApiFallback: true, // если делать статику через nginx, то надо делать проксирование на index.html (а так действует только через devServer)
        liveReload: true,
        // hot: true, // обновляет снраницу без ее перезагрузки
    }
}