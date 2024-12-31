import { NextFunction, Request, Response } from 'express';

export interface IBlogController {
	index(req: Request, res: Response, next: NextFunction): Promise<void>;
	store(req: Request, res: Response, next: NextFunction): Promise<void>;
	detail(req: Request, res: Response, next: NextFunction): Promise<void>;
}
