export type Label = { name: string; color: string };

export type Item = {
  id: string;
  description: string;
  completed: boolean;
  label?: Label[];
};

export type List = { name: string; items: Item[] };

export type Board = { name: string; lists: List[] };
