import { defineConfig } from 'jsrepo';
import { fs } from 'jsrepo/providers';

export default defineConfig({
  providers: [fs()],
  registries: ['fs://C:/Users/loqev/Documents/diego/cursos/angular/evodata-registry'],
  paths: {
		blocks: 'src/app/shared/blocks',
		components: 'src/app/shared/components',
		utils: 'src/app/shared/utils',
		lib: 'src/app/shared'
	},
});
