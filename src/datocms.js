import { GraphQLClient } from "graphql-request";
export function request({ query, variables, preview }) {
  const endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`;
  const client = new GraphQLClient(endpoint, {
    headers: {
      // authorization: `Bearer ${process.env.VUE_APP_CMS_DATOCMS_API_TOKEN}`
      authorization: 'Bearer 8c426d62bd3015885902ffdaa47c0f'
    }
  });
  return client.request(query, variables);
}