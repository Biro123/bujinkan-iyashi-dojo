###Boilerplate project
With MongoDB, userfront, materualUI

##External services: 
userfront.com
mongodb Atlas


##Scripts

#Start server locally:
npm run server

#Start in prod mode
npm run start

#Start both client and server locally 
npm run dev

#Config and deploy for heroku
heroku create appname               - defines app to Heroku..
git push heroku master

Once set up, log into heroku : https://dashboard.heroku.com/apps  and add the env variables:
MONGO_URI
JWT_SECRET
INLINE_RUNTIME_CHUNK=false
APP_URL=https://appnamehere.herokuapp.com/

Note defining app may need to add buildpack --buildpack mars/create-react-app then remove or do something to add heroku repo