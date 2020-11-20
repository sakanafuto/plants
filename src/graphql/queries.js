/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPlants = /* GraphQL */ `
  query GetPlants($id: ID!) {
    getPlants(id: $id) {
      id
      name
      caption
      createdAt
      updatedAt
    }
  }
`;
export const listPlantss = /* GraphQL */ `
  query ListPlantss(
    $filter: ModelPlantsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlantss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        caption
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
