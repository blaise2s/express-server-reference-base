import { FieldNode, GraphQLResolveInfo } from 'graphql';

export default (
  info: GraphQLResolveInfo,
  trustedFields: string[]
): string[] => {
  const selections = info.fieldNodes[0].selectionSet?.selections;
  if (selections) {
    const fieldNodes = selections as FieldNode[];
    const trusted: string[] = [];
    fieldNodes.forEach(fieldNode => {
      const confirmedField = trustedFields.find(
        trustedField => trustedField === fieldNode.name.value
      );
      if (confirmedField) {
        trusted.push(confirmedField);
      }
    });
    return trusted;
  }
  return [];
};
