import AbstractComponentConfigManager from '../../../../../common/config/AbstractComponentConfigManager';
import MySqlDatabaseModelToCodeConverterConfig from './MySqlDatabaseModelToCodeConverterConfig';
import MySqlDatabaseModelToCodeConverterSerializableConfig from './MySqlDatabaseModelToCodeConverterSerializableConfig';
export declare class MySqlDatabaseModelToCodeConverterConfigManager extends AbstractComponentConfigManager<MySqlDatabaseModelToCodeConverterConfig, Partial<MySqlDatabaseModelToCodeConverterConfig>, MySqlDatabaseModelToCodeConverterSerializableConfig> {
    getDefaultConfig(): MySqlDatabaseModelToCodeConverterConfig;
    mergeConfigs(fullConfig: MySqlDatabaseModelToCodeConverterConfig, partialConfig?: Partial<MySqlDatabaseModelToCodeConverterConfig>): MySqlDatabaseModelToCodeConverterConfig;
    convertToSerializableObject(fullConfig: MySqlDatabaseModelToCodeConverterConfig): MySqlDatabaseModelToCodeConverterSerializableConfig;
    convertFromSerializableObject(serializableConfig: MySqlDatabaseModelToCodeConverterSerializableConfig): MySqlDatabaseModelToCodeConverterConfig;
}
declare const mysqlDatabaseModelToCodeConverterConfigManager: MySqlDatabaseModelToCodeConverterConfigManager;
export default mysqlDatabaseModelToCodeConverterConfigManager;
//# sourceMappingURL=MysqlDatabaseModelToCodeConverterConfigManager.d.ts.map