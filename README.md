# Payload Examples Using FusionAuth

The best way to run these examples is to change into the correct directory for example

```sh
cd payload-cms
```

## Run Example

Each example will have a `docker-compose.yml` which will have the setup to create

1. Postgres DB
2. Elastic search (for FusionAuth)
3. FusionAuth
4. Payload (running in a Node environment looking for code changes locally)

In this example for local development the same Postgres instance is used for both FusionAuth and Payload.

Run the example with the below code.

```sh
docker compose up -d 
```
If at any point you want to start over run the below code which will remove all the created volumes.

```sh
docker compose down -v
```

## Access FusionAuth

FusionAuth will be running at http://localhost:9011/. Because this used a kickstart it has the necessary application and users setup.

Login using 
Email: `admin@example.com`
Password: `password`

## Access Payload

Paylod will utilize the FusionAuth Application for Authentication.

You can find an example on how to configure the `auth.strategies` in `payload-cms/src/collections/Users.ts` it should have something similar to the below configuration.

```ts
OAuth2Strategy({
    authorizationURL: 'http://localhost:9011/oauth2/authorize',
    tokenURL: 'http://localhost:9011/oauth2/token',
    clientID: 'e9fdb985-9173-4e01-9d73-ac2d60d1dc8e',
    clientSecret: 'super-secret-secret-that-should-be-regenerated-for-production',
    callbackURL: 'http:localhost:3000/auth/provider/callback',
},
```

TODO: Keep adding to this once it is working see Discord https://discord.com/channels/967097582721572934/1170948154007506955/1170948154007506955