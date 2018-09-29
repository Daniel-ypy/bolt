import { Injectable } from '@angular/core';
import { config } from '../../config/config';
import { AppModeService } from '../service/app.mode.service';

@Injectable()
export class ConfigService {
    private static _config = config;

    public static get config() {
        return ConfigService._config;
    }

    public load(http): Promise<any> {
        if (!AppModeService.isDevelopmentMode) {
            return http.get('api/config')
                .map(res => {
                    if (!!res.json) {
                        return res.json();
                    }

                    return res;
                })
                .do(config => {
                    console.log(config);
                    ConfigService._config = config;
                })
                .toPromise();
        }

        return Promise.resolve(ConfigService._config);
    }
}
