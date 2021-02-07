import { Todo } from '../model/Todo';

//仕様書を仕様書を作りたい場合インターフェイスを作る

export interface TodoRepository {
  getAll(): Promise<Todo[]>;
  get(id: number): Promise<Todo>;
  create(todo: Todo): Promise<string>;
  update(id: number, todo: Todo): Promise<string>;
  delete(id: number): Promise<string>;
}
