import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import {
	TableColumnDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/generator/database/model/database-model-types';
import ForeignKeyColumnCode
	from '@/erdiagram/generator/database/code-converter/oracle/column/types/ForeignKeyColumnCode';
import OracleColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/oracle/column/OracleColumnCodeGenerator';
import CaseConverter from '@/erdiagram/generator/common/case-format/CaseConverter';

export default class OracleForeignColumnCodeGenerator {

	constructor(
			private readonly columnCodeGenerator: OracleColumnCodeGenerator,
			private readonly tableNameCaseConverter: CaseConverter,
			private readonly columnNameCaseConverter: CaseConverter
	) {

	}

	public generateForeignColumnCode(outputTableName: string, reference: TableReferenceDescriptor): ForeignKeyColumnCode {

		const columnDescriptor = this.createForeignKeyColumnDescriptor(reference);

		const {
			columnLine,
			uniqueConstraintLine
		} = this.columnCodeGenerator.generateColumnCode(outputTableName, columnDescriptor);

		return {
			columnLine,
			uniqueConstraintLine,
			fkConstraintLine: this.createForeignKeyConstraint(outputTableName, reference)
		};

	}

	private createForeignKeyColumnDescriptor(reference: TableReferenceDescriptor): TableColumnDescriptor {

		const {
			columnName,
			notNull,
			unique
		} = reference;

		return {
			name: columnName,
			type: EntityPropertyType.IDENTIFIER,
			length: [],
			notNull,
			unique,
			autoincremental: false
		};

	}

	private createForeignKeyConstraint(outputTableName: string, reference: TableReferenceDescriptor) {

		const outputColumnName = this.columnNameCaseConverter.convertCase(reference.columnName);

		const outputTargetTableName = this.tableNameCaseConverter.convertCase(reference.targetTableName);
		const outputTargetColumnName = this.columnNameCaseConverter.convertCase(reference.targetTableIdentifierColumnName);

		return `CONSTRAINT "${outputTableName}_${outputColumnName}_FK" FOREIGN KEY ("${outputColumnName}")`
				+ ` REFERENCES "${outputTargetTableName}" ("${outputTargetColumnName}")`;

	}

}
