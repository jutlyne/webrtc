import 'reflect-metadata';

export function ControllerDecorator(
	target: any,
	propertyKey: string,
	descriptor: PropertyDescriptor,
) {
	const originalMethod = descriptor.value;

	descriptor.value = function (...args: any[]) {
		return originalMethod.apply(this, args);
	};

	return descriptor;
}
