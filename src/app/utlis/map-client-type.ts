export function mapClientType(type: string): string {
  switch (type) {
    case '1':
      return 'Church Wedding';
    case '2':
      return 'Civil Wedding';
    default:
      return 'Church Wedding';
  }
}
