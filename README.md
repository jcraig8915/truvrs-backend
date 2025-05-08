# TRUVRS Backend

Backend service for the TRUVRS full-feature application.

## Features

- User Authentication & Authorization
- World Management
- Asset Management
- Real-time Updates via Supabase
- Secure API Endpoints
- TypeScript Support
- Comprehensive Testing Setup

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase Account

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd truvrs-backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your Supabase credentials and other configuration.

4. Start development server:
```bash
npm run dev
```

## Project Structure

```
truvrs-backend/
├── src/
│   ├── api/
│   │   ├── controllers/    # Request handlers
│   │   └── routes/         # API route definitions
│   ├── config/            # App configuration
│   ├── models/            # Data models
│   ├── services/          # Business logic
│   ├── utils/             # Utility functions
│   └── middleware/        # Express middleware
├── tests/
│   ├── unit/             # Unit tests
│   └── integration/      # Integration tests
└── database/
    ├── migrations/       # Database migrations
    └── seeds/           # Seed data
```

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm test`: Run tests
- `npm run lint`: Lint code
- `npm run format`: Format code

## API Documentation

[API documentation will be added here]

## Contributing

[Contribution guidelines will be added here]

## License

ISC 