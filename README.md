# Auth Rocks UI

This Glitch app is based on the [Auth0 SPA JS Login Quickstart](https://github.com/auth0-samples/auth0-javascript-samples/tree/master/01-Login) and the [Auth0 Calling an API Quickstart](https://github.com/auth0-samples/auth0-javascript-samples/tree/master/01-Login).

It is part of the Auth Rocks developer workshop presented by [Okta](https://okta.com)

## Configuring the App

```json
{
  "domain": "{DOMAIN}",
  "clientId": "{CLIENT_ID}",
  "audience": "{API_AUDIENCE}"
}
```

### Challenge 1

Copy the {DOMAIN} and {CLIENT_ID} from the SPA app created in your tenant and paste in the **auth_config.json** file.

### Challenge 2

Copy the {API_AUDIENCE} from the API create in your tenant and paste in the **auth_config.json** file.

Uncomment `audience: config.audience` (around line 55) 

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE.txt) file for more info.

## Version

1.1 - Authorization API call
1.0 - Authentication and API connections
