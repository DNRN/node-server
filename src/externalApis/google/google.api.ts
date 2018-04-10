const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
    '1031872907117-mgo97pobfahl7fian7us1nkfdg3bl2ju.apps.googleusercontent.com',
    'VeXLon01Y45CS7pLLW8p3efn',
    'https://test.entropyfox.com/oauth2callback'
);

export class GoogeApi {

    public static GetToken(code: string): Promise<any> {
        return new Promise<any>((resolve: any, reject: any) => {
            oauth2Client.getToken(code, (err: any, tokens: any) => {
                // Now tokens contains an access_token and an optional refresh_token. Save them.
                if (!err) {
                    oauth2Client.setCredentials(tokens);
                    console.log(tokens);
                    resolve(tokens);
                } else {
                    reject(err);
                }
            });
        });
    }

    public static AnalyticsUrl(): string {
        // generate a url that asks permissions for analytics scopes
        const scopes = [
            'https://www.googleapis.com/auth/analytics'
        ];

        return oauth2Client.generateAuthUrl({
            // 'online' (default) or 'offline' (gets refresh_token)
            access_type: 'offline',

            // If you only need one scope you can pass it as a string
            scope: scopes,

            // Optional property that passes state parameters to redirect URI
            // state: 'foo'
        });
    }



}

