import * as Lint from "tslint";
import * as ts from "typescript";
import { isCallExpression } from 'tsutils';

export default function ruleWithMaxUsage({ ruleName, maxCallCount, matchesImportSignature }: { ruleName: String, maxCallCount: Number, matchesImportSignature: (path: string, exportedName: string) => Boolean }) {
  let incrementerFactory = (initialCount = 0) => () => (++initialCount);
  let matchingIncrementer = incrementerFactory();

  class Rule extends Lint.Rules.TypedRule {
    public static FAILURE_STRING = `Rule: ${ruleName} - Exceeded max usage of ${maxCallCount}`

    public applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): Lint.RuleFailure[] {
      return this.applyWithFunction(sourceFile, walk, undefined, program.getTypeChecker());
    }
  }

  function walk(ctx: Lint.WalkContext<void>, tc: ts.TypeChecker) {
    return ts.forEachChild(ctx.sourceFile, function cb(node: ts.Node): void {
      if (isCallExpression(node)) {
        let type = tc.getTypeAtLocation(node.getChildAt(0));
        let declaration: any = type.symbol.declarations[0];

        if (declaration && declaration.localSymbol && declaration.localSymbol.exportSymbol) {
          let exportSymbol = declaration.localSymbol.exportSymbol;
          let exportedName = exportSymbol.name;
          let exportedPath = exportSymbol.parent.name;

          const matchesWatchedImport = matchesImportSignature(exportedPath, exportedName);

          if (matchesWatchedImport) {
            var currentCount = matchingIncrementer();
            console.log(`Rule has tracked usage against ${ruleName}, current usage is at: ` + currentCount);

            if (currentCount > maxCallCount) {
              return ctx.addFailureAtNode(node, Rule.FAILURE_STRING);
            }
          }
        }
      }

      return ts.forEachChild(node, cb);
    });
  }

  return Rule;
}
