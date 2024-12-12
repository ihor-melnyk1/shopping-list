# Shoppimg List

## Overview
This project is built using React for the UI layer, Vite for a faster development environment and build tooling, and Redux Toolkit to manage the application’s global state more efficiently and predictably. The goal is to provide a scalable, maintainable, and performant front-end application structure.

## Getting Started



### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ihor-melnyk1/shopping-list.git

2. Install dependencies:
   ```bash
   npm install

3. Run app in development mode:
   ```bash
   npm run dev

## Architectural and Design Decisions
Vite over Create React App: Vite provides significantly faster cold starts and incremental builds. This choice speeds up development and improves the feedback loop for developers.

Redux Toolkit for State Management: Using Redux Toolkit streamlines the setup of Redux. It reduces boilerplate, enforces best practices, and makes state logic predictable. It also integrates well with TypeScript.

Local Storage is used for storing data across application.
TailwindCss is used for enhancing styles.

Potential Improvements with More Time
Testing: Add comprehensive unit tests (using Jest and React Testing Library) and integration tests to ensure code quality, prevent regressions, and improve confidence in future refactoring.

Accessibility and Performance Audits: Conduct accessibility reviews to ensure compliance with standards, and run performance audits (e.g., using Lighthouse) to identify and address potential bottlenecks.

Atomic Components: Design Lower-level UI components to be reusable and composable. As the app grows, this atomic design approach ensures consistent styling and faster UI iteration.


