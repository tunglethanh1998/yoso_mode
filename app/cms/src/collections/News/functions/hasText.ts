import type { SerializedEditorState, SerializedLexicalNode, SerializedTextNode } from 'lexical'

function checkNodeForMeaningfulText(
  node: SerializedLexicalNode | SerializedLexicalNode[] | undefined,
): boolean {
  if (!node) return false

  if (Array.isArray(node)) {
    return node.some(checkNodeForMeaningfulText)
  }

  if (node.type === 'text') {
    const textNode = node as SerializedTextNode
    if (textNode.text && textNode.text.trim().length > 0) {
      return true
    }
  }

  if (node.type !== 'text' && node.type !== 'root') {
    if (
      node.type === 'list' ||
      node.type === 'upload' ||
      node.type === 'link' ||
      node.type === 'autolink'
    ) {
      return true
    }
  }

  if ('children' in node && Array.isArray(node.children)) {
    return checkNodeForMeaningfulText(node.children)
  }

  return false
}

export function hasText(value: null | SerializedEditorState<SerializedLexicalNode> | undefined) {
  const children = value?.root?.children || []
  const hasChildren = children.length > 0

  if (!hasChildren) return false

  return checkNodeForMeaningfulText(value?.root.children)
}
