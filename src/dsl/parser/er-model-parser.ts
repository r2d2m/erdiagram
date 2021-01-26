import {
	BaseDescriptor,
	EntityDescriptor,
	parseEntityNameStatement,
	parseEntityPropertyStatement,
	parseMetadataStatement,
	parseRelationshipStatement,
	RelationshipDescriptor
} from './statement/statement-types-parse-functions';
import {guessStatementType, StatementType} from './statement/statement-type-guesser';

export interface EntityRelationshipModel {
	entities: EntityDescriptor[];
	relationships: RelationshipDescriptor[];
}

export function parseEntityRelationshipModel(code: string): EntityRelationshipModel {

	const lines = code.split('\n');

	const entities: EntityDescriptor[] = [];
	const relationships: RelationshipDescriptor[] = [];

	let lastDescriptorRead: BaseDescriptor | null = null;
	let parsingEntity = false;

	lines.forEach(line => {

		const statementType = guessStatementType(line);

		switch (statementType) {
			case StatementType.ENTITY_NAME:
				const entityDescriptor = {
					name: parseEntityNameStatement(line),
					properties: [],
					metadata: []
				};
				entities.push(entityDescriptor);
				lastDescriptorRead = entityDescriptor;
				parsingEntity = true;
				break;
			case StatementType.ENTITY_PROPERTY:
				if (!parsingEntity) {
					throw new Error('Unexpected entity property statement');
				}
				const lastEntity = entities[entities.length - 1];
				const entityPropertyDescriptor = parseEntityPropertyStatement(line);
				lastEntity.properties.push(entityPropertyDescriptor);
				lastDescriptorRead = entityPropertyDescriptor;
				break;
			case StatementType.RELATIONSHIP:
				const relationshipDescriptor = parseRelationshipStatement(line);
				relationships.push(relationshipDescriptor);
				lastDescriptorRead = relationshipDescriptor;
				parsingEntity = false;
				break;
			case StatementType.METADATA:
				if (lastDescriptorRead == null) {
					throw new Error('Unexpected metadata statement');
				}
				const metadata = parseMetadataStatement(line);
				lastDescriptorRead.metadata.push(metadata);
				break;
			case StatementType.BLANK_LINE:
			case StatementType.COMMENT:
				// Ignore
				break;
			default:
				throw new Error('Unknown statement type: ' + statementType);
		}

	});

	return validateModel({
		entities,
		relationships
	});

}

function validateModel(model: EntityRelationshipModel) {

	const entityNames = model.entities.map(e => e.name);

	model.relationships.forEach(r => {
		if (!entityNames.includes(r.leftMember.entity)) {
			throw new Error(`Uknown entity in relationship's left side: ${r.leftMember.entity}`);
		}
		if (!entityNames.includes(r.rightMember.entity)) {
			throw new Error(`Uknown entity in relationship's right side: ${r.rightMember.entity}`);
		}
	});

	return model;

}
