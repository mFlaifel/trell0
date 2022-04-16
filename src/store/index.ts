import { makeAutoObservable, toJS } from 'mobx';
import { Board, Item, ListInterface } from '../interfaces';
const { v4: uuidv4 } = require('uuid');

function findCard(id: string, items: Item[]) {
  const item = items.filter((item: Item) => `${item.id}` === id)[0];
  return {
    item,
    index: items.indexOf(item),
  };
}

function _moveListOrBoard(
  list: any,
  sourceIndex: number,
  destinationIndex: number
) {
  if (sourceIndex === destinationIndex) return false;
  const tempLists = [...list];
  if (destinationIndex === 0) {
    const [itemToMove] = tempLists.splice(sourceIndex, 1);
    tempLists.unshift(itemToMove);
    return tempLists;
  } else {
    const [itemToMove] = tempLists.splice(sourceIndex, 1);
    tempLists.splice(destinationIndex, 0, itemToMove);
    return tempLists;
  }
}
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
    console.log('sourceIndex', sourceIndex);
    console.log('destinationIndex', destinationIndex);
    if (sourceIndex === destinationIndex) return;
    const tempBoards = [...this.boards];
    const [itemToMove] = tempBoards.splice(sourceIndex, 1);
    tempBoards.splice(destinationIndex, 0, itemToMove);
    this.boards = tempBoards;
  }

  // moveItem(
  //   boardIndex: number,
  //   listIndex: number,
  //   sourceIndex: number,
  //   destinationIndex: number
  // ) {
  //   console.log('sourceIndex', sourceIndex);
  //   console.log('destinationIndex', destinationIndex);
  //   if (
  //     sourceIndex === destinationIndex ||
  //     typeof destinationIndex !== 'number'
  //   )
  //     return;
  //   const tempItems = [...this.boards[boardIndex].lists[listIndex].items];
  //   const [itemToMove] = tempItems.splice(sourceIndex, 1);
  //   tempItems.splice(destinationIndex, 0, itemToMove);
  //   this.boards[boardIndex].lists[listIndex].items = tempItems;
  //   console.log(toJS(this.boards[boardIndex].lists[listIndex].items));
  // }
  moveItem(
    boardIndex: number,
    listIndex: number,
    sourceId: string,
    destinationIndex: number
  ) {
    const { item, index } = findCard(
      sourceId,
      this.boards[boardIndex].lists[listIndex].items
    );
    if (index === -1) return;

    const tempItems = [...this.boards[boardIndex].lists[listIndex].items];
    tempItems.splice(index, 1);
    tempItems.splice(destinationIndex, 0, item);
    this.boards[boardIndex].lists[listIndex].items = tempItems;
  }

  moveItemToList(
    boardIndex: number,
    sourceListIndex: number,
    destinationListIndex: number,
    sourceId: string,
    destinationIndex: number
  ) {
    const { item, index } = findCard(
      sourceId,
      this.boards[boardIndex].lists[sourceListIndex].items
    );
    if (index === -1) return;
    const sourceTempItems = [
      ...this.boards[boardIndex].lists[sourceListIndex].items,
    ];
    const destTempItems = [
      ...this.boards[boardIndex].lists[destinationListIndex].items,
    ];
    sourceTempItems.splice(index, 1);
    destTempItems.splice(destinationIndex, 0, item);
    this.boards[boardIndex].lists[sourceListIndex].items = sourceTempItems;
    this.boards[boardIndex].lists[destinationListIndex].items = destTempItems;
    // console.log(toJS(this.boards[boardIndex].lists[listIndex].items));
  }

  moveList(boardIndex: number, sourceIndex: number, destinationIndex: number) {
    console.log({ sourceIndex, destinationIndex });
    if (sourceIndex === destinationIndex) return;
    // const tempLists = [...this.boards[boardIndex].lists];
    // const [itemToMove] = tempLists.splice(sourceIndex, 1);
    // tempLists.splice(destinationIndex, 0, itemToMove);
    // this.boards[boardIndex].lists = tempLists;
    const tempLists = _moveListOrBoard(
      [...this.boards[boardIndex].lists],
      sourceIndex,
      destinationIndex
    );
    if (tempLists) {
      this.boards[boardIndex].lists = tempLists;
    } else {
      return;
    }
  }
}

export const store = new Store();
