import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import StandardCaseFormats from '@/erdiagram/generator/common/case-format/StandardCaseFormats';
import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import MySqlDatabaseModelToCodeConverterConfig
	from '@/erdiagram/generator/database/code-converter/mysql/config/MySqlDatabaseModelToCodeConverterConfig';

export class MySqlDatabaseModelToCodeConverterConfigManager
		extends AbstractComponentConfigManager<MySqlDatabaseModelToCodeConverterConfig> {

	getDefaultConfig(): MySqlDatabaseModelToCodeConverterConfig {
		return {
			idColumnType: EntityPropertyType.LONG,
			typeMappings: {
				[EntityPropertyType.TEXT]: 'VARCHAR',
				[EntityPropertyType.LONG]: 'BIGINT',
				[EntityPropertyType.INT]: 'INT',
				[EntityPropertyType.SHORT]: 'SHORT',
				[EntityPropertyType.DECIMAL]: 'DECIMAL',
				[EntityPropertyType.BOOLEAN]: 'BOOLEAN',
				[EntityPropertyType.DATE]: 'DATE',
				[EntityPropertyType.TIME]: 'TIME',
				[EntityPropertyType.DATETIME]: 'TIMESTAMP',
				[EntityPropertyType.BLOB]: 'BLOB'
			},
			tableNameCaseFormat: StandardCaseFormats.UPPER_CAMEL,
			columnNameCaseFormat: StandardCaseFormats.LOWER_CAMEL,
		};
	}

	mergeConfigs(fullConfig: MySqlDatabaseModelToCodeConverterConfig, partialConfig?: Partial<MySqlDatabaseModelToCodeConverterConfig>): MySqlDatabaseModelToCodeConverterConfig {
		return {
			...fullConfig,
			...partialConfig,
			typeMappings: {
				...fullConfig.typeMappings,
				...partialConfig?.typeMappings
			}
		};
	}

	protected prepareBeforeSerializing(fullConfig: MySqlDatabaseModelToCodeConverterConfig): MySqlDatabaseModelToCodeConverterConfig {
		throw new Error('Method not implemented.');
	}

	protected processAfterDeserializing(serializedConfig: MySqlDatabaseModelToCodeConverterConfig): MySqlDatabaseModelToCodeConverterConfig {
		throw new Error('Method not implemented.');
	}

}

const mysqlDatabaseModelToCodeConverterConfigManager = new MySqlDatabaseModelToCodeConverterConfigManager();
export default mysqlDatabaseModelToCodeConverterConfigManager;
