# CodeLeap Network

## Overview

CodeLeap Network is a social media application that allows users to create, read, update, and delete posts. It features a modern, clean UI with a focus on usability and performance. This project was built as part of the CodeLeap coding challenge for a frontend position.

## Features

### Core Features

- **User Sign-up**: Simple username registration process
- **Create Posts**: Add new posts with title and content
- **View Posts**: See all posts from all users in reverse chronological order
- **Update Posts**: Edit your own posts' title and content
- **Delete Posts**: Remove your own posts from the platform
- **Real-time Updates**: Posts list refreshes after any CRUD operation

### Technical Features

- Responsive design that works on various screen sizes
- Clean and intuitive user interface
- Form validation for all user inputs
- Proper error handling for API requests
- Optimized state management using React hooks
- Seamless navigation between screens

## Technology Stack

- **Frontend Framework**: React.js
- **Styling**: Styled Components for component-based styling
- **Routing**: React Router for navigation
- **API Communication**: Axios for HTTP requests
- **State Management**: React Hooks (useState, useEffect)
- **Build Tool**: Create React App

## Project Structure

```
codeleap-network/
├── public/            # Static files
├── src/
│   ├── components/    # UI components
│   │   ├── Signup/    # Signup screen components
│   │   ├── MainScreen/# Main feed components
│   │   └── Modals/    # Modal components for edit/delete
│   ├── services/      # API and other services
│   ├── App.js         # Main application component with routes
│   └── index.js       # Entry point
└── README.md          # Project documentation
```

## Screens and Components

### 1. Signup Screen
- Simple form to collect username
- Disabled submit button until username is entered
- Stores username in localStorage for persistence

### 2. Main Screen
- Header with application name
- Create post form at the top
- List of posts with newest on top
- Edit/Delete buttons for user's own posts
- Relative timestamp for each post

### 3. Delete Modal
- Confirmation dialog before deleting a post
- Options to cancel or confirm deletion

### 4. Edit Modal
- Form to edit title and content of a post
- Pre-filled with current post data
- Form validation before submission

## API Integration

The application connects to the CodeLeap API at `https://dev.codeleap.co.uk/careers/` with the following endpoints:

- **GET** - Fetch all posts
- **POST** - Create a new post
- **PATCH** - Update an existing post
- **DELETE** - Remove a post

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/codeleap-network.git
   cd codeleap-network
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Running Tests

The application includes both unit and integration tests to ensure functionality is working as expected. Here's how to run the tests:

1. Run all tests once
   ```bash
   npm test -- --watchAll=false
   # or
   yarn test --watchAll=false
   ```

2. Run tests in watch mode (tests will re-run when files change)
   ```bash
   npm test
   # or
   yarn test
   ```

3. Run tests with coverage report
   ```bash
   npm test -- --coverage
   # or
   yarn test --coverage
   ```

4. Run a specific test file
   ```bash
   npm test -- src/components/Signup/Signup.test.js
   # or
   yarn test src/components/Signup/Signup.test.js
   ```

## Deployment

This application can be easily deployed to platforms like Netlify, Vercel, or GitHub Pages:

1. Build the production-ready app:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Deploy the contents of the `build` folder to your hosting provider

## Bonus Features Implemented

- Responsive design for mobile devices
- Clean animations for modals and transitions
- Relative timestamps for posts (e.g., "5 minutes ago")
- Optimistic UI updates for better user experience
- Like functionality for posts with visual feedback
- Comment system with collapsible comments section
- Tooltips for improved user guidance
- Semi-transparent modal backgrounds with blur effect
- Share functionality for posts
- Unit and integration tests

## Future Improvements

- Add user authentication with JWT
- Implement likes and comments functionality
- Add media attachments to posts
- Implement pagination or infinite scroll
- Add user profiles with avatars

## Contribution

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](https://github.com/yourusername/codeleap-network/issues) if you want to contribute.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
# codeleap-network
