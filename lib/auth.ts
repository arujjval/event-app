import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';



export const login = async () => {
    const CLIENT_ID = '153720121170-9pjgbou219a5aoct6s3sjv019lv34sre.apps.googleusercontent.com';
    const REDIRECT_URI = AuthSession.makeRedirectUri({});

    const authUrl = `https://accounts.google.com/o/oauth2/v2/
                    auth?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=openid%20profile%20email`;
    const authRequest = new AuthSession.AuthRequest({
        clientId: CLIENT_ID,
        redirectUri: REDIRECT_URI,
        scopes: ['openid', 'profile', 'email'],
        responseType: AuthSession.ResponseType.Token,
    });
    const result = await authRequest.promptAsync(AuthSession.makeRedirectUri({ useProxy: true }));
    setAuthResult(result);
}