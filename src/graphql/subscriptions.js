/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFest = /* GraphQL */ `
  subscription OnCreateFest(
    $filter: ModelSubscriptionFestFilterInput
    $owner: String
  ) {
    onCreateFest(filter: $filter, owner: $owner) {
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
          festEventsId
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
export const onUpdateFest = /* GraphQL */ `
  subscription OnUpdateFest(
    $filter: ModelSubscriptionFestFilterInput
    $owner: String
  ) {
    onUpdateFest(filter: $filter, owner: $owner) {
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
          festEventsId
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
export const onDeleteFest = /* GraphQL */ `
  subscription OnDeleteFest(
    $filter: ModelSubscriptionFestFilterInput
    $owner: String
  ) {
    onDeleteFest(filter: $filter, owner: $owner) {
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
          festEventsId
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
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent(
    $filter: ModelSubscriptionEventFilterInput
    $owner: String
  ) {
    onCreateEvent(filter: $filter, owner: $owner) {
      id
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
      festEventsId
      owner
      __typename
    }
  }
`;
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent(
    $filter: ModelSubscriptionEventFilterInput
    $owner: String
  ) {
    onUpdateEvent(filter: $filter, owner: $owner) {
      id
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
      festEventsId
      owner
      __typename
    }
  }
`;
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent(
    $filter: ModelSubscriptionEventFilterInput
    $owner: String
  ) {
    onDeleteEvent(filter: $filter, owner: $owner) {
      id
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
      festEventsId
      owner
      __typename
    }
  }
`;
