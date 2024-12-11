import { plainToInstance, ClassConstructor } from 'class-transformer';

const plainObject = <T, V>(
	dto: ClassConstructor<T>,
	entity: V | V[],
	excludeExtraneousValues = true,
) => {
	return plainToInstance(dto, entity, {
		excludeExtraneousValues,
		exposeUnsetFields: false,
	});
};

export { plainObject };
