# Dawahnig Live - Agent Documentation

## Project Overview

**Dawahnig Live** is a React 19-based web application for Islamic educational content streaming and discovery. The platform enables users to discover, listen to, and manage Islamic lectures, Quranic recitations, podcasts, videos, and other Islamic educational content.

## Technology Stack

### Core Frontend
- **React 19.1.1** - Latest React version
- **React Router DOM 6.23.0** - Client-side routing
- **Redux 4.1.2 + Redux Persist** - State management with localStorage persistence
- **React Query 4.36.1** - Server state management and caching
- **Tailwind CSS 3.3.2** - Utility-first styling with dark mode support

### Key Libraries
- **Axios 1.3.4** - HTTP client
- **Sentry 8.0.0** - Error tracking
- **React Player 2.12.0** - Audio/video playback
- **React Icons 4.11.0** - Icon library
- **Date-fns 4.1.0** - Date manipulation

### Infrastructure
- **AWS S3 + CloudFront** - Static hosting and CDN
- **Lambda@Edge** - Dynamic OG tags for social sharing

## Project Structure

```
dawahnig-live/
├── src/
│   ├── App.jsx                 # Root application component
│   ├── index.js                # Entry point with Redux, Sentry
│   ├── pages/                  # Page components (29 directories)
│   │   ├── landing/            # Home page
│   │   ├── audioDetail/        # Lecture detail view
│   │   ├── genres/             # Browse by topic
│   │   ├── lecturers/          # Scholars directory
│   │   ├── videos/             # Video content
│   │   ├── playlists/          # Playlist management
│   │   ├── quran/              # Quranic recitations
│   │   ├── searchPage/         # Search results
│   │   ├── Authentication/     # Login, signup, OAuth
│   │   └── ...
│   ├── components/             # Reusable components (63 directories)
│   │   ├── layout/             # Layout wrapper
│   │   ├── headerRouter/       # Top navigation
│   │   ├── audio/              # Audio player components
│   │   ├── UI/                 # Common UI elements
│   │   └── ...
│   ├── Redux/                  # State management
│   │   ├── Actions/
│   │   │   ├── Types.js        # Action type constants
│   │   │   └── ActionCreators.js
│   │   └── Reducer/
│   │       ├── index.js        # Root reducer
│   │       ├── user.js         # User state
│   │       └── search.js       # Search state
│   ├── services/               # API service layer (19 files)
│   │   ├── api.js              # Axios config with error handling
│   │   ├── landing.service.js
│   │   ├── lecture.service.js
│   │   └── ...
│   ├── hooks/                  # Custom React hooks (13 directories)
│   ├── utils/                  # Utility functions
│   │   ├── routes/constants.js # Route path constants
│   │   └── tracking/           # Google Analytics
│   └── assets/                 # Static images, icons
├── lambda-edge/                # AWS Lambda@Edge for OG tags
│   ├── og-tags-injector.js     # Lambda function for social crawlers
│   ├── deploy.sh               # Deployment script
│   └── README.md               # Lambda@Edge documentation
├── public/                     # Static assets
│   └── index.html              # HTML template
├── build/                      # Production React bundle
├── .github/workflows/          # CI/CD configuration
├── package.json
└── tailwind.config.js
```

## Available Scripts

```bash
yarn start            # React dev server (localhost:3000)
yarn build            # Build React production bundle
yarn test             # Run Jest tests
```

## Development Setup

### Prerequisites
- Node.js 20.18.0 (see `.nvmrc`)
- Yarn 1.22.22+ (enforced via preinstall script)

### Installation
```bash
git clone https://github.com/dawahanigeria-team/dawahnig-live.git
cd dawahnig-live
yarn install
cp .env.example .env  # Configure environment variables
yarn start            # Start development server
```

### Environment Variables
```
REACT_APP_API_BASE_URL=https://backend.dawahbox.com/api
REACT_APP_API_ADMINISTER_BASE_URL=https://backend.dawahbox.com/administer/api
REACT_APP_DEV_API_BASE_URL=https://dev-backend.dawahbox.com/api
REACT_APP_SENTRY_DSN=
REACT_APP_SENTRY_ENVIRONMENT=production
```

## API Configuration

### Base URLs
- **Production**: `https://backend.dawahbox.com/api`
- **Admin**: `https://backend.dawahbox.com/administer/api`
- **Development**: `https://dev-backend.dawahbox.com/api`

### Request Headers
All API requests include:
- `x-project: 206cf92c-8a46-45ef-bf3f-a6ef92fc6f25`
- Timeout: 30 seconds

### Service Layer
Services are located in `src/services/`:
- `api.js` - Axios instance with error handling
- `landing.service.js` - Homepage content
- `lecture.service.js` - Lecture operations
- `lecturers.service.js` - Scholar directory
- `genres.service.js` - Genre data
- `videos.service.js` - Video content
- `quran.service.js` - Quranic content
- `favorite.service.js` - Favorites management
- `ramadan.service.js` - Ramadan content

