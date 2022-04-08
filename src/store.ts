import { makeAutoObservable } from 'mobx';
import { Board } from './interfaces';
const { v4: uuidv4 } = require('uuid');
uuidv4();

class Store {
  boards: Board[] = [
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
  ];

  // newTodo: string = '';
  // constructor() {
  //   makeAutoObservable(this);
  // }

  // addTodo = () => {
  //   this.boards.push({
  //     title: this.newTodo,
  //     todos: [{ id: uuidv4() }],
  //   });
  //   this.newTodo = '';
  // };
}

export const store = new Store();
