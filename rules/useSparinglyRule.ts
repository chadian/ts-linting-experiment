import maxUsageRule from './meta-rules/max-usage';
import { resolve } from 'path';

export class Rule extends maxUsageRule({
  ruleName: 'use-sparingly',
  maxCallCount: 4,
  matchesImportSignature: (path: string, exportedName: string) => {
    let trackedPath = resolve(__dirname, '../src', 'useSparingly');
    let trackedExportName = 'default';

    // path is including double-quotes from symbol so
    // we wrap out trackedPath with double-quotes for comparison
    return `"${trackedPath}"` === path && trackedExportName === exportedName;
  }
}) {}
