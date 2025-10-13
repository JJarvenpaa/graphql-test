# Running with Docker Compose

To start the frontend, database and API using Docker:

```bash
docker compose up
```

- The frontend will be available at [http://localhost:5173/](http://localhost:5173/)
- The database runs in a separate container and is accessible from the frontend container as `db` on port `3306`.
- API runs in a seperate container and is accessible from the API container as 'api' on port '4000'

- if you make changes to the db/init.sql file, remember to reset the database volume:
```bash
docker compose down
docker volume rm project111_db_data
docker compose up --build
```

# API Debugging with VS Code

For development with step-debugging capabilities, you can run the API locally while keeping the database in Docker.

## Setup Steps:

1. **Start database and frontend only:**
   ```bash
   sudo docker compose down
   sudo docker compose up db frontend
   ```

2. **Open VS Code in the project root**

3. **Set breakpoints:**
   - Open `api/src/index.ts`
   - Click in left margin to set red breakpoints

4. **Start debugging:**
   - Go to Run & Debug panel (Ctrl+Shift+D)
   - Select "Debug API Server (Simple)"

5. **Test your API:**
   - Frontend at `http://localhost:5173` will hit your local API

## Making Code Changes:

- Edit your TypeScript files in `api/src/`
- Save changes
- Stop debugger and restart to see changes
- Breakpoints will be preserved

## Troubleshooting:

- If breakpoints are hollow, run `npm run compile` in the api directory
- Make sure only database and frontend are running in Docker (not the full stack)