# CrewX – Database Setup (PostgreSQL + Prisma)

## 1. Overview

This directory contains the database implementation for the CrewX project. PostgreSQL is used as the relational database management system, while Prisma ORM is used to manage database access and integrate the database with the backend application.

## 2. Technologies Used

- PostgreSQL
- Prisma ORM 7.10.1
- Node.js
- JavaScript

## 3. Project Structure

```text
database/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── .env.example
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
├── prisma.config.ts
├── README.md
└── user_table.csv
```

## 4. Database Configuration

Create a `.env` file inside the database directory.

Add your PostgreSQL connection URL:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/DATABASE_NAME?schema=public"
```

Replace the placeholders with your PostgreSQL credentials and database name.

**Note:** Never commit the actual `.env` file to GitHub.

## 5. Installation

Navigate to the database directory:

```bash
cd database
```

Install dependencies:

```bash
npm install
```

## 6. Prisma Setup

Generate Prisma Client:

```bash
npx prisma generate
```

Apply the existing migrations to your database:

```bash
npx prisma migrate deploy
```

## 7. Database Connection Testing

Start the backend server:

```bash
npm start
```

Test the database connection using the configured API endpoint.

## 8. Sample Data

The `user_table.csv` file contains sample user records for database testing and development.

## 9. Important Notes

- PostgreSQL must be installed and running.
- Each developer must configure their own `.env` file.
- Prisma Client should be generated after installing dependencies.
- Do not commit database passwords or other sensitive credentials.