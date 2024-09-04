import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// scroll bar
//import 'simplebar/src/simplebar.css';

// third-party
import { Provider as ReduxProvider } from 'react-redux';

// apex-chart
import './assets/third-party/apex-chart.css';

// project import
import App from './App';
import { store } from './store';
import reportWebVitals from './reportWebVitals';
import { Amplify, Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';

Amplify.configure({
    Auth: {
        identityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID,
        region: process.env.REACT_APP_AWS_REGION,
        identityPoolRegion: process.env.REACT_APP_AWS_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
        mandatorySignIn: false,
        signUpVerificationMethod: 'code', // 'code' | 'link'
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    },
    aws_appsync_graphqlEndpoint: process.env.REACT_APP_APPSYNC_CUSTOM_GRAPHQL_ENDPOINT, // (optional) - AWS AppSync CUSTOM endpoint
    aws_appsync_authenticationType: process.env.REACT_APP_APPSYNC_AUTHENTICATION_TYPE, // (optional) - Primary AWS AppSync authentication type
    aws_appsync_region: process.env.REACT_APP_APPSYNC_IAM_REGION, // (optional) - Custom IAM region

    ////////////////////////
    ///IDTOKEN WORKAROUND/// https://github.com/aws-amplify/amplify-swift/issues/780
    ////////////////////////

    API: {
        graphql_headers: async () => {
            try {
                const session = await Auth.currentSession();
                console.log('got a tokenx');
                return {
                    Authorization: session.getIdToken().getJwtToken()
                };
            } catch (e) {
                //if no session then use unauthenticated IAM role for limited graphql access
                try {
                    await Auth.currentCredentials();
                    console.log(Auth.getIdToken);
                    //console.log('okokoko');
                    //return { Authorization: creds.sessionToken };
                } catch (e) {
                    console.log(e);
                }
                //console.log('No Session', e);
            }
        }
    }
});

let res = await Auth.currentCredentials();
console.log(res);

//Apollo
const url = process.env.REACT_APP_APPSYNC_CUSTOM_GRAPHQL_ENDPOINT;
const region = process.env.REACT_APP_AWS_REGION;
const auth = {
    type: process.env.REACT_APP_APPSYNC_AUTHENTICATION_TYPE,
    //apiKey: appSyncConfig.aws_appsync_apiKey,
    jwtToken: async () => {
        try {
            const session = await Auth.currentSession();
            return session.getIdToken().getJwtToken();
        } catch (e) {
            console.log(e);
        }
    }
};
const httpLink = new HttpLink({ uri: url });
const link = ApolloLink.from([createAuthLink({ url, region, auth }), createSubscriptionHandshakeLink({ url, region, auth }, httpLink)]);
const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

//Amplify.Logger.LOG_LEVEL = 'VERBOSE';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <Authenticator.Provider>
        <ApolloProvider client={client}>
            <ReduxProvider store={store}>
                <BrowserRouter basename="/">
                    <App />
                </BrowserRouter>
            </ReduxProvider>
        </ApolloProvider>
    </Authenticator.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
