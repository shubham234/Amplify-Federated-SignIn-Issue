const awsConfig = {
  Auth: {
    // Amazon Cognito Identity Pool ID
    identityPoolId: '',

    // Amazon Cognito Region
    region: 'eu-west-1',

    // Amazon Cognito User Pool ID
    userPoolId: '',

    // Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '',

    // OAuth Configuration
    oauth: {
        domain: '',
        scope: ['email', 'openid', 'aws.cognito.signin.user.admin'],
        redirectSignIn: 'example://test',
        redirectSignOut: 'example://test',
        responseType: 'code'
    }
  }
};

export default awsConfig;
