import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
} from 'typeorm';

export class CreateBlogAnchorsTable1735116074958 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'blog_anchors',
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
						name: 'parent_id',
						type: 'bigint',
						isNullable: true,
					},
					{
						name: 'href',
						type: 'varchar',
						length: '255',
						isNullable: false,
					},
					{
						name: 'title',
						type: 'varchar',
						length: '255',
						isNullable: false,
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'now()',
					},
					{
						name: 'deleted_at',
						type: 'timestamp',
						isNullable: true,
					},
				],
			}),
		);
		await queryRunner.createForeignKey(
			'blog_anchors',
			new TableForeignKey({
				columnNames: ['blog_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'blogs',
				onDelete: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const table = (await queryRunner.getTable('blog_anchors'))!;
		const foreignKey = table.foreignKeys.find(
			(fk) => fk.columnNames.indexOf('blog_id') !== -1,
		)!;
		await queryRunner.dropForeignKey('blog_anchors', foreignKey);
		await queryRunner.dropTable('blog_anchors');
	}
}
