// @ts-check

import { defineScriptConfig } from 'nhb-scripts';

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
		templates: {},
	},
});
