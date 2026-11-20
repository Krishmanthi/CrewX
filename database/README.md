# CrewX – Central Database

This folder contains the centralized PostgreSQL database schema and Prisma configuration for the CrewX project.

## 1. Requirements
- Node.js and npm
- PostgreSQL
- Git
- Visual Studio Code

## 2. Clone the Project
Clone the CrewX repository and open the project in VS Code.

Navigate to the database folder:

```bash
cd database
```

## 3. Install Dependencies

Run:

```bash
npm install
```

## 4. Configure Database Connection

1. Find the `.env.example` file.
2. Create a copy and rename it to `.env`.
3. Update the `DATABASE_URL` with your PostgreSQL connection details.

Example:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/crewx"
```

Use the database credentials provided by your team.

## 5. Generate Prisma Client

Run:

```bash
npx prisma generate
```

This generates the Prisma Client based on the shared database schema.

## 6. Database Structure

The `prisma/schema.prisma` file contains the centralized database models and their relationships.

All team members should use this shared schema when developing database-related features.

## 7. Important Guidelines

- Always pull the latest changes before starting development.
- Do not create separate database schemas for individual features.
- Update the central Prisma schema when adding or modifying database models.
- Coordinate schema changes with the team to avoid conflicts.
- Never commit or push the `.env` file.
- Commit and push changes to the appropriate Git branch.

## 8. Useful Commands

| Command | Purpose |
|---|---|
| `npm install` | Install dependencies |
| `npx prisma generate` | Generate Prisma Client |
| `npx prisma validate` | Validate the Prisma schema |
| `npx prisma studio` | Open the database management interface |
| `git pull` | Get the latest project changes |

**Note:** The central database schema is maintained in `prisma/schema.prisma`. Please coordinate database changes with the team before committing them.