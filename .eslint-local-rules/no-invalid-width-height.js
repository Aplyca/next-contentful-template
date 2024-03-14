module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow invalid values for width and height attributes in Image components',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: 'code',
    schema: [], // No options
  },

  create(context) {
    return {
      JSXOpeningElement(node) {
        if (node.name.name === 'Image' || node.name.name === 'CustomImage') {
          const widthAttribute = node.attributes.find(
            (attr) => attr.name.name === 'width',
          );
          const heightAttribute = node.attributes.find(
            (attr) => attr.name.name === 'height',
          );
          if (
            widthAttribute &&
            widthAttribute.value &&
            widthAttribute.value.expression
          ) {
            if (widthAttribute.value.expression.type === 'MemberExpression') {
              context.report({
                node: widthAttribute,
                message:
                  'Width attribute should not use object properties directly.',
              });
            }
          }
          if (
            heightAttribute &&
            heightAttribute.value &&
            heightAttribute.value.expression
          ) {
            if (heightAttribute.value.expression.type === 'MemberExpression') {
              context.report({
                node: heightAttribute,
                message:
                  'Height attribute should not use object properties directly.',
              });
            }
          }
        }
      },
    };
  },
};
