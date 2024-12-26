import { User } from '@/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class UserSeeder1733888075379 implements Seeder {
	track = false;

	public async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager,
	): Promise<any> {
		const repository = dataSource.getRepository(User);
		await repository.delete({});
		await repository.insert([
			{
				username: 'jutlyne',
				email: 'user@gmail.com',
				password: 'Matkhau@123',
				status: 1,
			},
		]);
	}
}
