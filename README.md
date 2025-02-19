# Swifty Companion

Swifty Companion is a school project for 42 students that combines a mobile application with an API backend.
The mobile app, built with Expo and Gluestack UI components, makes it easy for students to get info of their 42 peers, track their progress, and monitor their cursus. Meanwhile, the Swifty Companion API interacts with the 42 API to fetch, process, and serve student data to the app.

## Overview

### Swifty Companion App

- Built with Expo & Gluestack UI:

### Swifty Companion API

- Interacts with the 42 API:
The API fetches and processes student data, including authentication, projects, skills, and cursus information.

## Repository Structure

```README
/swifty-app   - The Expo-based mobile application
/api         - The backend API service for Swifty Companion
```

## Getting Started

Prerequisites

- Node.js (v14+)
- npm or yarn
- Expo CLI (for the mobile app)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-directory>
```

2. Install the dependecies for swifty:

```bash
cd swifty
npm install
```

3. Install the dependecies for the API:

```bash
cd api
npm install
```

## Environment Configuration

### Mobile App (.env)

Create a .env file in the swifty-app directory:

```env
EXPO_PUBLIC_API_URL=http://[YourComputerIP]:3000
```

*Replace `YourComputerIP` with your actual computer IP address. (Ensure your phone is on the same Wi-Fi network if using Expo Go.)*


### API (.env)

Create a .env file in the api directory:

```env
CLIENT_ID=[CLIENT_ID]
CLIENT_SECRET=[CLIENT_SECRET]
INTRA_URL=https://api.intra.42.fr/v2
REDIRECT_URI=exp://[YourComputerIP]:8081
```

*Replace `YourComputerIP` with your actual computer IP address (or use your Ngrok address if needed).*

## Running the Application

### Mobile app

To start the mobile app, run:

```bash
cd swifty-app
npx expo start
```

You can run in:
- Normal Mode: npx expo start
- Tunnel Mode (for restricted networks): npx expo start --tunnel

### API

To start the mobile app, run:

```bash
cd api
npm run start
```

## Additional Information

- Documentation:
Further API and app documentation are available in the api & swifty directory.
