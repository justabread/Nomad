import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { LootingProps } from "@/components/Journey/Locations/Looting/Looting";
import { FightingProps } from "@/components/Journey/Locations/Fighting/Fighting";
import { NameWithComponentInterface } from "@/Types/GameTypes";
import {
  EventsType,
  RuinsEventsEnum,
  UtilEventsEnum,
} from "@/Types/EventTypes";
import { Shuffle } from "@/utils/Utils";
import { generateRandomNumber } from "@/components/Journey/Locations/useGenerateRandoms";

import Fight from "@/components/Journey/Locations/Fighting/Fighting";
import Looting from "@/components/Journey/Locations/Looting/Looting";
import LocationsSelector from "@/components/LocationsSelector/LocationsSelector";

interface JourneyContextInterface {
  InitiateFight: (props: FightingProps) => void;
  InitiateLooting: (props: LootingProps) => void;
  EventComponent: NameWithComponentInterface<EventsType>;
  handleChangeEvent: () => void;
  setAllEvents: Dispatch<
    SetStateAction<NameWithComponentInterface<EventsType>[]>
  >;
}

export const JourneyContext = createContext<JourneyContextInterface>({
  InitiateFight: () => {},
  InitiateLooting: () => {},
  EventComponent: {
    name: 0,
    component: () => {
      return <></>;
    },
  },
  handleChangeEvent: () => {},
  setAllEvents: () => {},
});

export const JourneyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [allEvents, setAllEvents] = useState<
    NameWithComponentInterface<EventsType>[]
  >([]);
  const [eventList, setEventList] = useState<
    NameWithComponentInterface<EventsType>[]
  >([]);
  const [eventId, setEventId] = useState<number>(eventList.length - 1);
  const [EventComponent, setEventComponent] = useState<
    NameWithComponentInterface<EventsType>
  >(eventList[eventId]);

  const GenerateEventList = () => {
    return Shuffle<NameWithComponentInterface<EventsType>>(allEvents).slice(
      generateRandomNumber(3, 1)
    );
  };

  const EventFinished = () => {
    return (
      <div>
        <h2>You have exhausted your options here. It is time to move on.</h2>
        <LocationsSelector />
      </div>
    );
  };

  const handleChangeEvent = () => {
    setEventId((prevId) => prevId - 1);
  };

  const InitiateFight = (props: FightingProps) => {
    setEventComponent({
      name: UtilEventsEnum.EVENT_FIGHT,
      component: () => Fight(props),
    });
  };

  const InitiateLooting = (props: LootingProps) => {
    setEventComponent({
      name: UtilEventsEnum.EVENT_LOOTING,
      component: () => Looting(props),
    });
  };

  useEffect(() => {
    setEventList(GenerateEventList());
  }, [allEvents]);

  useEffect(() => {
    setEventId(eventList.length - 1);
  }, [eventList]);

  useEffect(() => {
    if (eventId > 0) {
      setEventComponent(eventList[eventId]);
    } else {
      setEventComponent({
        name: RuinsEventsEnum.EVENT_FINISHED,
        component: EventFinished,
      });
    }
  }, [eventId]);

  return (
    <JourneyContext.Provider
      value={{
        InitiateFight: InitiateFight,
        InitiateLooting: InitiateLooting,
        EventComponent: EventComponent,
        handleChangeEvent: handleChangeEvent,
        setAllEvents: setAllEvents,
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
};
