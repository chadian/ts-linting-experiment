import maxUsageRule from './meta-rules/max-usage';
import { resolve } from 'path';
import { existsSync as fileExists } from 'fs';

export class Rule extends maxUsageRule({
  ruleName: 'use-sparingly',
  maxCallCount: 4,
  matchesImportSignature: (path: string, exportedName: string) => {
    let trackedPath = resolve(__dirname, '../src', 'someCrazyImplementation');
    let trackedExportName = 'default';

    if (!fileExists(`${trackedPath}.ts`)) {
    	throw `{this.ruleName} can't track usage against non-existing file: ${trackedPath}`;
    }

    // path is including double-quotes from symbol so
    // we wrap out trackedPath with double-quotes for comparison
    return `"${trackedPath}"` === path && trackedExportName === exportedName;
  }
}) {}
