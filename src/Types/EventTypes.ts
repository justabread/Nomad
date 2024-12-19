export enum ForestEventsEnum {
  EVENT_CALM,
  EVENT_WOLF,
}

export enum RuinsEventKeys {
  EVENT_CALM,
  EVENT_BANDITS,
  EVENT_MALL,
  EVENT_STORE_GUNS,
  EVENT_RESTAURANT,
  EVENT_STORE_PHARMACY,
  EVENT_DOGS,
}

export type EventTypes = ForestEventsEnum | RuinsEventKeys;
