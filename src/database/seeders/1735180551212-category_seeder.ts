import { Category } from '@/categories/entities/category.entity';
import { categories } from '@/shared/constants/common.constant';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class CategorySeeder1735180551212 implements Seeder {
	track = false;

	public async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager,
	): Promise<any> {
		const repository = dataSource.getRepository(Category);
		await repository.delete({});
		const categoryData = categories.map((category) => {
			return {
				name: category,
				slug: category,
			};
		});
		await repository.insert(categoryData);
	}
}
