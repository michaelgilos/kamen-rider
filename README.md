Backend API
----
Getting the ride requests
curl --request GET \
  --url http://localhost:1337/rides \
  --header 'Content-Type: application/json'
----

### How do I start the app?

Start with 
1 `npm install` to install the dependencies

2 `npm run start` to run the app

3 run the server `npm run server`

4 optional: create .env file add fillup EXPO_PUBLIC_GOOGLE_MAPS_APIKEY=
  to use maps direction library

NOTE: This has only been tested in android.
Before running app in android emulator or real device
1. run `adb devices`

2. List of devices attached
R58M601C0XF     device
emulator-5554   device

3. map the ports
$ adb -s emulator-5554 reverse tcp:1337 tcp:1337
$ adb -s R58M601C0XF reverse tcp:1337 tcp:1337
