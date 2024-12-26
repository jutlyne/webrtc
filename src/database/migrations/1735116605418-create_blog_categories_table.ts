import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
} from 'typeorm';

export class CreateBlogCategoriesTable1735116605418
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'blog_categories',
				columns: [
					{
						name: 'id',
						type: 'bigint',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'blog_id',
						type: 'bigint',
						isNullable: false,
					},
					{
						name: 'category_id',
						type: 'bigint',
						isNullable: false,
					},
				],
			}),
		);

		await queryRunner.createForeignKeys('blog_categories', [
			new TableForeignKey({
				columnNames: ['blog_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'blogs',
				onDelete: 'CASCADE',
			}),
			new TableForeignKey({
				columnNames: ['category_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'categories',
				onDelete: 'CASCADE',
			}),
		]);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const table = (await queryRunner.getTable('blog_categories'))!;
		for (const fkey of ['blog_id', 'category_id']) {
			const foreignKey = table.foreignKeys.find(
				(fk) => fk.columnNames.indexOf(fkey) !== -1,
			)!;

			await queryRunner.dropForeignKey('blog_categories', foreignKey);
		}
		await queryRunner.dropTable('blog_categories');
	}
}
