# Welcome to your Swifty Companion 👋

Swifty Companion is a mobile application designed specifically for students at 42. Built with Expo and leveraging the powerful Gluestack UI components, this app makes it easy to connect with 42 peers, track their progress and cursus.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Create environment file

   ```bash
    touch .env
   ```

3. Start the app
   1. Normal mode

   ```bash
    npx expo start
   ```

   2. Tunnel mode - mainly for 42 school

   ```bash
    npx expo start --tunnel
   ```

4. Change the `REDIRECT_URI` in

- Swifty Companinon API applications in 42 intra settings
- .env API repository

## Network & Environment

- If you’re using your device with Expo Go as a demo, make sure your phone is connected to the same Wi-Fi network as your computer. Check your computer’s IP address—that will be used as your API_URL.

The .env should be:

```env
EXPO_PUBLIC_API_URL=http://[IPAddress]:3000
```

(Replace [IPAddress] with your computer’s actual IP address.)

## Documentation

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo
- [Gluestack](https://gluestack.io/ui/docs/home/overview/quick-start)