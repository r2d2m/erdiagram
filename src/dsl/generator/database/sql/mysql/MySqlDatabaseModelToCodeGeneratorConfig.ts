import {StandardIdNamingStrategies} from '@/dsl/generator/common/id-naming-strategy';
import {EntityPropertyType} from '@/dsl/parser/statement/statement-types-parse-functions';
import StandardCaseFormats from '@/dsl/generator/common/case-format/StandardCaseFormats';
import DatabaseModelToCodeConverterConfig from '@/dsl/generator/database/sql/DatabaseModelToCodeConverterConfig';

export default interface MySqlDatabaseModelToCodeGeneratorConfig extends DatabaseModelToCodeConverterConfig {

}

export const defaultMySqlDatabaseModelToCodeConverterConfig: MySqlDatabaseModelToCodeGeneratorConfig = {
	idColumnType: EntityPropertyType.LONG,
	idNamingStrategy: StandardIdNamingStrategies.DEFAULT,
	typesMap: {
		[EntityPropertyType.TEXT]: 'VARCHAR',
		[EntityPropertyType.LONG]: 'BIGINT',
		[EntityPropertyType.INT]: 'INT',
		[EntityPropertyType.SHORT]: 'SHORT',
		[EntityPropertyType.DECIMAL]: 'DECIMAL',
		[EntityPropertyType.BOOLEAN]: 'BOOLEAN',
		[EntityPropertyType.DATE]: 'DATE',
		[EntityPropertyType.TIME]: 'TIME',
		[EntityPropertyType.DATETIME]: 'TIMESTAMP'
	},
	tableCaseFormat: StandardCaseFormats.UPPER_CAMEL,
	columnCaseFormat: StandardCaseFormats.LOWER_CAMEL,
	// constraintCaseFormat: StandardCaseFormats.JOINING_UNDERSCORE,
};

export function mergeWithDefaultConfig(config?: Partial<MySqlDatabaseModelToCodeGeneratorConfig>): MySqlDatabaseModelToCodeGeneratorConfig {
	return {
		...defaultMySqlDatabaseModelToCodeConverterConfig,
		...config,
		typesMap: {
			...defaultMySqlDatabaseModelToCodeConverterConfig.typesMap,
			...config?.typesMap
		}
	};
}
