# Dawahnig Live

This is the codebase for the Dawahnig Live website built with **React 19** and Redux, featuring server-side rendering capabilities.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have the following installed on your machine:

- Node.js (v18 or higher)
- Yarn (v1.22.0 or higher)

### Installing

Follow these steps to get the project up and running:

1. Clone the repository
```bash
git clone https://github.com/dawahanigeria-team/dawahnig-live.git
cd dawahnig-live
```

2. Install dependencies
```bash
yarn install
```

### Development

#### Client-Side Development
Start the React development server:
```bash
yarn start
```
This will start the app on http://localhost:3000

#### Production Server (Full SSR)
1. Build the production bundle:
```bash
yarn build
```

2. Start the full SSR server:
```bash
yarn start
```
This will start the server with **full Server-Side Rendering** on http://localhost:3000

#### Alternative: Simple Server (Client-Side Only)
For basic hosting without SSR:
```bash
yarn start:simple
```

#### Development with Auto-Reload
For development with automatic rebuilding and server restart:
```bash
yarn dev:simple
```

### Available Scripts

- `yarn dev` - Start React development server
- `yarn start` - **Start full SSR production server (recommended)**
- `yarn build` - Build production bundle
- `yarn start:ssr` - Start full SSR server (same as `yarn start`)
- `yarn start:simple` - Start simple server (client-side only)
- `yarn dev:ssr` - Development mode with SSR and auto-reload
- `yarn dev:simple` - Development mode with simple server
- `yarn test` - Run tests

### Health Check

Once the server is running, you can check its status:
```bash
curl http://localhost:3000/health
```

## SEO Features

This application includes comprehensive SEO optimization:

### ✅ **Full Server-Side Rendering**
- All pages are pre-rendered on the server
- Search engines receive complete HTML content
- No dependency on JavaScript for content visibility

### ✅ **Dynamic Meta Tags**
Route-specific optimization:
- **Home/Dawahcast**: Islamic knowledge and education focus
- **Trending**: Popular Islamic content discovery
- **Lecturers**: Islamic scholars and teachers directory
- **Genres**: Content categorization by Islamic topics
- **Quran**: Quranic recitations and teachings

### ✅ **Social Media Optimization**
- Open Graph meta tags for Facebook, LinkedIn
- Twitter Cards for enhanced sharing
- Dynamic URLs and descriptions per page

### ✅ **Search Engine Ready**
- Pre-rendered content in `<div id="root">`
- Proper HTML structure for crawlers
- Fast loading with React 19 streaming
- Fallback content for any rendering issues

## Deployment & Hosting

This application can be hosted as a Node.js application on various platforms:

### Platform Options

#### 1. **Heroku**
```bash
# Install Heroku CLI, then:
heroku create your-app-name
git push heroku main
```
- Add `"start": "yarn start:simple"` to package.json scripts
- Heroku will automatically detect Node.js and run the build

#### 2. **Railway**
```bash
# Connect your GitHub repo to Railway
# Railway will auto-deploy on git push
```
- Set start command: `yarn start:simple`
- Set build command: `yarn build`

#### 3. **Render**
- Connect GitHub repository
- Build command: `yarn build`
- Start command: `yarn start:simple`
- Auto-deploys on git push

#### 4. **Vercel** (Recommended for React apps)
```bash
npm i -g vercel
vercel
```
- Optimized for React applications
- Automatic builds and deployments

#### 5. **DigitalOcean App Platform**
- Connect GitHub repository
- Build command: `yarn build`
- Run command: `yarn start:simple`

#### 6. **AWS/GCP/Azure**
Deploy using Docker or directly:
```dockerfile
# Example Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start:simple"]
```

### Environment Variables

Set these environment variables in your hosting platform:
- `NODE_ENV=production`
- `PORT=3000` (or your preferred port)

### Production Checklist

- ✅ **Full Server-Side Rendering (SSR)** with React 19
- ✅ **SEO Optimized** - Dynamic meta tags per route
- ✅ **React 19 Streaming** - Advanced SSR capabilities
- ✅ **Route-specific SEO** - Optimized titles, descriptions, keywords
- ✅ **Open Graph & Twitter Cards** - Social media optimization
- ✅ Express.js server ready
- ✅ Static asset serving configured
- ✅ Health check endpoint available
- ✅ Environment variable support
- ✅ Auto-scaling compatible
- ✅ **Search Engine Ready** - Pre-rendered content for crawlers

## Built With

- [React 19](https://reactjs.org/) - Latest React with improved SSR capabilities
- [Redux](https://redux.js.org/) - State management
- [Express.js](https://expressjs.com/) - Node.js web framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
# Trigger deployment Thu Aug 28 11:41:53 WAT 2025
