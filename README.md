# Edmission Mobile (Expo + React Native)

Mobile client for Edmission with role-based flows (`student`, `university`, `admin`) backed by the existing Edmission API.

## Run

- `npm install`
- `npm run start`
- `npm run android` or `npm run ios`
- `npm run typecheck`

## Required environment

Set in `.env` / EAS secrets:

- `EXPO_PUBLIC_API_URL` (required in production, must be HTTPS)
- `EXPO_PUBLIC_SOCKET_URL` (optional; if omitted, derived from API URL)

## Implemented platform layers

- Secure refresh token storage with `expo-secure-store`
- In-memory access token with refresh interceptor
- Role-based navigation and deep-link prefixes (`edmission://`, `https://edmission.uz`)
- Theme preference (`system`/`light`/`dark`) + locale persistence (`en`/`ru`/`uz`)
- Domain service modules for student/university/admin/common APIs

## EAS profiles

`eas.json` includes:

- `development` (internal dev client)
- `staging` (internal distribution, `staging` channel)
- `production` (auto increment, `production` channel)

## Release sanity checklist

- Run `npm run typecheck`
- Verify auth login/refresh/logout on physical device
- Verify deep links: `edmission://login`, `https://edmission.uz/login`
- Verify socket connection after auth
- Verify language fallback: `ru`/`uz` else `en`
- Verify all role tabs and API-backed screens load without crashes
