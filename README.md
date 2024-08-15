# Movie List Application

A responsive and dynamic movie list application built using React, Vite, TypeScript, Tailwind CSS, React Router, and Redux.

## Features

- **Movie List**: View a paginated list of movies fetched from a free API.
- **Search**: Search for movies with auto-suggest and last 10 search keywords saved.
- **Add New Movie**: Add a new movie to the list via a popup form.
- **Movie Details**: View detailed information about a selected movie.
- **State Management**: Managed using Redux for predictable state updates.
- **Routing**: Smooth navigation between movie list and details pages.
- **Responsive Design**: Fully responsive for both desktop and mobile devices.
- **Error Handling**: Comprehensive error handling for empty states, failed API calls, etc.

## Project Structure

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

## Setup Instructions

1. **Clone the Repository**
   ```sh
   git clone https://github.com/VinsDev/movie-list-app.git
   cd movie-list-app
   ```

2. **Install Dependencies**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Start Development Server**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. **Build for Production**
   ```sh
   npm run build
   # or
   yarn build
   ```

5. **Run Tests**
   ```sh
   npm run test
   # or
   yarn test
   ```

## Deployment

The application can be deployed using platforms like Netlify, Vercel, or Cloudflare Pages.

- **Deploy on Vercel**:
  1. Create a new project on [Vercel](https://vercel.com/).
  2. Link your GitHub/Bitbucket repository.
  3. Deploy directly from the repository.

## Technologies Used

- **Vite**: Blazing fast build tool.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript.
- **Tailwind CSS**: Utility-first CSS framework.
- **React Router**: Declarative routing for React.
- **Redux**: Predictable state container for JavaScript apps.

## Contact

For any inquiries, please contact [your-email@example.com].
