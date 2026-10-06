# Spa Maroc Signature

The independent guide to the spas of Morocco.

## Repository layout

| Folder      | What it is                                                                 |
| ----------- | -------------------------------------------------------------------------- |
| `frontend/` | The website: React, TypeScript and Vite. Everything the browser runs.      |
| `backend/`  | Not created yet. The API will live here, with its own dependencies.        |

Each folder is self-contained, with its own `package.json`, `.gitignore` and
`README.md`. Nothing is installed at the root, so the two sides can be built
and deployed separately.

## Run the website

```bash
cd frontend
npm install
npm run dev
```

The site opens on http://localhost:5173. See [frontend/README.md](frontend/README.md)
for the folder structure and the other commands.
