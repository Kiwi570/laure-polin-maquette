import { defineWixConfig } from '@wix/cli/config';
import { wixCodeDiagnosticsPlugin } from '@wix/wix-code-diagnostics-plugin';

export default defineWixConfig({
  config: {
    projectType: 'App',
    appId: '34aae9b7-ecbb-4c09-9832-6a04eb42271d',
    projectId: 'WIX_CODE',
    codeIdentifier: 'companionApp',
  },
  plugins: [wixCodeDiagnosticsPlugin()],
});
