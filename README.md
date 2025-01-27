# Liste2Films 🎬

A modern web application to manage your movie watchlists. Search for movies, create multiple watchlists and track your progress.

## ✨ Features

* **Movie search** through TMDB API to easily find your favorite movies
* **Multiple custom watchlists** to organize your movies however you want
* **Rate and review watched movies** to keep track of your impressions
* **Track movies** watched and to watch so you don't miss anything
* **Modern dark interface** for a pleasant user experience
* **Import/Export watchlists** to share or backup your movie collections
* **Delete watchlists** to keep your lists organized (except default watchlist)
* **Enhanced movie details** including release dates and genres
* **Real-time search** within your watchlists
* **Local storage** for persistent data across sessions

## 🚀 Installation

### Prerequisites

* Node.js v20 or higher
* A TMDB account for API token

### Installing Node.js v20

The recommended way to install Node.js v20 is using nvm (Node Version Manager):

1. First install nvm:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

2. Restart your terminal or reload the configuration:
```bash
source ~/.bashrc  # for Linux
# or
source ~/.zshrc   # for macOS with zsh
```

3. Install Node.js v20:
```bash
nvm install 20
```

4. Set Node.js v20 as default:
```bash
nvm use 20
```

Alternatively, you can install Node.js directly from [Node.js official website](https://nodejs.org/).

### Installing Dependencies

To install the dependencies:

```bash
npm install
```

## ⚙️ Configuration

1. Create a `.env` file at the project root
2. Add your TMDB API Token

The `.env` file should contain:
```
TMDB_API_TOKEN=your_token_here
```

## 🛠️ Available Commands

### Development

To run the application in development mode:
```bash
npm run dev
# or
npm run start
```
The application will be available at http://localhost:9090

### Production

To create an optimized production build:
```bash
npm run build
```

### Tests and Quality

To check code style compliance:
```bash
npm run lint
```

## 🔧 Technologies

* JavaScript ES6+
* Webpack
* SCSS
* TMDB API
* LocalStorage for persistence

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.