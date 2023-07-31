/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFest = /* GraphQL */ `
  query GetFest($id: ID!) {
    getFest(id: $id) {
      id
      festName
      collegeName
      state
      city
      country
      festStartDate
      festEndDate
      eventMode
      isPublished
      festDescription
      imageUrlSmall
      imageUrlBanner
      events {
        items {
          id
          festID
          eventName
          eventStartDate
          eventEndDate
          descriptionForinnerHTML
          descriptionForEditting
          eventMode
          isPublished
          imageUrlBanner
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listFests = /* GraphQL */ `
  query ListFests(
    $filter: ModelFestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        festName
        collegeName
        state
        city
        country
        festStartDate
        festEndDate
        eventMode
        isPublished
        festDescription
        imageUrlSmall
        imageUrlBanner
        events {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      festID
      eventName
      eventStartDate
      eventEndDate
      descriptionForinnerHTML
      descriptionForEditting
      eventMode
      isPublished
      imageUrlBanner
      fest {
        id
        festName
        collegeName
        state
        city
        country
        festStartDate
        festEndDate
        eventMode
        isPublished
        festDescription
        imageUrlSmall
        imageUrlBanner
        events {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        festID
        eventName
        eventStartDate
        eventEndDate
        descriptionForinnerHTML
        descriptionForEditting
        eventMode
        isPublished
        imageUrlBanner
        fest {
          id
          festName
          collegeName
          state
          city
          country
          festStartDate
          festEndDate
          eventMode
          isPublished
          festDescription
          imageUrlSmall
          imageUrlBanner
          createdAt
          updatedAt
          owner
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const eventsByFestID = /* GraphQL */ `
  query EventsByFestID(
    $festID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eventsByFestID(
      festID: $festID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        festID
        eventName
        eventStartDate
        eventEndDate
        descriptionForinnerHTML
        descriptionForEditting
        eventMode
        isPublished
        imageUrlBanner
        fest {
          id
          festName
          collegeName
          state
          city
          country
          festStartDate
          festEndDate
          eventMode
          isPublished
          festDescription
          imageUrlSmall
          imageUrlBanner
          createdAt
          updatedAt
          owner
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
