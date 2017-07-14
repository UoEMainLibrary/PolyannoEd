# Installation

Install the following application on your computer locally or on your server

1. Node JS

   Make sure to install at least version 7.6, check with `node -v`

1. NPM

   Make sure to install at least version 5, check with `npm -v`

1. MongoDB

## Clone the application

```Bash
Git clone https://github.com/UoEMainLibrary/PolyannoEd.git
```

## Setting the environment variables

The project use `variables.env` file to setup basic setting that will be used on the whole application. The basic setting example is as follow

```ini
NODE_ENV=development
DATABASE=mongodb://127.0.0.1:27017/PolyannoEd
PORT=7777
SECRET=secret_this
KEY=key_this

FB_APP_ID=xxxxx
FB_APP_SECRET=xxxxx
FB_CALLBACK_URL=http://localhost:7777/login/facebook/callback

TWITTER_CONSUMER_KEY=xxxxx
TWITTER_CONSUMER_SECRET=xxxxx
TWITTER_CALLBACK_URL=http://localhost:7777/login/twitter/callback
```

If you change any of this setting restart the application to see the effect of the changes.

- NODE_ENV

    To enable development mode for the application change the **NODE_ENV** to **development** in environment.env. This will allow for a complete error stack traces on the application when the web crash.

    ```Bash
    NODE_ENV=development
    ```

    To disable development mode for the application change the **NODE_ENV** to **production** in environment.env. This will turn off the error stack traces so that general user do not have access to the web stack traces error.

    ```Bash
    NODE_ENV=production
    ```

- DATABASE

    This setting will point to the MongoDB. Change the address `127.0.0.1` and port `27017` according to the running mongodb process, this is the default address and port. The `PolyannoEd` is the database that the application will use to store its data.

- PORT

    Set this to any desired port that allowed in the server

- SECRET and KEY

    This are variables to define the session for user. You can choose any word that you want.

- FB_APP_ID and FB_APP_SECRET

    This are application number that you can get from the application instance in <https://developers.facebook.com/>

- FB_CALLBACK_URL

    Set this with the URL which the application will be hosted. **[IMPORTANT] also add this URL in the Facebook Login application**

- TWITTER_CONSUMER_KEY and TWITTER_CONSUMER_SECRET

    This are application number that you can get from the application instance in <https://apps.twitter.com/>

- TWITTER_CALLBACK_URL

    Set this with the URL which the application will be hosted. **[IMPORTANT] also add this URL in the Twitter application**

## Start the MongoDB

To run local version of MongoDB first create a folder where the database can store its data. This can be as simple as

```bash
~/MongoDB-Data
```

After you have a directory where you want to store the MongoDB database start the MongoDB Application using

```Bash
mongod --dbpath=MongoDB-Data
```

Make sure that you are in the same directory as directory which you target. The `--dbpath` use a fullpath you cannot use the tilde `~` alias.

If you want to run the MongoDB database application in the background, you can use this command

```Bash
nohup mongod --dbpath=MongoDB-Data &
```

## Populate sample archives

If this is the first time the application run. You can run this command to populate the application with some sample archives and one admin user

```Bash
npm run sample
```

If you want to run the sample again you must delete all data regarding archives and user using the following command

```Bash
npm run delete-sample
```

## Run the application

To run the web application use the following command

```Bash
npm start
```

## Run using *forever*

In Production server it is a best practice to use a process manager such as *forever* <https://www.npmjs.com/package/forever>. To use this manager we need to install it in global scope.

```Bash
npm install forever -g
```

After the *forever* application installed run the web app using this command

```Bash
forever start server.js
```

To see running application on *forever* use

```Bash
forever listall
```

To stop all of the running application on *forever* use

```Bash
forever stopall
```

Refer to the *forever* documentation for more complete usage <https://www.npmjs.com/package/forever>.