/**
 * Spread Types
 * 
 * This file defines the different tarot spread layouts available in the application.
 * Each spread includes:
 * - name: The name of the spread
 * - description: Brief explanation of the spread's purpose and meaning
 * - positions: Array of position objects, each with a name and meaning
 * - layout: Object with layout information for rendering
 */

const spreadTypes = [
  {
    id: 'single-card',
    name: 'Single Card',
    description: 'A simple one-card draw for daily guidance or to answer a specific question.',
    positions: [
      {
        id: 'single',
        name: 'Guidance',
        meaning: 'Represents guidance, insight, or an answer to your question.'
      }
    ],
    layout: {
      type: 'linear',
      cardCount: 1
    }
  },
  {
    id: 'three-card',
    name: 'Past, Present, Future',
    description: 'A three-card spread that examines the influence of the past, the current situation, and the potential future outcome.',
    positions: [
      {
        id: 'past',
        name: 'Past',
        meaning: 'Influences from the past that have shaped the current situation.'
      },
      {
        id: 'present',
        name: 'Present',
        meaning: 'Current energies, challenges, or opportunities that are active now.'
      },
      {
        id: 'future',
        name: 'Future',
        meaning: 'Potential outcomes or energies that are developing if the current course is maintained.'
      }
    ],
    layout: {
      type: 'linear',
      cardCount: 3
    }
  },
  {
    id: 'celtic-cross',
    name: 'Celtic Cross',
    description: 'A comprehensive ten-card spread that examines multiple facets of a situation including influences, hopes, fears, and outcomes.',
    positions: [
      {
        id: 'present',
        name: 'Present',
        meaning: 'The current situation or the question at hand.'
      },
      {
        id: 'challenge',
        name: 'Challenge',
        meaning: 'The immediate challenge or obstacle crossing the situation.'
      },
      {
        id: 'foundation',
        name: 'Foundation',
        meaning: 'The basis of the situation, what has led to the current circumstances.'
      },
      {
        id: 'past',
        name: 'Recent Past',
        meaning: 'Events from the recent past that are still having an influence.'
      },
      {
        id: 'crown',
        name: 'Potential/Outcome',
        meaning: 'The best outcome that could be achieved.'
      },
      {
        id: 'future',
        name: 'Near Future',
        meaning: 'Events that are coming in the immediate future.'
      },
      {
        id: 'self',
        name: 'Self',
        meaning: 'Your attitude and approach to the situation.'
      },
      {
        id: 'environment',
        name: 'Environment',
        meaning: 'External influences, including other people\'s attitudes.'
      },
      {
        id: 'hopes',
        name: 'Hopes/Fears',
        meaning: 'Your inner hopes and fears about the situation.'
      },
      {
        id: 'outcome',
        name: 'Final Outcome',
        meaning: 'The ultimate resolution if the current path is followed.'
      }
    ],
    layout: {
      type: 'celtic-cross',
      cardCount: 10
    }
  },
  {
    id: 'relationship',
    name: 'Relationship Spread',
    description: 'A five-card spread focused on relationship dynamics, examining both individuals and their connection.',
    positions: [
      {
        id: 'self',
        name: 'You',
        meaning: 'Your energy and attitude in the relationship.'
      },
      {
        id: 'partner',
        name: 'Partner',
        meaning: 'Your partner\'s energy and attitude in the relationship.'
      },
      {
        id: 'connection',
        name: 'Connection',
        meaning: 'The nature of your connection and what brings you together.'
      },
      {
        id: 'challenge',
        name: 'Challenge',
        meaning: 'The primary challenge or growth area in the relationship.'
      },
      {
        id: 'outcome',
        name: 'Potential',
        meaning: 'The potential for this relationship if current energies continue.'
      }
    ],
    layout: {
      type: 'cross',
      cardCount: 5
    }
  },
  {
    id: 'career-path',
    name: 'Career Path',
    description: 'A six-card spread that examines your career trajectory, obstacles, and opportunities.',
    positions: [
      {
        id: 'current',
        name: 'Current Position',
        meaning: 'Your current career situation or mindset.'
      },
      {
        id: 'desire',
        name: 'Desire',
        meaning: 'What you truly want from your career path.'
      },
      {
        id: 'obstacle',
        name: 'Obstacle',
        meaning: 'The primary challenge or block you need to overcome.'
      },
      {
        id: 'help',
        name: 'Help',
        meaning: 'Resources, people, or attitudes that can help you.'
      },
      {
        id: 'action',
        name: 'Action',
        meaning: 'Steps you should take to advance your career.'
      },
      {
        id: 'outcome',
        name: 'Outcome',
        meaning: 'The potential result if you follow this guidance.'
      }
    ],
    layout: {
      type: 'pyramid',
      cardCount: 6
    }
  }
];

export default spreadTypes;