## Key Routes

| Route | Description |
|-------|-------------|
| `/` | Home/Landing page |
| `/dawahcast/l/:id` | Lecture detail |
| `/dawahcast/a/:id` | Album detail |
| `/dawahcast/rp/:id` | Lecturer profile |
| `/dawahcast/videos/:id` | Video detail |
| `/dawahcast/playlists/:id` | Playlist detail |
| `/dawahcast/quran/:id` | Quran recitation |
| `/genres` | Genre list |
| `/lecturers` | Lecturers directory |
| `/trending` | Trending content |
| `/charts` | Top charts |
| `/search` | Search results |
| `/library` | User library |
| `/favourite` | Favorites |
| `/my-playlist` | User playlists |
| `/login` | Login page |
| `/signup` | Sign up |

## Redux State Structure

```javascript
{
  user: {
    currentUser: null,       // Authenticated user object
    token: null,             // JWT token
    currentAudioInfo: null,  // Now playing audio metadata
    playing: false,          // Playback state
    audioId: null,           // Current audio ID
    theme: "dark",           // "dark" or "light"
    audioData: null,         // Full audio data
    isrepeat: false          // Repeat mode
  },
  search: {
    // Search text, filters, results
  }
}
```

## Code Style

### Formatting (Prettier)
- Line width: 80 characters
- Indentation: 2 spaces
- Trailing commas: ES5

### Naming Conventions
- **Components**: PascalCase (`AudioPlayer.jsx`)
- **Functions/Variables**: camelCase (`handlePlayClick`)
- **Constants**: SCREAMING_SNAKE_CASE (`API_BASE_URL`)
- **Files**: camelCase or kebab-case

### Component Structure
```jsx
// imports
import React from 'react';
import { useSelector } from 'react-redux';

// component
const MyComponent = ({ prop1, prop2 }) => {
  // hooks first
  const user = useSelector(state => state.user);

  // handlers
  const handleClick = () => {};

  // render
  return <div>...</div>;
};

export default MyComponent;
```

## Deployment

### GitHub Actions Workflows
- `main.yml` - Production deployment (master → S3)
- `staging-ci-cd.yml` - Staging pipeline
- `dev-ci.yml` - Dev CI/CD

### Production Stack
- **S3** - Static file hosting
- **CloudFront** - CDN distribution
- **Lambda@Edge** - Dynamic OG tags for social crawlers

## Lambda@Edge (OG Tags)

For social media sharing previews, Lambda@Edge injects Open Graph tags for:
- `/dawahcast/l/{id}` - Lectures
- `/dawahcast/a/{id}` - Albums
- `/dawahcast/rp/{id}` - Lecturers
- `/dawahcast/videos/{id}` - Videos
- `/dawahcast/playlists/{id}` - Playlists
- `/dawahcast/quran/{id}` - Quran recitations

Detected crawlers: Facebook, WhatsApp, Twitter, LinkedIn, Telegram, Slack, Discord

See `lambda-edge/README.md` for deployment instructions.

## Error Handling

### Sentry Integration
- Client-side errors tracked via `@sentry/react`
- React Error Boundaries for graceful fallbacks

### API Error Handling
- Network error detection (offline, timeout)
- Error deduplication (3s cooldown)
- Toast notifications for user feedback

## Testing

- **Framework**: Jest (via react-scripts)
- **Component Testing**: React Testing Library
- **Pattern**: `*.test.js` files

## Key Features

1. **Audio Player** - Play/pause, seek, volume, speed control
2. **Dark/Light Mode** - Theme toggle stored in Redux
3. **Search** - Full-text search with filters
4. **Favorites** - Save lectures for later
5. **Playlists** - Create custom playlists
6. **Download** - Offline audio playback
7. **Share** - Social sharing with rich previews (via Lambda@Edge)
8. **Comments** - User discussions
9. **OAuth** - Google login integration

## Common Tasks

### Adding a New Page
1. Create directory in `src/pages/`
2. Add component file (e.g., `MyPage.jsx`)
3. Add route in `src/App.jsx`
4. Update `src/utils/routes/constants.js`

### Adding a New Service
1. Create file in `src/services/` (e.g., `myfeature.service.js`)
2. Import axios instance from `api.js`
3. Export functions for API calls
4. Add to `src/services/index.js`

### Adding a New Hook
1. Create directory in `src/hooks/`
2. Add hook file (e.g., `useMyFeature.hook.js`)
3. Use React Query for data fetching

### Adding OG Tags for New Routes
1. Update `lambda-edge/og-tags-injector.js`
2. Add route pattern and API endpoint mapping
3. Deploy using `lambda-edge/deploy.sh`

## Important Notes

- **Package Manager**: Use Yarn only (enforced)
- **Node Version**: 20.18.0 (check `.nvmrc`)
- **State Persistence**: Redux state persists to localStorage
- **API Headers**: Include project header in all API calls
