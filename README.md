# Social network - X-Network

## Install

1. `npm install` или `yarn install`
2. Delete `example.env` file at `server/`.
3. Create `.env` file at `server/` and enter your values in it. More on this below.

   ```
   PORT=
   NODE_ENV=development
   MONGODB_URI=

   ACCESS_TOKEN_SECRET=
   REFRESH_TOKEN_SECRET=
   ```

4. Install MongoDB and start it.
5. Run command
   - Client
     - `npm start` or `yarn start`
   - Server
     - `npm dev` or `yarn dev`
