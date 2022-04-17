const { v4: uuidv4 } = require('uuid');

export const initialState = [
  {
    name: 'Welcome Board',
    id: uuidv4(),
    lists: [
      {
        name: 'Basics',
        id: uuidv4(),
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
          {
            id: uuidv4(),
            description: 'card 3 !',
            completed: false,
            label: [{ name: 'welcome', color: 'blue' }],
          },
          {
            id: uuidv4(),
            description: 'card 4 !',
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
        id: uuidv4(),
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
    name: 'Welcome Board2',
    id: uuidv4(),
    lists: [
      {
        name: 'Basics',
        id: uuidv4(),
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
        id: uuidv4(),
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
    name: 'Welcome Board3',
    id: uuidv4(),
    lists: [],
  },
];
