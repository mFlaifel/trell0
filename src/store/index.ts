import { action, makeObservable, observable } from 'mobx';
import { Board } from '../interfaces';
const { v4: uuidv4 } = require('uuid');

class Store {
  boards: Board[] = [
    {
      name: 'Welcome Board',
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
      name: 'Welcome Board2',
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
  ];

  constructor() {
    makeObservable(this, {
      boards: observable,
      addBoard: action,
      addList: action,
      addCard: action,
    });
  }

  addBoard(name: string) {
    this.boards.push({ name: name, lists: [] });
  }

  addList(boardIndex: number, name: string) {
    this.boards[boardIndex].lists.push({ name: name, id: uuidv4(), items: [] });
  }

  addCard(boardIndex: number, listIndex: number, description: string) {
    this.boards[boardIndex].lists[listIndex].items.push({
      id: uuidv4(),
      description,
      completed: false,
      label: [],
    });
  }
}

export const store = new Store();
