
# Zamorano - Next.js Enterprise Boilerplate

A clean, minimal, but enterprise-grade Next.js codebase ready for a public site + admin backoffice, using ShadCN for UI, API Routes with Zod for the backend, and Prisma for data access.

## 🚀 Features

- **Next.js 15** with App Router
- **TypeScript** with strict mode
- **Tailwind CSS v4** for styling
- **ShadCN UI** component library
- **Prisma ORM** with PostgreSQL support
- **Zod** for input validation and type inference
- **SWR** for data fetching
- **ESLint + Prettier** for code quality
- **Vitest + Playwright** for testing
- **CI/CD** ready

## 🏗️ Project Structure

```
zamorano/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── health/        # Health check endpoint
│   │   └── users/         # Users CRUD API
│   ├── users/             # Users management page
│   ├── layout.tsx         # Root layout with navigation
│   └── page.tsx           # Home page
├── components/             # React components
│   ├── ui/                # ShadCN UI components
│   └── navigation.tsx     # Navigation component
├── lib/                    # Utility libraries
│   ├── prisma.ts          # Prisma client instance
│   └── utils.ts           # Utility functions
├── prisma/                 # Database schema and migrations
│   └── schema.prisma      # Prisma schema
└── styles/                 # Global styles
    └── tailwind.css       # Tailwind CSS configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ 
- pnpm package manager
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd zamorano
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database connection string
```

4. Set up the database:
```bash
# Generate Prisma client
pnpm prisma:generate

# Push schema to database (for development)
pnpm prisma:db:push
```

5. Start the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📚 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests with Vitest
- `pnpm e2e:headless` - Run Playwright tests
- `pnpm prisma:generate` - Generate Prisma client
- `pnpm prisma:db:push` - Push schema to database

## 🎨 UI Components

The project uses ShadCN UI components, which are built on top of Radix UI primitives and styled with Tailwind CSS. Available components include:

- Button
- Card
- Input
- Label

To add more components, use:
```bash
npx shadcn@latest add <component-name>
```

## 🗄️ Database

The project uses Prisma ORM with PostgreSQL. The current schema includes:

- **User** model with email, name, and timestamps

To modify the database schema:
1. Edit `prisma/schema.prisma`
2. Run `pnpm prisma:generate` to update the client
3. Run `pnpm prisma:db:push` to apply changes (development) or create migrations for production

## 🔌 API Endpoints

- `GET /api/health` - Health check
- `GET /api/users` - Fetch all users
- `POST /api/users` - Create a new user

All API endpoints use Zod for input validation and return properly typed responses.

## 🧪 Testing

- **Unit Tests**: Vitest for component and utility testing
- **E2E Tests**: Playwright for end-to-end testing
- **API Tests**: Test API endpoints with proper validation

## 🚀 Deployment

The project is ready for deployment on Vercel, Netlify, or any other platform that supports Next.js.

### Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV` - Environment (development/production)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
