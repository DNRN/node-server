const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    '1031872907117-mgo97pobfahl7fian7us1nkfdg3bl2ju.apps.googleusercontent.com',
    'VeXLon01Y45CS7pLLW8p3efn',
    'https://test.entropyfox.com/oauth2callback'
);

// generate a url that asks permissions for Google+ and Google Calendar scopes
const scopes = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/calendar'
];

const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',

    // If you only need one scope you can pass it as a string
    scope: scopes,

    // Optional property that passes state parameters to redirect URI
    // state: 'foo'
});