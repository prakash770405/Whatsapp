# Whatsapp (Simple Chat CRUD)

This is a small Node.js/Express application that demonstrates a simple chat message CRUD (Create, Read, Update, Delete) backed by MongoDB. It uses EJS for server-side templates and stores chat messages in a MongoDB collection via Mongoose.

## Features

- List all chat messages (web UI)
- Create a new chat message (from, to, message)
- Edit an existing message (text only)
- Delete a message
- Server-side rendered views using EJS
- Static assets served from `public/` (CSS, etc.)

## Tech stack / Frameworks

- Node.js (runtime)
- Express (web framework)
- MongoDB (database)
- Mongoose (MongoDB ODM)
- EJS (templating)

## Required libraries / packages

The project depends on the following npm packages (as listed in `package.json`):

- `express` — web framework
- `ejs` — templating engine
- `mongoose` — MongoDB object modelling
- `method-override` — allow HTML forms to submit PUT/DELETE

Install with:

```powershell
npm install
```

## Middlewares used

- `express.urlencoded({ extended: true })` — parse URL-encoded request bodies from forms
- `express.static('public')` — serve static assets (CSS, client JS, images)
- `method-override('_method')` — allow form-based PUT/DELETE using a `_method` query or hidden form field
- `app.set('view engine', 'ejs')` — sets EJS as the template engine

## Important files

- `index.js` — main application and route handlers
- `models/chat.js` — Mongoose schema and model for chat messages
- `views/` — EJS templates (`index.ejs`, `newmsg.ejs`, `editmsg.ejs`)
- `public/style.css` — example static stylesheet

## Routes / Usage

- GET `/chats` — show all messages (main UI)
- GET `/chats/new` — form to create a new message
- POST `/chats/new` — create a new message
- GET `/chats/:id/edit` — form to edit a message
- PUT `/chats/:id/edit` — update message text
- DELETE `/chats/:id/delete` — delete a message

The app listens on port `8080` by default. Open:

http://localhost:8080/chats

## Database

The app currently connects to a local MongoDB instance at:

```
mongodb://127.0.0.1:27017/whatsapp
```

Make sure MongoDB is installed and running locally. You can change the connection string in `index.js` to use an environment variable or remote host if needed.

## Model (schema)

The `Chat` model (in `models/chat.js`) contains the following fields:

- `from` (String, required) — sender name
- `to` (String, required) — recipient name
- `msg` (String) — message text (max length 1000)
- `created_at` (Date, default: Date.now) — timestamp

## Run the app

1. Install dependencies: `npm install`
2. Ensure MongoDB is running locally
3. Start the server: `node index.js`
4. Visit `http://localhost:8080/chats`

Tip: To enable PUT/DELETE from HTML forms the app uses `method-override`. In your edit/delete forms include a hidden `_method` field with value `PUT` or `DELETE` or append `?_method=PUT` to the form action.

## Notes & Next steps

- The MongoDB URI is hard-coded; consider using an environment variable (e.g., `MONGODB_URI`).
- Add input validation and error handling for production readiness.
- Add tests and npm scripts (start, dev) to `package.json`.

## License

This repository does not specify a license. Add a LICENSE file if you plan to publish.
