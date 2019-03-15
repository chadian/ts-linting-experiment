import * as Lint from "tslint";
import * as ts from "typescript";
import {
  isCallExpression,
} from 'tsutils';
import { resolve } from 'path';

let incrementerFactory = (initialCount = 0) => () => (++initialCount);
let matchingIncrementer = incrementerFactory();

export class Rule extends Lint.Rules.TypedRule {
  public applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): Lint.RuleFailure[] {
    return this.applyWithFunction(sourceFile, walk, undefined, program.getTypeChecker());
  }
}

function walk(ctx: Lint.WalkContext<void>, tc: ts.TypeChecker) {
  return ts.forEachChild(ctx.sourceFile, function cb(node: ts.Node): void {
    if (isCallExpression(node)) {
      let type =  tc.getTypeAtLocation(node.getChildAt(0));
      let declaration:any = type.symbol.declarations[0];

      if (declaration && declaration.localSymbol && declaration.localSymbol.exportSymbol) {
        let exportSymbol = declaration.localSymbol.exportSymbol;
        let exportedName = exportSymbol.name;
        let exportedPath = exportSymbol.parent.name;

        if (isMatchingForTracking(exportedPath, exportedName)) {
          let currentCount = matchingIncrementer();
          console.log(currentCount);
          if (currentCount >= 4) {
            console.log("We have hit the maxed usage of the exported function");
          }
        }
      }
    }

    return ts.forEachChild(node, cb);
  });
}

function isMatchingForTracking(path, exportedName) {
  let trackedPath = resolve(__dirname, '..', 'useSparingly');
  let trackedExportName = 'default';

  // path is including double-quotes from symbol so
  // we wrap out trackedPath with double-quotes for comparison
  return `"${trackedPath}"` === path && trackedExportName === exportedName;
}
