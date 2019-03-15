"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Lint = require("tslint");
var ts = require("typescript");
var tsutils_1 = require("tsutils");
var path_1 = require("path");
var incrementerFactory = function (initialCount) {
    if (initialCount === void 0) { initialCount = 0; }
    return function () { return (++initialCount); };
};
var matchingIncrementer = incrementerFactory();
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.applyWithProgram = function (sourceFile, program) {
        return this.applyWithFunction(sourceFile, walk, undefined, program.getTypeChecker());
    };
    return Rule;
}(Lint.Rules.TypedRule));
exports.Rule = Rule;
function walk(ctx, tc) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isCallExpression(node)) {
            var type = tc.getTypeAtLocation(node.getChildAt(0));
            var declaration = type.symbol.declarations[0];
            if (declaration && declaration.localSymbol && declaration.localSymbol.exportSymbol) {
                var exportSymbol = declaration.localSymbol.exportSymbol;
                var exportedName = exportSymbol.name;
                var exportedPath = exportSymbol.parent.name;
                if (isMatchingForTracking(exportedPath, exportedName)) {
                    var currentCount = matchingIncrementer();
                    console.log(currentCount);
                    if (currentCount >= 4) {
                        console.log("LOOK we have hit the max usage condition");
                    }
                }
            }
        }
        return ts.forEachChild(node, cb);
    });
}
function isMatchingForTracking(path, exportedName) {
    var trackedPath = path_1.resolve(__dirname, '..', 'useSparingly');
    var trackedExportName = 'default';
    // path is including double-quotes from symbol so
    // we wrap out trackedPath with double-quotes for comparison
    return "\"" + trackedPath + "\"" === path && trackedExportName === exportedName;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9Vc2VTcGFyaW5nbHlSdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibm9Vc2VTcGFyaW5nbHlSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZCQUErQjtBQUMvQiwrQkFBaUM7QUFDakMsbUNBRWlCO0FBQ2pCLDZCQUErQjtBQUUvQixJQUFJLGtCQUFrQixHQUFHLFVBQUMsWUFBZ0I7SUFBaEIsNkJBQUEsRUFBQSxnQkFBZ0I7SUFBSyxPQUFBLGNBQU0sT0FBQSxDQUFDLEVBQUUsWUFBWSxDQUFDLEVBQWhCLENBQWdCO0FBQXRCLENBQXNCLENBQUM7QUFDdEUsSUFBSSxtQkFBbUIsR0FBRyxrQkFBa0IsRUFBRSxDQUFDO0FBRS9DO0lBQTBCLHdCQUFvQjtJQUE5Qzs7SUFJQSxDQUFDO0lBSFEsK0JBQWdCLEdBQXZCLFVBQXdCLFVBQXlCLEVBQUUsT0FBbUI7UUFDcEUsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUNILFdBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBMEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBSTdDO0FBSlksb0JBQUk7QUFNakIsU0FBUyxJQUFJLENBQUMsR0FBMkIsRUFBRSxFQUFrQjtJQUMzRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxJQUFhO1FBQzlELElBQUksMEJBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDMUIsSUFBSSxJQUFJLEdBQUksRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRCxJQUFJLFdBQVcsR0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVsRCxJQUFJLFdBQVcsSUFBSSxXQUFXLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFO2dCQUNsRixJQUFJLFlBQVksR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQztnQkFDeEQsSUFBSSxZQUFZLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQztnQkFDckMsSUFBSSxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBRTVDLElBQUkscUJBQXFCLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxFQUFFO29CQUNyRCxJQUFJLFlBQVksR0FBRyxtQkFBbUIsRUFBRSxDQUFDO29CQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUMxQixJQUFJLFlBQVksSUFBSSxDQUFDLEVBQUU7d0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMENBQTBDLENBQUMsQ0FBQztxQkFDekQ7aUJBQ0Y7YUFDRjtTQUNGO1FBRUQsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFTLHFCQUFxQixDQUFDLElBQUksRUFBRSxZQUFZO0lBQy9DLElBQUksV0FBVyxHQUFHLGNBQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzNELElBQUksaUJBQWlCLEdBQUcsU0FBUyxDQUFDO0lBRWxDLGlEQUFpRDtJQUNqRCw0REFBNEQ7SUFDNUQsT0FBTyxPQUFJLFdBQVcsT0FBRyxLQUFLLElBQUksSUFBSSxpQkFBaUIsS0FBSyxZQUFZLENBQUM7QUFDM0UsQ0FBQyJ9