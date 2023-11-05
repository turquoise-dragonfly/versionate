import { Handler } from "./handler";
import { VisitorOption, replace, traverse } from "estraverse";
import * as escodegen from "escodegen";

export class TsHandler extends Handler {
    ast: any;

    parse(): Handler {
        const esprima = require('esprima');
        this.ast = esprima.parse(this.input, { sourceType: 'module'});
        return this;
    }

    version(): string {
        let version: string = '';
        traverse(this.ast, {
            enter: (node, parent) => {
                if (parent && parent.type === 'Property'
                && parent.key.type === 'Identifier' && parent.key.name === this.file.location
                && node.type === 'Literal') {
                    version = node.value?.toString() ?? '';
                    return VisitorOption.Break;
                }
            }
        });
        return version;
    }

    set(version: string): Handler {

        replace(this.ast, {
            enter: (node, parent) => {
                if (parent && parent.type === 'Property'
                && parent.key.type === 'Identifier' && parent.key.name === this.file.location
                && node.type === 'Literal') {
                    node.value = version;
                    return VisitorOption.Break;
                }
                return node;
            }
        });

        this.output = escodegen.generate(this.ast);
        
        return this;
    }
}