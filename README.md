# TarotLyfe

An AI-powered tarot reading web application with integrated journaling features. The app is built using React for the frontend, Node.js for backend services, and PostgreSQL for data storage.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- Git

### Installing

1. Clone the repository
```bash
git clone <repository-url>
cd tarot-life
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with your environment variables (see `.env.example`)

4. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── app/                  # Global app configuration
├── components/           # Shared components
│   └── shared/           # Reusable components across features
├── features/             # Feature-based modules
│   ├── authentication/   # Authentication feature
│   ├── dashboard/        # Dashboard feature
│   ├── tarotReading/     # Tarot reading feature
│   ├── journaling/       # Journaling feature
│   └── accountManagement/# Account management feature
├── layouts/              # Layout components
├── routes/               # Routing configuration
├── services/             # API services and external integrations
├── styles/               # Global styles and variables
└── utils/                # Utility functions
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run preview` - Locally preview production build
- `npm run test` - Run the test suite
- `npm run lint` - Lint the codebase

## Built With

* [React](https://reactjs.org/) - Frontend UI framework
* [Redux Toolkit](https://redux-toolkit.js.org/) - State management
* [React Router](https://reactrouter.com/) - Routing
* [SCSS](https://sass-lang.com/) - Styling
* [Clerk](https://clerk.dev/) - Authentication and user management

## Development Roadmap

### Milestone 1: Landing Page, Authentication, and Core Navigation
- Implement landing page with clear CTA
- Set up authentication with Clerk
- Create core navigation and routing

### Milestone 2: Tarot Reading Module and AI Interpretation Engine
- Implement tarot card deck and shuffle functionality
- Create spread selection component
- Integrate with AI for reading interpretations

### Milestone 3: Journaling Feature and User Dashboard
- Develop journal entry creation and editing
- Implement tagging and search functionality
- Create dashboard overview

### Milestone 4: Account Management and Security Enhancements
- Build profile editing functionality
- Implement settings and preferences
- Add security features

### Milestone 5: Testing, Launch Preparation, and Post-Launch Support
- Develop comprehensive testing suite
- Set up CI/CD pipeline
- Prepare for deployment

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.
