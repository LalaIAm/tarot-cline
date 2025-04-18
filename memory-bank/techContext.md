# Technical Context: TarotLyfe

## Technology Stack

### Frontend
- **Core Framework**: React.js
- **State Management**: Redux Toolkit
- **Styling**: SCSS for custom styling
- **UI Components**: Custom components with a consistent design system
- **Routing**: React Router for navigation
- **Form Handling**: Custom form handling

### Backend
- **Server**: Node.js
- **API Design**: RESTful API endpoints
- **Database**: PostgreSQL for relational data storage
- **Authentication**: Clerk for user authentication and session management

### Third-Party Services
- **AI Integration**: External API for tarot card interpretations
- **Hosting/Deployment**: TBD (likely Vercel, Netlify, or AWS)

## Development Environment

### Required Tools
- Node.js (v14+ recommended)
- npm or yarn for package management
- Git for version control
- PostgreSQL for local database
- Code editor (VS Code recommended with extensions)

### Local Setup
1. Clone repository
2. Install dependencies via `npm install`
3. Set up environment variables in `.env` file
4. Start development server with `npm run dev`
5. Run local database or connect to development database

### Environment Variables
```
# API configuration
API_URL=http://localhost:8000
API_KEY=your_api_key

# Database configuration
DATABASE_URL=postgresql://username:password@localhost:5432/tarotlyfe

# Authentication 
CLERK_FRONTEND_API=clerk_public_key
CLERK_API_KEY=clerk_secret_key

# Other services
AI_INTERPRETATION_API_KEY=your_ai_api_key
```

## Technical Constraints

### Frontend Constraints
1. **JavaScript Only**: The project uses JavaScript, not TypeScript
2. **Browser Compatibility**: Must support modern browsers (Chrome, Firefox, Safari, Edge)
3. **Responsive Design**: Must work on mobile, tablet, and desktop viewports
4. **Accessibility**: WCAG 2.1 AA compliance required
5. **Performance**: Initial load under 3 seconds, interactions under 100ms

### Backend Constraints
1. **API Response Times**: Under 500ms for most endpoints
2. **Scalability**: Architecture must support future user growth
3. **Security**: OWASP security best practices must be followed
4. **Rate Limiting**: Implemented for all API endpoints
5. **Data Privacy**: GDPR compliance for user data

### Integration Constraints
1. **API Versioning**: All external APIs must be versioned
2. **Error Handling**: Standardized error responses across all services
3. **Logging**: Structured logging for monitoring and debugging

## Dependencies

### Frontend Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^8.0.5",
    "@reduxjs/toolkit": "^1.9.3",
    "react-router-dom": "^6.8.2",
    "sass": "^1.58.3",
    "axios": "^1.3.4",
    "@clerk/clerk-react": "^4.0.0"
  },
  "devDependencies": {
    "vite": "^4.1.4",
    "eslint": "^8.35.0",
    "jest": "^29.4.3",
    "react-testing-library": "^8.0.1"
  }
}
```

### Backend Dependencies
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "pg": "^8.9.0",
    "knex": "^2.4.2",
    "jsonwebtoken": "^9.0.0",
    "@clerk/clerk-sdk-node": "^4.8.0",
    "winston": "^3.8.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.20",
    "jest": "^29.4.3",
    "supertest": "^6.3.3"
  }
}
```

## Development Patterns & Conventions

### Code Organization
- **Feature-based Organization**: Code organized by feature rather than type
  ```
  /src
    /features
      /authentication
      /dashboard
      /tarotReading
      /journaling
      /accountManagement
    /components
      /shared
    /services
    /utils
    /styles
  ```

### Coding Conventions
- **File Naming**: 
  - React components: PascalCase (e.g., `TarotCard.js`)
  - Utility functions: camelCase (e.g., `formatDate.js`)
  - Constants: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.js`)

- **Component Structure**:
  ```javascript
  // Imports
  import React, { useState, useEffect } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  
  // Component definition
  const ComponentName = ({ prop1, prop2 }) => {
    // State and hooks
    const [localState, setLocalState] = useState(initialValue);
    
    // Event handlers
    const handleEvent = () => {
      // Implementation with early returns
    };
    
    // Rendering
    return (
      <div className="component-name">
        {/* JSX structure */}
      </div>
    );
  };
  
  // Export
  export default ComponentName;
  ```

### API Conventions
- **Endpoint Structure**: `/api/v1/resourceName`
- **HTTP Methods**:
  - GET: Retrieve resources
  - POST: Create resources
  - PUT: Update resources
  - DELETE: Remove resources
- **Response Format**:
  ```json
  {
    "data": {},
    "meta": {
      "pagination": {}
    },
    "error": null
  }
  ```

### State Management
- **Global State**: Redux for application-wide state
- **Local State**: React hooks for component-specific state
- **Server State**: Handled through service layer with caching

## Testing Strategy

### Frontend Testing
- **Unit Tests**: Jest for utility functions and isolated component logic
- **Component Tests**: React Testing Library for component rendering and interactions
- **Integration Tests**: Key user flows across multiple components

### Backend Testing
- **Unit Tests**: Individual service and utility functions
- **Integration Tests**: API endpoints with database interaction
- **End-to-End Tests**: Complete user flows from frontend to backend

## Deployment & CI/CD

### Environments
1. **Development**: Local development environment
2. **Staging**: For QA and testing before production
3. **Production**: Live environment for end users

### CI/CD Pipeline
- **Code Quality**: ESLint for static code analysis
- **Testing**: Automated tests on pull requests
- **Deployment**: Automated deployment to staging after successful tests
- **Production Release**: Manual approval for production deployment

## Monitoring & Observability

### Logging
- **Client-side**: Console errors reported to monitoring service
- **Server-side**: Structured logging with Winston

### Performance Monitoring
- **Frontend**: Load times, interaction metrics
- **Backend**: API response times, database query performance
- **Infrastructure**: Server health, database connections

This technical context document provides a comprehensive overview of the technology stack, development environment, constraints, and conventions for the TarotLyfe project. It serves as a reference for all technical decisions and should be updated as the technology evolves.
