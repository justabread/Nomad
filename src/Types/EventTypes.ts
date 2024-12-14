export enum ForestEventKeys {
  EVENT_CALM,
  EVENT_WOLF,
}

export enum RuinsEventKeys {
  EVENT_CALM,
  EVENT_BANDITS,
  EVENT_MALL,
  EVENT_STORE_GUNS,
  EVENT_STORE_FOOD,
  EVENT_STORE_CLOTHING,
  EVENT_STORE_MEDICINE,
  EVENT_STORE_AMMUNITION,
  EVENT_DOGS,
}

export type EventTypes = ForestEventKeys | RuinsEventKeys;
