import { createContext, useContext, useEffect, useState } from "react";
import { GameMasterContext } from "./GameMasterContextProvider";
import { UtilityLocationsEnum } from "@/Types/LocationTypes";

import { LootingProps } from "@/components/Journey/Locations/Looting/Looting";
import { FightingProps } from "@/components/Journey/Locations/Fighting/Fighting";
import { NameWithComponentInterface } from "@/Types/GameTypes";
import { RuinsEventsEnum } from "@/Types/EventTypes";
import { Shuffle } from "@/utils/Utils";
import { generateRandomNumber } from "@/components/Journey/Locations/useGenerateRandoms";
import { RuinsEvents } from "@/components/Journey/Locations/Ruins/RuinsEvents";

interface JourneyContextInterface {
  InitiateFight: (props: FightingProps) => void;
  InitiateLooting: (props: LootingProps) => void;
  EventComponent: NameWithComponentInterface<RuinsEventsEnum>;
  handleChangeEvent: () => void;
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
});

export const JourneyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const GenerateEventList = () => {
    return Shuffle<NameWithComponentInterface<RuinsEventsEnum>>(
      RuinsEvents
    ).slice(generateRandomNumber(3, 1));
  };

  const [eventList] =
    useState<NameWithComponentInterface<RuinsEventsEnum>[]>(GenerateEventList);

  const [eventId, setEventId] = useState<number>(eventList.length - 1);

  const [EventComponent, setEventComponent] = useState<
    NameWithComponentInterface<RuinsEventsEnum>
  >(eventList[eventId]);

  const EventFinished = () => {
    return (
      <div>
        <h2>You have exhausted your options here. It is time to move on.</h2>
      </div>
    );
  };

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

  const handleChangeEvent = () => {
    setEventId((prevId) => prevId - 1);
  };

  const { setPlayerLocation } = useContext(GameMasterContext);

  const InitiateFight = (props: FightingProps) => {
    setPlayerLocation(UtilityLocationsEnum.LOCATION_FIGHT, props);
  };

  const InitiateLooting = (props: LootingProps) => {
    setPlayerLocation(UtilityLocationsEnum.LOCATION_LOOTING, props);
  };

  return (
    <JourneyContext.Provider
      value={{
        InitiateFight: InitiateFight,
        InitiateLooting: InitiateLooting,
        EventComponent: EventComponent,
        handleChangeEvent: handleChangeEvent,
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
};
