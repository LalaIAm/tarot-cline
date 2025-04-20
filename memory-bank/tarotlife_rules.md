# Cursor Rules for TarotLyfe

## 1. Coding Environment

- Languages: ReactJS, Redux Toolkit, JavaScript, HTML, SCSS
- Styling: SCSS

DO NOT USE TYPESCRIPT!!! ONLY JAVASCRIPT!!!

## 2. Code Implementation Guidelines

- **Early Returns:** Use early returns wherever possible to improve readability. 
- **Variable and Function Naming:**
  - Use descriptive names for variables and functions.
  - Event handler functions must be prefixed with `handle` (e.g., `handleClick`, `handleKeyDown`).
  - Use `const` for function expressions: e.g., `const toggle = () => { ... }`.
- **Component Files and Folder Structure:**
  - Organize components by feature. For example, each major module (Authentication, Dashboard, Tarot Reading, Journaling, Account Management) should have its own folder.
  - Shared components should live in a `components/shared` directory.
- **File Naming Conventions:**
  - Use PascalCase for React components, e.g., `DashboardPage.tsx`, `TarotReadingPage.tsx`.
  - Use camelCase for JavaScript variables and functions.
- **Error Handling and Logging:**
  - Implement try/catch blocks for asynchronous code; always use early returns for error cases.
  - Log errors with meaningful contextual information (e.g., using a logging library).
  - Use standardized error response formats.
- **Testing Requirements:**
  - Unit tests should cover critical functions and components using Jest.
  - Integration tests for API endpoints and inter-component communication must be implemented.
  - End-to-end tests using tools like Cypress should simulate key user flows.
- **Documentation Standards:**
  - All components and functions should include concise inline documentation/comments.
- **Security Practices:**
  - Never hardcode sensitive information; all secrets/environment variables must be referenced from an `.env` file with placeholders.
  - Sanitize user input, and ensure encryption in transit (HTTPS) and at rest in the database.
  - Implement secure authentication flows and session management using Clerk or similar libraries.
- **Performance Considerations:**
  - Prioritize code readability while enforcing performance best practices.
  - Use lazy loading/splitting for non-critical components.
  - Optimize assets using TailwindCSS and proper image optimization strategies.

## 3. Style Conventions


- **JSX:**
  - Use semantic HTML elements. Include accessibility features such as `aria-label`, `tabindex="0"`, and appropriate keyboard event handlers (e.g., on:keydown along with on:click).
- **Hooks:**
  - Use React hooks such as `useState` and `useEffect` with proper dependency arrays and include descriptive names for custom hooks.

## 4. Code Organization

- **Component Structure:**
  - Each component should be a self-contained unit exporting a default function and its prop types.
  - Follow the DRY principle and extract common logic into utility functions or custom hooks.
- **Folder Organization Recommendations:**
  - `/components`: Reusable components
  - `/features`: Feature-specific components and pages (e.g., `/features/tarotReading`, `/features/journaling`)
  - `/utils`: Utility functions, helper modules, API callers
  - `/styles`: Global Tailwind configuration if necessary

## 5. Naming Conventions

- **Variables and Functions:** Use camelCase. 
- **React Components:** Use PascalCase.
- **Constants:** Use UPPER_SNAKE_CASE.

## 6. Accessibility

- All interactive elements must include aria-labels and tabindex attributes.
- Ensure onClick elements also handle onKeyDown events to support keyboard accessibility.

## 7. Final Verification

- No TODOs or placeholders should remain. The final code must be fully functional, bug free, and follow the guidelines above.

---
