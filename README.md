# BCF - Baris Charity Foundation

## Project Overview

This README documents the development progress of the Baris Charity Foundation website, a Next.js-based platform designed to showcase the foundation's humanitarian work, programs, and facilitate donations and community engagement.

## Features Implemented

### Navigation & Structure
- Responsive header with logo, navigation links, and user controls
- Mobile-friendly bottom navigation bar with key actions
- Language & currency selection options

### Home Page Sections
- **Hero Section**: Main banner with call-to-action buttons
- **About Section**: Information about the foundation's mission and history
- **Values Section**: Core values of the organization with icon representations
- **Programs Section**: Grid display of various humanitarian programs with categories:
  - Medical Program
  - Education
  - WASH Program (Water, Sanitation, and Hygiene)
  - Food Program
  - Community Resilience
  - Sadaka Jariya (Ongoing Charity)
- **Testimonials Section**: Carousel with beneficiary and supporter testimonials
- **Get Involved Section**: Ways for visitors to participate and contribute
- **Impact Section**: Visual representation of how donations make a difference
- **Contact Section**: Contact form and information

### Interactive Elements
- Authentication modal for user sign-in
- Programs exploration modal with detailed information
- SVG background elements with varied opacity and positioning for visual interest
- Hover effects on cards and buttons for improved UX
- Responsive design elements for all screen sizes

### Technical Implementation
- Next.js 15.1.7 with App Router and TypeScript
- Client-side components with React hooks for state management
- Tailwind CSS for styling with custom color palette
- Icon integration using React Icons (FA and AI)
- Image optimization with Next.js Image component
- Form controls with validation
- Component architecture with reusable elements

## Technology Stack
- **Framework**: Next.js 15.1.7
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons (Font Awesome and Ant Design)
- **Deployment**: Vercel

## Next Steps
- Complete any missing functionality in modals
- Add donation processing capabilities
- Implement blog/news section
- Add internationalization for multiple languages
- Develop admin dashboard for content management
- Add analytics tracking

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Access the development server at [http://localhost:3000](http://localhost:3000)

## Project Structure
```
bcf/
├── src/
│   ├── app/
│   │   ├── page.tsx                # Main home page
│   │   └── ...                     # Other pages
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthModal.tsx       # Authentication modal
│   │   ├── home/
│   │   │   ├── AboutSection.tsx    # About section
│   │   │   ├── ContactSection.tsx  # Contact section
│   │   │   ├── HeroSection.tsx     # Hero section
│   │   │   ├── ImpactSection.tsx   # Impact section
│   │   │   ├── ProgramsModal.tsx   # Programs modal
│   │   │   ├── ProgramsSection.tsx # Programs section
│   │   │   ├── TestimonialsSection.tsx # Testimonials
│   │   │   └── ValuesSection.tsx   # Values section
│   │   └── navigation/
│   │       └── AvatarMenu.tsx      # User avatar menu
│   └── ...
└── ...
```