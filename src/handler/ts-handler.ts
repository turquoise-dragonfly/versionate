import { Handler } from "./handler";
import { VisitorOption, replace } from "estraverse";
import * as escodegen from "escodegen";

export class TsHandler extends Handler {
    set(version: string): Handler {
        const esprima = require('esprima');
        const ast = esprima.parse(this.input, { sourceType: 'module'});

        replace(ast, {
            enter: (node, parent) => {
                node.type
                if (parent && parent.type === 'Property'
                && parent.key.type === 'Identifier' && parent.key.name === 'VERSION'
                && node.type === 'Literal') {
                    node.value = version;
                    return VisitorOption.Break;
                }
                return node;
            }
        });

        this.output = escodegen.generate(ast);
        
        return this;
    }
}