# Notice Board Application

A modern, responsive notice board web application built with React, Vite, and Tailwind CSS. This application allows users to view and filter department notices with an intuitive and user-friendly interface.

## Features

- **User Authentication**: Secure sign-up and sign-in functionality
- **Notice Browsing**: View a list of notices with previews
- **Category Filtering**: Filter notices by category
- **Detailed View**: Examine notices in detail with full content and attachments
- **Image Carousel**: View and navigate through notice images
- **Responsive Design**: Fully responsive UI for all device sizes
- **Mobile-Optimized Filters**: Special filter interface for mobile devices

## Tech Stack

- **Frontend**: React 19, React Router v6
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Deployment**: Vercel

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/notice-board.git
   cd notice-board
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following:
   ```
   VITE_API_URL=your_backend_api_url
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable UI components
│   ├── context/        # React context providers
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── App.jsx         # Main application component
│   ├── config.js       # Application configuration
│   └── main.jsx        # Application entry point
├── .gitignore          # Git ignore file
├── index.html          # HTML entry point
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration
```

## Components

- **Navbar**: Navigation bar with authentication status
- **NoticeCard**: Card component for displaying notice previews
- **NoticeDetail**: Component for detailed notice view
- **CategoryFilter**: Filter interface for notice categories
- **ImageCarousel**: Component for viewing and navigating notice images

## Pages

- **SignupPage**: User registration page
- **SigninPage**: User login page
- **NoticePage**: Main page for viewing notices

## API Integration

The application communicates with a backend API using Axios. The API endpoints include:

- `/signup`: User registration
- `/signin`: User authentication
- `/notices`: Fetching notice data

## Deployment

The application is configured for deployment on Vercel with the provided `vercel.json` configuration.

## Development

### Running in Development Mode

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

### Previewing Production Build

```bash
npm run preview
```

