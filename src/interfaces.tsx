export type Label = { name: string; color: string };

export type Item = {
  id: string;
  description: string;
  completed: boolean;
  label?: Label[];
};

export type List = { name: string; id: string; items: Item[] };

export type Board = { name: string; id: string; lists: List[] };
