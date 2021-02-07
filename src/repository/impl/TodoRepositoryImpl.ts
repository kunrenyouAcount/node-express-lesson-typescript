import { Todo } from '../../model/Todo';
import { Connection } from 'mysql';
import { TodoRepository } from '../TodoRepository'

export class TodoRepositoryImpl implements TodoRepository {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  getAll(): Promise<Todo[]> {
    const sql = 'select * from todos';
    return new Promise<Todo[]>((resolve, reject) => {
      this.connection.query(sql, (err, results) => {
        const todos: Todo[] = results.map((todo: any) => {
          return {
            id: todo.id,
            title: todo.title,
            description: todo.description,
          } as Todo;
        });
        return err ? reject(err.message) : resolve(todos);
      });
    });
  }
  
  get(id:number): Promise<Todo> {
    const sql = 'select * from todos where ?';
    return new Promise<Todo>((resolve, reject) => {
      this.connection.query(sql, {id: id}, (err, results) => {
        const todos: Todo[] = results.map((todo: any) => {
          return {
            id: todo.id,
            title: todo.title,
            description: todo.description,
          } as Todo;
        });
        return err ? reject(err.message) : resolve(todos[0]);
      });    
    });
  }

  create(todo: Todo): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const sql = 'insert into todos set ?';
      this.connection.query(sql, todo, (err, result) => {
        return err ? reject(err.message) : resolve(result.insertId);
      });
    });
  }

  update(id: number, todo: Todo): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const sql = 'update todos set ? where ?';
      this.connection.query(sql, [todo, {id: id}], (err) => {
        return err ? reject(err.message) : resolve('');
    });
  });
  }

  delete(id: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const sql = 'delete from todos where ?';
      this.connection.query(sql, {id: id}, (err) => {
        return err ? reject(err.message) : resolve('');
      });
    });
  }
}