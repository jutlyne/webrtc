import { NextFunction, Request, Response } from 'express';

export interface ICategoryController {
	index(req: Request, res: Response, next: NextFunction): Promise<void>;
	detail(req: Request, res: Response, next: NextFunction): Promise<void>;
}
