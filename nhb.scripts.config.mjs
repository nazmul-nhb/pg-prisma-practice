// @ts-check

import { defineScriptConfig, runExeca, updateCollection, updateRoutes } from 'nhb-scripts';
import { createPrismaPostgresSchema } from './scripts/createSchema.mjs';
import { expressPrismaPostgresTemplate } from './scripts/moduleTemplate.mjs';

export default defineScriptConfig({
	format: {
		args: ['--write'],
		files: ['src', 'nhb.scripts.config.mjs'],
		ignorePath: '.prettierignore',
	},
	lint: { folders: ['src'], patterns: ['**/*.ts'] },
	fix: { folders: ['src'], patterns: ['**/*.ts'] },
	commit: {
		runFormatter: true,
		emojiBeforePrefix: true,
		wrapPrefixWith: '`',
	},
	build: {
		distFolder: 'dist',
		commands: [{ cmd: 'tsc' }, { cmd: 'tsc-alias' }],
	},
	count: {
		defaultPath: 'src',
		excludePaths: ['node_modules', 'dist', 'generated', 'prisma', 'public'],
	},
	module: {
		force: false,
		destination: 'src/app/modules',
		defaultTemplate: 'express-prisma-postgres',
		templates: {
			'express-prisma-postgres': {
				createFolder: true,
				destination: 'src/app/modules',
				files: expressPrismaPostgresTemplate,
				onComplete: (moduleName) => {
					updateCollection(moduleName);
					updateRoutes(moduleName, true);
				},
			},
			'prisma-postgres-schema': {
				createFolder: false,
				destination: 'prisma',
				files: createPrismaPostgresSchema,
				onComplete: () => {
					runExeca('prisma', ['generate']);
				},
			},
		},
	},
});
