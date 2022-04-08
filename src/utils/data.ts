const { v4: uuidv4 } = require('uuid');

export const initialState = [
  {
    name: 'Welcome Board',
    lists: [
      {
        name: 'Basics',
        items: [
          {
            id: uuidv4(),
            description: 'Welcome to Trello!',
            completed: false,
            label: [{ name: 'welcome', color: 'blue' }],
          },
          {
            id: uuidv4(),
            description: 'This is a card!',
            completed: false,
            label: [
              { name: 'welcome', color: 'blue' },
              { name: 'card', color: 'green' },
            ],
          },
        ],
      },
      {
        name: 'intermediate',
        items: [
          {
            id: uuidv4(),
            description: 'Welcome to Trello!',
            completed: false,
            label: [{ name: 'welcome', color: 'blue' }],
          },
          {
            id: uuidv4(),
            description: 'This is a card!',
            completed: false,
            label: [
              { name: 'welcome', color: 'blue' },
              { name: 'card', color: 'green' },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Work Board',
    lists: [
      {
        name: 'todo',
        items: [
          {
            id: uuidv4(),
            description: 'Create figma mockup',
            completed: false,
            label: [{ name: 'ui', color: 'green' }],
          },
          {
            id: uuidv4(),
            description: 'create page 1',
            completed: false,
            label: [
              { name: 'frontEnd', color: 'blue' },
              { name: 'card', color: 'green' },
            ],
          },
          {
            id: uuidv4(),
            description: 'create page 2',
            completed: false,
            label: [
              { name: 'frontEnd', color: 'blue' },
              { name: 'card', color: 'green' },
            ],
          },
        ],
      },
      {
        name: 'doing',
        items: [
          {
            id: uuidv4(),
            description: 'create custom component 4',
            completed: false,
            label: [{ name: 'welcome', color: 'blue' }],
          },
          {
            id: uuidv4(),
            description: 'create custom component 5',
            completed: false,
            label: [{ name: 'welcome', color: 'blue' }],
          },
          {
            id: uuidv4(),
            description: 'create custom component 6',
            completed: false,
            label: [{ name: 'welcome', color: 'blue' }],
          },
        ],
      },
      {
        name: 'done',
        items: [
          {
            id: uuidv4(),
            description: 'configure cra',
            completed: false,
            label: [{ name: 'welcome', color: 'blue' }],
          },
          {
            id: uuidv4(),
            description: 'create custom component 1',
            completed: false,
            label: [{ name: 'welcome', color: 'blue' }],
          },
          {
            id: uuidv4(),
            description: 'create custom component 2',
            completed: false,
            label: [{ name: 'welcome', color: 'blue' }],
          },
        ],
      },
    ],
  },
];
