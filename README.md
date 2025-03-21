# React Multi-Step User CRUD Form

## Overview

This project is a frontend user management system built with _React, **TypeScript, **Redux Toolkit, **React Hook Form, and **Tailwind CSS_.

The application features a _multi-step form wizard_ for creating user records. Each step collects specific pieces of information with validation. After completing the steps, the user data is displayed in a _resume-like format_ for review.

User records are stored in the Redux store and backed up using _LocalStorage_ for persistence.

## Features

- _Multi-Step Form Wizard_: Users input their data in multiple steps, ensuring easy navigation and a better user experience.
- _Validation_: Each form step includes input validation to ensure data integrity.
- _Resume-Like Summary_: After completing the form, the user can review their data formatted like a résumé.
- _User Management_:
  - View all users
  - Edit user information
  - Delete user
  - View individual user details in a resume-style layout
- _State Persistence_: User data is stored in Redux and persisted in LocalStorage.

## Running the Project

1. Install dependencies:

```bash
npm install
npm run dev
```
