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
- Node.js (v18+ recommended)
- npm for package management
- Git for version control
- PostgreSQL for local database (when backend is implemented)
- Code editor (VS Code recommended with extensions)

### Local Setup
1. Clone repository
2. Install dependencies via `npm install`
3. Set up environment variables in `.env` file
4. Start development server with `npm run dev`
5. Access the site at http://localhost:5173

### Environment Variables
```
# API configuration
VITE_API_URL=http://localhost:8000
VITE_API_KEY=your_api_key

# Authentication 
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Other services
VITE_AI_INTERPRETATION_API_KEY=your_ai_api_key
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
The project is built using Vite as the build tool. Current primary dependencies include:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "latest",
    "@reduxjs/toolkit": "latest",
    "react-router-dom": "latest",
    "sass": "latest",
    "axios": "latest",
    "@clerk/clerk-react": "latest"
  },
  "devDependencies": {
    "vite": "latest",
    "eslint": "latest",
    "jest": "latest",
    "@testing-library/react": "latest",
    "@testing-library/jest-dom": "latest"
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
