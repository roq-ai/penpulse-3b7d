const mapping: Record<string, string> = {
  articles: 'article',
  publishers: 'publisher',
  topics: 'topic',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
