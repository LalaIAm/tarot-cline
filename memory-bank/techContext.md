# Technical Context: TarotLyfe

## Technology Stack

### Frontend
- **Core Framework**: React.js
- **State Management**: Redux Toolkit
- **Styling**: 
  - SCSS for custom styling (needs refactoring to address deprecation warnings)
  - TailwindCSS for component styling
- **UI Components**: Custom components with TailwindCSS
- **Routing**: React Router for navigation
- **Form Handling**: Custom form handling with React hooks

### Backend
- **Server**: Node.js (planned, not yet implemented)
- **API Design**: RESTful API endpoints
- **Database**: PostgreSQL via Supabase
- **Authentication**: Supabase for user authentication and session management

### Third-Party Services
- **AI Integration**: External API for tarot card interpretations (to be implemented)
- **Supabase**: Backend-as-a-Service for authentication, database, and real-time capabilities
- **Hosting/Deployment**: TBD (likely Vercel, Netlify, or AWS)

## Development Environment

### Required Tools
- Node.js (v18+ recommended)
- npm for package management
- Git for version control
- Code editor (VS Code recommended with extensions)

### Local Setup
1. Clone repository
2. Install dependencies via `npm install`
3. Set up environment variables in `.env` file:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start development server with `npm run dev`
5. Access the site at http://localhost:5173

### Environment Variables
```
# API configuration
VITE_API_URL=http://localhost:8000
VITE_API_KEY=your_api_key

# Supabase Authentication 
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

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

### Current Dependencies
The project is built using Vite as the build tool. Primary dependencies include:

```json
{
  "dependencies": {
    "@clerk/clerk-react": "^5.28.2",  // NOTE: Not currently used, using Supabase instead
    "@reduxjs/toolkit": "^2.7.0",
    "@supabase/supabase-js": "^2.49.4",
    "axios": "^1.8.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-redux": "^9.2.0",
    "react-router-dom": "^7.5.1",
    "sass": "^1.86.3"
  },
  "devDependencies": {
    "@eslint/js": "^9.22.0",
    "@tailwindcss/postcss": "^4.1.4",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.3.0",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.25.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^16.0.0",
    "jest": "^29.7.0",
    "lucide-react": "^0.501.0",
    "postcss": "^8.5.3",
    "tailwindcss": "^4.1.4",
    "vite": "^6.3.1"
  }
}
```

**Note**: While Clerk is present in the dependencies, we've fully implemented authentication with Supabase and are not using Clerk.

## Development Patterns & Conventions

### Code Organization
- **Feature-based Organization**: Code organized by feature rather than type
  ```
  /src
    /features
      /authentication
      /dashboard
      /landing
      /tarotReading
      /journaling
      /accountManagement
    /components
      /shared
      /ui
    /services
    /utils
    /layouts
    /styles
  ```

### Coding Conventions
- **File Naming**: 
  - React components: PascalCase (e.g., `TarotCard.jsx`)
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
- **Global State**: Redux Toolkit for application-wide state
- **Async Operations**: Redux Toolkit's createAsyncThunk for API calls
- **Local State**: React hooks for component-specific state
- **Server State**: Handled through service layer with Supabase

## Implemented Features

### Authentication
- Full authentication flow with Supabase
- Login, signup, password reset functionality
- Protected routes with authentication checks
- Redux integration for auth state management

### UI Components
- Responsive navigation with mobile menu
- Footer component with social links
- Landing page with feature highlights
- Dashboard placeholder for authenticated users
- Form inputs with validation

## Testing Strategy

### Frontend Testing (To Be Implemented)
- **Unit Tests**: Jest for utility functions and isolated component logic
- **Component Tests**: React Testing Library for component rendering and interactions
- **Integration Tests**: Key user flows across multiple components

### Backend Testing (Future)
- **Unit Tests**: Individual service and utility functions
- **Integration Tests**: API endpoints with database interaction
- **End-to-End Tests**: Complete user flows from frontend to backend

## Deployment & CI/CD (Future)

### Environments
1. **Development**: Local development environment
2. **Staging**: For QA and testing before production
3. **Production**: Live environment for end users

### CI/CD Pipeline
- **Code Quality**: ESLint for static code analysis
- **Testing**: Automated tests on pull requests
- **Deployment**: Automated deployment to staging after successful tests
- **Production Release**: Manual approval for production deployment

## Known Technical Issues

- SCSS has deprecation warnings that need to be addressed
- Package.json includes unused Clerk dependency 
- Some UI components need refactoring to follow consistent patterns

This technical context document provides a comprehensive overview of the technology stack, development environment, constraints, and conventions for the TarotLyfe project. It serves as a reference for all technical decisions and should be updated as the technology evolves.
