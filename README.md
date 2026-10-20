# Medora Healthcare - Glowing Effect Integration

## Overview
This project integrates a Glowing Effect component into the Medora Healthcare platform, specifically enhancing the "Engineered for High-Performance Clinics" capabilities section.

## Project Structure
- `src/` - Source directory
- `src/components/ui/` - UI components
- `src/lib/` - Utility functions
- `src/assets/` - Static assets
- `src/styles/` - CSS styles
- `scripts/` - Main application scripts
- `components/ui/` - Exported components for distribution
- `lib/` - Library utilities
- `glowing-effect.js` - Vanilla JS implementation of the Glowing Effect
- `script.js` - Main application logic
- `package.json` - Project dependencies and scripts
- `vite.config.js` - Vite configuration for development
- `postcss.config.js` - PostCSS configuration
- `README.md` - This README

## Components

### 1. GlowingEffect Component
- **Location**: `components/ui/glowing-effect.tsx`
- **Description**: A sophisticated React component that creates interactive glowing effects on hover with smooth animations and CSS custom properties
- **Features**:
  - Smooth mouse tracking and movement animations
  - Configurable blur, spread, and proximity settings
  - Support for different variants (default and white)
  - Customizable border width and glow effects

### 2. FeatureSteps Component
- **Location**: `components/ui/feature-section.tsx`
- **Description**: A feature showcase component with interactive card selection and smooth transitions
- **Features**:
  - Interactive feature cards with hover states
  - Smooth image transitions using Framer Motion
  - Auto-playing progress indicators

### 3. TextReveal Component
- **Location**: `components/ui/cascade-text.tsx`
- **Description**: Character-by-character text reveal with hover effects
- **Features**:
  - Cascading character reveal on page load
  - Per-character hover color transitions
  - Configurable animation delays and durations

### 4. Utility Functions
- **Location**: `lib/utils.ts`
- **Description**: Common utility functions for the project
- **Features**:
  - Class name merging with `clsx` and `tailwind-merge`
  - TypeScript support

## JavaScript Implementation

### 1. GlowingEffect.js
- **Location**: `glowing-effect.js`
- **Description**: Vanilla JavaScript port of the GlowingEffect component
- **Features**:
  - Implements the same logic as the React component
  - Uses CSS custom properties for styling
  - Handles mouse tracking, animations, and effects
  - Supports initialization from HTML data attributes

### 2. Script.js
- **Location**: `script.js`
- **Description**: Main application script handling various UI interactions
- **Features**:
  - Navigation toggle functionality
  - Form handling and validation
  - Carousel controls
  - Scroll-based animations
  - Card hover effects
  - Smooth scrolling

## Integration

### 1. React Integration
The React components can be used in modern frontend frameworks with Vite:

```bash
# Install dependencies
npm install

# Develop
npm run dev

# Build for production
npm run build
```

### 2. Vanilla JS Integration
For static HTML sites:

```html
<!-- Include the glowing effect script -->
<script src="glowing-effect.js"></script>

<!-- Include main application script -->
<script src="script.js"></script>
```

### 3. High-Performance Clinics Section
The Glowing Effect is integrated into the "Engineered for High-Performance Clinics" section:

1. **Card Enhancement**: Each capability card now has a subtle glowing effect
2. **Interactive Hover**: Cards respond to mouse movement with dynamic lighting
3. **Visual Feedback**: Active cards display enhanced visual prominence

## CSS Styling

### 1. Tailwind CSS
- Used for utility classes and responsive design
- Configured via `tailwind.config.js`

### 2. Custom CSS
- `src/index.html` contains comprehensive styles
- Includes CSS custom properties for the Glowing Effect
- Supports responsive design with media queries

## Configuration

### 1. Vite Configuration
`vite.config.js` configures:
- React integration
- Build output directory
- Development server settings
- Path aliases for imports

### 2. PostCSS Configuration
`postcss.config.js` configures:
- Tailwind CSS processing
- Custom property support
- Nesting rules

## Usage Examples

### 1. Using GlowingEffect Component
```tsx
import { GlowingEffect } from '@/components/ui/glowing-effect';

function YourComponent() {
  return (
    <div className="relative">
      <GlowingEffect
        blur={0}
        inactiveZone={0.7}
        proximity={0}
        spread={20}
        variant="default"
        glow={false}
        disabled={false}
        movementDuration={2}
        borderWidth={1}
      />
      <div className="content">
        Your content here
      </div>
    </div>
  );
}
```

### 2. Using FeatureSteps Component
```tsx
import { FeatureSteps } from '@/components/ui/feature-section';

const features = [
  {
    step: "Patient Intake",
    title: "Digital Self-Scheduling",
    content: "Digital self-scheduling, pre-screening, & insurance capture.",
    image: "/path/to/image.jpg"
  },
  // ... more features
];

function YourComponent() {
  return (
    <FeatureSteps
      features={features}
      title="Engineered for High-Performance Clinics"
      autoPlayInterval={3500}
    />
  );
}
```

## Development Scripts

### 1. Development
```bash
npm run dev
```
- Starts the Vite development server
- Enables hot module replacement
- Opens browser automatically

### 2. Build
```bash
npm run build
```
- Builds the project for production
- Minifies assets
- Copies static files

### 3. Preview
```bash
npm run preview
```
- Launches the production build
- Useful for testing locally

### 4. Linting
```bash
npm run lint
```
- Runs ESLint on the codebase
- Ensures code quality

### 5. Formatting
```bash
npm run format
```
- Runs Prettier for consistent code formatting

## Testing

The project includes:
- Jest configuration for unit testing
- TypeScript type checking
- ESLint for linting

## Deployment

### 1. Production Build
1. Run `npm run build`
2. Copy files to your web server
3. Configure web server to serve static files

### 2. CI/CD
The project includes configuration for:
- Automated builds
- Linting and formatting checks
- Testing before deployment

## Troubleshooting

### 1. Component Not Rendering
- Ensure all dependencies are installed
- Check for import errors in the console
- Verify bundler configuration

### 2. CSS Not Applied
- Check if Tailwind CSS is properly configured
- Verify that the component has the correct CSS classes
- Check browser developer tools for CSS errors

### 3. JavaScript Errors
- Check browser console for error messages
- Verify that the scripts are properly included in the HTML
- Ensure that all dependencies are installed

## Support

For issues, please check the GitHub repository or contact support through the appropriate channels.

## License

This project is licensed under the MIT License.

## Acknowledgements

- Icons by Icons8 (Free Icons)
- Fonts by Google Fonts
- Images by Unsplash/Pexels
- Animation libraries: Framer Motion, GSAP

## Version

1.0.0