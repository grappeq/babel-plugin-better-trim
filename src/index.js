import { parseExpression } from "babylon";
import _trim from "lodash.trim";

const BETTER_TRIM_IDENTIFIER = "__better_trim__";

const betterTrimFunctionNode = parseExpression(_trim.toString());

export default function ({ types: t }) {
    return {
        visitor: {
            CallExpression({ node }) {
                if (node.arguments.length > 0 && node.callee.property && node.callee.property.name === "trim") {
                    node.arguments = [ node.callee.object, ...node.arguments ];
                    node.callee = t.identifier(BETTER_TRIM_IDENTIFIER);
                }
            },
            Program(path) {
                betterTrimFunctionNode.id.name = BETTER_TRIM_IDENTIFIER;
                path.node.body = [betterTrimFunctionNode, ...path.node.body]
            }
        }
    };
}
