
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

// Initialize Express
const app = express();

app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Initialize Prisma
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Home route
app.get('/', (req, res) => {
    res.send('CrewX Backend Server is running!');
});

// Test database connection
app.get('/test-db', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;

        res.json({
            message: 'Successfully connected to PostgreSQL!'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Database connection failed'
        });
    }
});

// Register a new user
app.post('/users', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({
                message: 'Username, email and password are required.'
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: 'Password must contain at least 8 characters.'
            });
        }

        // Check whether email already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email.trim().toLowerCase()
            }
        });

        if (existingUser) {
            return res.status(409).json({
                message: 'Email already registered.'
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in PostgreSQL
        const newUser = await prisma.user.create({
            data: {
                username: username.trim(),
                email: email.trim().toLowerCase(),
                password_hash: hashedPassword,
                account_status: 'ACTIVE',
                created_at: new Date()
            },
            select: {
                user_id: true,
                username: true,
                email: true,
                role: true,
                account_status: true,
                created_at: true
            }
        });

        res.status(201).json({
            message: 'User registered successfully!',
            user: newUser
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to register user.'
        });
    }
});

// User login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required.'
            });
        }

        // Find user by email
        const user = await prisma.user.findUnique({
            where: {
                email: email.trim().toLowerCase()
            }
        });

        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password.'
            });
        }

        // Check account status
        if (user.account_status !== 'ACTIVE') {
            return res.status(403).json({
                message: 'Your account is not active.'
            });
        }

        // Compare entered password with stored hash
        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: 'Invalid email or password.'
            });
        }

        // Return user details without password hash
        res.status(200).json({
            message: 'Login successful!',
            user: {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                role: user.role,
                account_status: user.account_status
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Login failed.'
        });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();

        res.json(users);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`CrewX server running at http://localhost:${PORT}`);
});
