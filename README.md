# Movie List Application

Hello there, welcome to the **Movie List Application** repository.

This application is built on a feature-based architecture using modern technologies such as React, Vite, TypeScript, Tailwind CSS, React Router, and Redux. This architecture ensures a clear separation of concerns, enhancing modularity, maintainability, and scalability, allowing seamless integration of new features. The application includes features like a movie list, detailed movie views, and the ability to add new movies. Details on how the API was used are on the `API.md` Documentation file.

## Pre-requisites

To utilize this repository, you need to have the following installed:

- Operating System: `Windows, Linux, or MacOS`
- [Node.js 18.x](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- [Vite](https://vitejs.dev/) (for development)

## Getting Started

Here is a quick guide to help you get set up:

- Clone the repository:

   ```sh
   git clone https://github.com/VinsDev/movie-list-app.git
   cd movie-list-app
   ```

- Install the required Node dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

- Set Up Environment Variables:

   Create a `.env` file in the root directory of the project and add the following variables:

   ```env
   VITE_API_KEY=your_tmdb_api_key
   VITE_BASE_URL=https://api.themoviedb.org/3
   ```

   Replace `your_tmdb_api_key` with your actual API key from The Movie Database (TMDb).

- Run the application:

   ```sh
   npm run dev      # for development
   # or
   yarn dev
   ```

- Build the application for production:

   ```sh
   npm run build
   # or
   yarn build
   ```

- Run Tests:

   ```sh
   npm run test
   # or
   yarn test
   ```

## Folder/Directory Structure

```
src/
│
├── app/                      # Application-wide settings and store configuration
│   ├── rootReducer.ts        # Combines all slices of the state into a single root reducer
│   └── store.ts              # Configures and exports the Redux store
│
├── assets/                   # Static assets like images, fonts, etc.
│
├── components/               # Shared reusable components
│   └── common/               # Common components used across features
│       ├── ErrorBoundary.tsx # Error boundary component for catching and displaying errors
│
├── definitions/              # TypeScript definitions and interfaces
│   └── definitions.tsx       # Global types and interfaces
│
├── features/                 # Feature-based structure
│   ├── movieDetails/         # Movie Details feature
│   │   ├── api/              # API calls related to movie details
│   │   │   └── movieDetailsApi.ts
│   │   ├── components/       # Components specific to movie details
│   │   │   ├── Header.tsx
│   │   │   ├── MovieDetails.tsx
│   │   │   ├── MovieDetailsSkeleton.tsx
│   │   ├── hooks/            # Custom hooks used in movie details
│   │   ├── redux/            # Redux slice for movie details state management
│   │   │   └── movieDetailsSlice.ts
│   │   └── MovieDetailsPage.tsx  # Main page component for movie details
│   │
│   ├── movieList/            # Movie List feature
│   │   ├── api/              # API calls related to the movie list
│   │   │   └── movieListApi.ts
│   │   ├── components/       # Components specific to the movie list
│   │   │   ├── AddMovieForm.tsx
│   │   │   ├── FilterOptions.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── MovieCard.tsx
│   │   │   ├── MovieCardSkeleton.tsx
│   │   │   ├── MovieList.tsx
│   │   │   ├── PaginationControls.tsx
│   │   │   └── SearchBar.tsx
│   │   ├── hooks/            # Custom hooks used in the movie list
│   │   ├── redux/            # Redux slice for movie list state management
│   │   └── MovieListPage.tsx # Main page component for the movie list
│
├── hooks/                    # Custom hooks shared across the application
│
├── routes/                   # Route definitions and page components
│   └── AppRoutes.tsx         # Route definitions for the entire application
│
├── styles/                   # Global styles and Tailwind CSS configurations
│   ├── global.css            # Global CSS overrides
│   └── variables.css         # CSS variables for theme settings
│
├── utils/                    # Utility functions shared across the application
│   ├── apiUtils.ts           # Utility functions for API calls
│   └── formatters.ts         # Utility functions for formatting data
│
├── .env                      # Environment variables
├── .gitignore                # Git ignore file
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML template
├── package.json              # Project dependencies and scripts
├── postcss.config.js         # PostCSS configuration
├── README.md                 # Project documentation
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── tsconfig.node.json        # TypeScript configuration for Node.js
├── vite.config.ts            # Vite configuration
└── index.tsx                 # Main entry point for the React application
```

## Technology Stacks

This application has been built with the following technologies:

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![The Movie Database (TMDb) API](https://img.shields.io/badge/TMDb-01B5E7?style=for-the-badge&logo=themoviedatabase&logoColor=white)

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Redux](https://redux.js.org/)
- [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api)

## Contribution Guide

To contribute to this repository, follow these steps:

- Checkout a new branch with your name and the feature you are working on. Example: `janedoe/add-movie-feature`.

   ```sh
   git checkout -b yourname/feature
   ```

- After completing your work, create a commit with a comprehensive message. Example:

   ```sh
   git commit -m "Feature: Added search functionality with auto-suggest"
   ```

- Push the changes to the remote repository:

   ```sh
   git push -u origin yourname/feature
   ```

- Ensure you create three environment files: `.env`, `.env.production`, and `.env.development`. 

  **(Add necessary variables in the appropriate file) Example:**

  ```env
  VITE_API_KEY='your_tmdb_api_key'
  ```

  **Remember NOT to commit your `.env` files to version control.**

- Once your code is in the remote branch, create a pull request to the `development` branch.
- Each pull request requires at least 1 peer code review approval before the merge is completed.
- Hurray! You have successfully contributed.

You can read more about this contribution methodology from these [docs](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow).

## Contact

For any inquiries, please contact vinsdev185@gmail.com.
