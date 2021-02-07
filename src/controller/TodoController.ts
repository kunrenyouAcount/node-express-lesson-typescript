import { NextFunction, Request, Response, Router } from 'express';
import { TodoService } from '../service/TodoService';

export class TodoController {
  //routerは外部から参照するので、privateにしない
  router: Router;
  private todoService: TodoService;
  
  constructor(todoService: TodoService) {
    this.router = Router();
    this.todoService = todoService;

    // todoを全件取得する
    this.router.get('/todos', async (req: Request, res: Response, next: NextFunction) => {
      const todos = await todoService.getAll().catch((err) => {
        console.log(err);
        res.status(500).send(err);
        return;
      });
      res.json(todos);
    });

    // todo1件を取得する
    this.router.get("/todos/:id",async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);
      const todo = await todoService.get(id).catch((err) => {
        console.log(err);
        res.status(500).send(err);
        return;
      });
      res.json(todo);
    });

    // todo1件を作成する
    this.router.post("/todos",async (req: Request, res: Response, next: NextFunction) => {
      const todo = req.body;
      const result = await todoService.create(todo).catch((err) => {
        console.log(err);
        res.status(500).send(err);
        return;
      });
      res.status(201).json(result);
    });

    // todo1件を更新する
    this.router.put("/todos/:id",async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);
      const todo = req.body;
      await todoService.update(id, todo).catch((err) => {
        console.log(err);
        res.status(500).send(err);
        return;
      });
      res.status(200).send();
    });

    // todo1件を削除する
    this.router.delete("/todos/:id",async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);
      await todoService.delete(id).catch((err) => {
        console.log(err);
        res.status(500).send(err);
        return;
      });
      res.status(204).send();
    });
  }
}