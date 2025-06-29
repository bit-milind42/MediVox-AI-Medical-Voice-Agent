import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './config/schema.tsx',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    // Use verbose logging for better debugging
    verbose: true,
    // Use strict mode for type safety
    strict: true,
});
