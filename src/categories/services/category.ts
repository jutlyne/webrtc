import { IBaseService } from '@/shared/services/base';
import { Category } from '../entities/category.entity';

export interface ICategoryService extends IBaseService<Category> {
	getDetail(slug: string, limit: number): Promise<Category>;
}
