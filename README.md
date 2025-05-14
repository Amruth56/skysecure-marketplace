# Skysecure Marketplace

A modern, secure marketplace platform for security solutions and services.

## Overview

Skysecure Marketplace is a Next.js-based web application that provides a trusted platform for security solutions. The platform features a robust authentication system with email and phone verification, ensuring secure access for all users.

## Technologies

- **Frontend Framework**: [Next.js](https://nextjs.org/) (v15.3.2)
- **UI Libraries**: 
  - [React](https://reactjs.org/) (v19.0.0)
  - [Material UI](https://mui.com/) (v7.1.0)
  - [Tailwind CSS](https://tailwindcss.com/) (v4.1.6)
- **Styling**: CSS Modules with Tailwind CSS
- **Typography**: Geist Font Family

## Features

- **User Authentication**
  - Secure signup with email and phone verification
  - Multi-step registration process
  - OTP verification system
  - Password visibility toggle
  - Form validation

- **Responsive Design**
  - Mobile-friendly interface
  - Adaptive layout for different screen sizes

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/skysecure-marketplace.git
   cd skysecure-marketplace
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
skysecure-marketplace/
├── public/                 # Static assets
│   ├── person-logo.png
│   └── skysecure-logo.png
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── auth/           # Authentication pages
│   │   │   ├── login/      # Login functionality
│   │   │   └── signup/     # Signup functionality
│   │   ├── globals.css     # Global styles
│   │   ├── layout.js       # Root layout
│   │   └── page.js         # Home page
│   └── components/         # Reusable components
│       └── icons/          # Icon components
├── .gitignore
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
└── README.md
```

## Development

### Available Scripts

- `npm run dev` - Runs the development server
- `npm run build` - Builds the application for production
- `npm run start` - Starts the production server
- `npm run lint` - Runs the linter to check for code quality issues

## Deployment

The application can be deployed to various platforms that support Next.js applications, such as:

- [Vercel](https://vercel.com/) (recommended for Next.js)
- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any inquiries or support, please contact the Skysecure team at support@skysecure.com.
