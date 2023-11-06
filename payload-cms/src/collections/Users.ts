import { CollectionConfig } from 'payload/types'
import {Strategy as OAuth2Strategy} from 'passport-oauth2'
import { Payload } from 'payload';


const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    strategies:[{
      name: 'fusionauth',
      strategy: async (payload:Payload) => {
        return new OAuth2Strategy({
          authorizationURL: 'http://localhost:9011/oauth2/authorize',
          tokenURL: 'http://localhost:9011/oauth2/token',
          clientID: 'e9fdb985-9173-4e01-9d73-ac2d60d1dc8e',
          clientSecret: 'super-secret-secret-that-should-be-regenerated-for-production',
          callbackURL: 'http:localhost:3000/auth/provider/callback',
        },
        function(accessToken, refreshToken, profile, done) {
          payload.logger.info(accessToken)
          // User.findOrCreate(..., function(err, user) {
          //   done(err, user);
          // });
        })
        

        // return new OpenIDStrategy({
        //   returnURL: 'http:localhost:3000/auth/openid/return',
        //   realm: 'http:localhost:3000/'
        // },
        // function(identifier, done) {
        //   User.findOrCreate({ openId: identifier }, function(err, user) {
        //     done(err, user);
        //   });
        // })
      }
    }]
  },
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}

export default Users
