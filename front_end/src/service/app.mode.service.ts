export class AppModeService {
    public static get isDevelopmentMode() {
        return location.port === '4200';
    }
}
