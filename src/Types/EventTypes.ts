export enum UtilEventsEnum {
  EVENT_NO_EVENT,
  EVENT_FIGHT,
  EVENT_LOOTING,
}

export enum ForestEventsEnum {
  EVENT_CALM,
  EVENT_WOLVES,
  EVENT_COTTAGE,
  EVENT_CAVE,
  EVENT_LAKE,
}

export enum RuinsEventsEnum {
  EVENT_CALM,
  EVENT_BANDITS,
  EVENT_MALL,
  EVENT_STORE_GUNS,
  EVENT_RESTAURANT,
  EVENT_STORE_PHARMACY,
  EVENT_DOGS,
  EVENT_FINISHED,
}

export type EventsType = UtilEventsEnum | ForestEventsEnum | RuinsEventsEnum;
