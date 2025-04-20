# TarotLyfe Style Guide

This document outlines the visual style patterns and component design guidelines for maintaining a consistent look and feel across the TarotLyfe application.

## Color Palette

### Primary Colors
- Background: Black/Dark (`bg-black`, `bg-gray-900`)
- Text: White/Light Gray (`text-white`, `text-gray-300`)
- Accent Gradients: Purple to Indigo (`from-purple-600 to-indigo-600`)

### Secondary Colors
- Purple accents: `text-purple-400`, `text-purple-300`, `border-purple-500/30`
- Indigo accents: `text-indigo-400`, `text-indigo-300`, `border-indigo-500/50`
- Blue accents: `text-blue-400`, `text-blue-300`, `border-blue-500/30`
- Cyan accents: `text-cyan-400`, `text-cyan-300`, `border-cyan-500/30`

### Background Elements
- Card backgrounds: `bg-gray-900`
- Subtle backgrounds: `bg-background/80 backdrop-blur-sm`
- Icon backgrounds: `bg-purple-900/80`, `bg-indigo-900/80`, `bg-blue-900/80`, `bg-cyan-900/80`

## Typography

### Headings
- Main headings: `text-3xl md:text-4xl font-bold tracking-tight`
- Section headings: `text-2xl font-bold`
- Card headings: `text-xl font-semibold`

### Body Text
- Regular text: `text-gray-300`
- Supporting text: `text-gray-400`, `text-sm`
- Pricing text: `text-3xl font-bold` (for prices)

### Text Accents
- Gradient text: `bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text`
- Brand text: `text-2xl font-bold` with gradient

## Component Patterns

### Section Layout
- Vertical padding: `py-16 md:py-24`
- Container: `container`
- Heading area: `text-center mb-12 md:mb-16`
- Card grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4` or `grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8`

### Cards
- Base card: `Card` component with `hover:shadow-lg transition-all duration-300`
- Card borders: `border-purple-500/30 hover:border-purple-500/50`
- Card content: `p-6 flex flex-col items-center text-center`
- Card hover effect: `group hover:shadow-lg transition-all duration-300`

### Icons
- Icon containers: `w-12 h-12 rounded-full bg-[color]-900/80 flex items-center justify-center mb-4`
- Icons: `w-6 h-6 text-[color]-300` (Lucide icons)
- Hover effect: `group-hover:bg-[color]-800 transition-colors`

### Buttons
- Primary: `Button` component 
- Gradient button: `bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700`
- Outline: `Button variant='outline'`
- Full width: `w-full`
- Size variants: `size='sm'`

### Feature Lists
- List items: `space-y-3 mb-8`
- List item with icon: `flex items-start`
- Checkmark: `Check` icon with `w-5 h-5 text-[color]-400 mr-2 shrink-0`

### Highlight Elements
- Badges: `px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-xs font-semibold text-white`
- Accent boxes: `inline-block p-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg` with inner div `bg-gray-900 rounded-md px-6 py-2`

### Navigation
- Fixed header: `py-4 border-b bg-background/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50`
- Nav items: `text-sm font-medium hover:text-primary/80 transition-colors`
- Mobile menu toggle: `md:hidden p-2`

## Layout Patterns

### Responsive Patterns
- Mobile first approach with md/lg breakpoints
- Mobile: Single column (`grid-cols-1`)
- Tablet: Two to three columns (`md:grid-cols-2`, `md:grid-cols-3`)
- Desktop: Three to four columns (`lg:grid-cols-4`)

### Special Effects
- Featured item highlight: `scale-105 z-10` (used in pricing for the popular plan)
- Gradient borders: Border with gradient background and inner element
- Hover transitions: `transition-all duration-300`
- Backdrop blur: `backdrop-blur-sm` for semi-transparent elements

## Animation Guidelines
- Subtle hover effects: 
  - Color transitions: `transition-colors`
  - Shadow effects: `hover:shadow-lg`
  - Border color changes: `hover:border-[color]-500/50`
- Avoid excessive animations that could distract from the reflective nature of the app

## Examples

### Section Header Pattern
```jsx
<div className="text-center mb-12 md:mb-16">
  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
    Section Title with{' '}
    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
      Gradient Accent
    </span>
  </h2>
  <p className="text-lg text-gray-300 max-w-2xl mx-auto">
    Descriptive text that explains the purpose of this section.
  </p>
</div>
```

### Card Pattern
```jsx
<Card className="group hover:shadow-lg transition-all duration-300 border-purple-500/30 hover:border-purple-500/50 bg-gray-900">
  <CardContent className="p-6 flex flex-col items-center text-center">
    <div className="w-12 h-12 rounded-full bg-purple-900/80 flex items-center justify-center mb-4 group-hover:bg-purple-800 transition-colors">
      <Icon className="w-6 h-6 text-purple-300" />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-white">
      Card Title
    </h3>
    <p className="text-gray-300">
      Card description text goes here.
    </p>
  </CardContent>
</Card>
```

### Feature List Pattern
```jsx
<ul className="space-y-3 mb-8">
  <li className="flex items-start">
    <Check className="w-5 h-5 text-purple-400 mr-2 shrink-0" />
    <span className="text-gray-300">Feature description here</span>
  </li>
  {/* Additional items */}
</ul>
```

### Accent Box Pattern
```jsx
<div className="mt-16 text-center">
  <div className="inline-block p-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg">
    <div className="bg-gray-900 rounded-md px-6 py-2">
      <p className="text-sm font-medium text-white">
        Important message or call to action
      </p>
    </div>
  </div>
</div>
```

## Application Guidelines

When creating new sections or components for the TarotLyfe application:

1. Start with the basic section structure (container, heading area, content grid)
2. Use the appropriate card pattern for content blocks
3. Maintain the dark theme with gradient accents
4. Ensure responsive design works across all screen sizes
5. Apply consistent spacing (margins and padding)
6. Use the defined typography scale and color palette
7. Incorporate subtle animations and transitions for interactive elements

This style guide ensures a cohesive visual language throughout the application while maintaining the mystical and reflective theme appropriate for a tarot application.
