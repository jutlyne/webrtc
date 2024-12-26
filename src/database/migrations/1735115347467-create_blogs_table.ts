import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
} from 'typeorm';

export class CreateBlogsTable1735115347467 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'blogs',
				columns: [
					{
						name: 'id',
						type: 'bigint',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'user_id',
						type: 'bigint',
						isNullable: false,
					},
					{
						name: 'title',
						type: 'varchar',
						length: '255',
						isNullable: false,
					},
					{
						name: 'slug',
						type: 'varchar',
						length: '255',
						isNullable: false,
					},
					{
						name: 'short_text',
						type: 'varchar',
						length: '255',
						isNullable: false,
					},
					{
						name: 'read_minutes',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'image',
						type: 'varchar',
						length: '255',
						isNullable: false,
					},
					{
						name: 'body',
						type: 'longtext',
						isNullable: false,
					},
					{
						name: 'is_displayed',
						type: 'boolean',
						default: true,
					},
					{
						name: 'order',
						type: 'int',
						default: 0,
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
			'blogs',
			new TableForeignKey({
				columnNames: ['user_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'users',
				onDelete: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const table = (await queryRunner.getTable('blogs'))!;
		const foreignKey = table.foreignKeys.find(
			(fk) => fk.columnNames.indexOf('user_id') !== -1,
		)!;
		await queryRunner.dropForeignKey('blogs', foreignKey);
		await queryRunner.dropTable('blogs');
	}
}
