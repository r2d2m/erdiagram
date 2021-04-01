import {
	EntityDescriptor,
	EntityPropertyDescriptor,
	EntityPropertyType
} from '@/erdiagram/parser/entity-relationship-model-types';

export function createEntityWithoutProperties(name: string): EntityDescriptor {
	return {
		name,
		identifierPropertyName: undefined,
		properties: []
	};
}

export type PartialEntityPropertyDescriptor = Partial<Omit<EntityPropertyDescriptor, 'name' | 'type'>>;

export function createEntityProperty(name: string, type: EntityPropertyType, options?: PartialEntityPropertyDescriptor): EntityPropertyDescriptor {
	return {
		name,
		type,
		length: options?.length ?? [],
		optional: options?.optional ?? false,
		unique: options?.unique ?? false,
		autoincremental: options?.autoincremental ?? false
	};
}

export function createSimpleEntityProperty(name: string, type: EntityPropertyType, length: number[] = []): EntityPropertyDescriptor {
	return {
		name,
		type,
		length,
		optional: false,
		unique: false,
		autoincremental: false
	};
}
