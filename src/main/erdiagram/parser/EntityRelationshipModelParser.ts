import {
	parseEntityNameStatement,
	parseEntityPropertyStatement,
	parseRelationshipStatement
} from '@/erdiagram/parser/statement/statement-types-parse-functions';
import {guessStatementType, StatementType} from '@/erdiagram/parser/statement/statement-type-guesser';
import {
	EntityDescriptor,
	EntityRelationshipModel,
	RelationshipDescriptor
} from '@/erdiagram/parser/entity-relationship-model-types';
import EntityRelationshipModelParserConfig, {mergeWithDefaultEntityRelationshipModelParserConfig} from '@/erdiagram/parser/EntityRelationshipModelParserConfig';

export default class EntityRelationshipModelParser {

	private readonly config: EntityRelationshipModelParserConfig;

	constructor(config?: Partial<EntityRelationshipModelParserConfig>) {
		this.config = mergeWithDefaultEntityRelationshipModelParserConfig(config);
	}

	public parseModel(code: string): EntityRelationshipModel {
		return this.parseEntityRelationshipModel(code);
	}

	private parseEntityRelationshipModel(code: string): EntityRelationshipModel {

		const lines = code.split('\n');

		const entities: EntityDescriptor[] = [];
		const relationships: RelationshipDescriptor[] = [];

		let parsingEntity = false;

		lines.forEach(line => {

			const statementType = guessStatementType(line);

			switch (statementType) {
				case StatementType.ENTITY_NAME:
					entities.push({
						name: parseEntityNameStatement(line),
						properties: []
					});
					parsingEntity = true;
					break;
				case StatementType.ENTITY_PROPERTY:
					if (!parsingEntity) {
						throw new Error('Unexpected entity property statement');
					}
					const lastEntity = entities[entities.length - 1];
					const entityPropertyDescriptor = parseEntityPropertyStatement(line);
					lastEntity.properties.push(entityPropertyDescriptor);
					break;
				case StatementType.RELATIONSHIP:
					const relationshipDescriptor = parseRelationshipStatement(line);
					relationships.push(relationshipDescriptor);
					parsingEntity = false;
					break;
				case StatementType.BLANK_LINE:
				case StatementType.COMMENT:
					// Ignore
					break;
				default:
					throw new Error(`Unknown statement type (${statementType}) for line: ${line}`);
			}

		});

		const model: EntityRelationshipModel = {
			entities,
			relationships
		};

		this.validateModel(model);

		return model;

	}

	private validateModel(model: EntityRelationshipModel) {

		if (this.config.allowUnknownEntities) {
			return;
		}

		const entityNames = model.entities.map(e => e.name);

		model.relationships.forEach(r => {
			if (!entityNames.includes(r.leftMember.entity)) {
				throw new Error(`Uknown entity in relationship's left side: ${r.leftMember.entity}`);
			}
			if (!entityNames.includes(r.rightMember.entity)) {
				throw new Error(`Uknown entity in relationship's right side: ${r.rightMember.entity}`);
			}
		});

	}

}
