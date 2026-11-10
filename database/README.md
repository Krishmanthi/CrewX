# CrewX Database

This directory contains the database schema, Prisma migrations, and demo seed data for CrewX.

## Technology Stack
- PostgreSQL
- Prisma ORM

## Project Structure
- prisma/schema.prisma: Database schema
- prisma/migrations/: Database migration files
- seeds/users_demo.csv: Demo user records

## Database Configuration
The Prisma configuration file is located in the project root: prisma.config.ts
The database connection uses the DATABASE_URL environment variable.

## Setup Instructions
1. Install Node.js and PostgreSQL.
2. Open the CrewX project root in PowerShell.
3. Run npm install.
4. Create a .env file using .env.example as a template.
5. Update DATABASE_URL with your PostgreSQL connection details.
6. Run npx prisma migrate deploy.
7. Run npx prisma generate.

## Prisma Commands
Check migration status: npx prisma migrate status
Create a migration: npx prisma migrate dev --name migration_name
Generate Prisma Client: npx prisma generate

## Demo User Data
The seeds/users_demo.csv file contains 30 sample user records.
The password hashes are placeholders and must not be used for real authentication.

## Security Notes
- Never commit the .env file.
- Never share actual database passwords or JWT secrets.
- Use secure password hashing for authentication.
- Demo data is intended for development and testing only.

## Responsible
Database Administrator
