export function getIcon(value: number): string {
  if (value === 0) {
    return 'horizontal_rule';
  } else if (value > 0) {
    return 'arrow_upward';
  } else {
    return 'arrow_downward';
  }
}
