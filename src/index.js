import { parseExpression } from "babylon";

const BETTER_TRIM_IDENTIFIER = "__better_trim__";

function __better_trim__(str, chars) {
    if (typeof(chars) !== "string") {
        return str.trim();
    }
    var regex = new RegExp("^(" + chars +")+|(" + chars +")+$", "g");
    return str.replace(regex, '');
}

const betterTrimFunctionNode = parseExpression(__better_trim__.toString());

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
