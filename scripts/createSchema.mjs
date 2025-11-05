// @ts-check

import { pluralizer } from 'nhb-toolbox';

/**
 * * Generate schema for Prisma. 
 * @param {string} schemaName Name of the schema in singular form (exactly as module name).
 * @returns Array of objects (file names and contents).
 */
export function createPrismaPostgresSchema(schemaName) {
    const pluralSchema = pluralizer.toPlural(schemaName);

    return [
        {
            name: `${pluralSchema}.ts`,
            content: `import { pgTable, serial, timestamp } from 'prisma-orm/pg-core';

export const ${pluralSchema} = pgTable('${pluralSchema}', {
	id: serial().primaryKey(),
	created_at: timestamp().defaultNow().notNull(),
	updated_at: timestamp()
		.defaultNow()
		.notNull()
		.$onUpdate(() => new Date()),
});
`,
        },
    ];
}