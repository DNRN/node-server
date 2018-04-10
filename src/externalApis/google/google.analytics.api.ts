import * as request from 'request-promise';

export class GoogleAnalytisApi {

    public static getAccounts(token: string) {
        return request({
            "method":"GET", 
            "uri": 'https://www.googleapis.com/analytics/v3/management/accounts',
            "json": true,
            "headers": {
                "Authorization": "Bearer " + token,
            }
          });
    }

}