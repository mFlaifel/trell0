import { makeAutoObservable } from 'mobx';
import { Board } from '../interfaces';
const { v4: uuidv4 } = require('uuid');

class Store {
  boards: Board[] = [
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
  ];

  constructor() {
    makeAutoObservable(this);
  }

  addBoard(name: string) {
    this.boards.push({ name: name, id: uuidv4(), lists: [] });
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

  moveBoard(sourceIndex: number, destinationIndex: number) {
    if (sourceIndex === destinationIndex) return;
    const tempBoards = [...this.boards];
    const [itemToMove] = tempBoards.splice(sourceIndex, 1);
    tempBoards.splice(destinationIndex, 0, itemToMove);
    this.boards = tempBoards;
  }
}

export const store = new Store();
