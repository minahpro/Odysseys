import Image from "next/image";
import React, { useEffect } from "react";
import { FaMinus } from "react-icons/fa6";
import ActivitiesPopup from "@/components/Popups/ActivitiesPopup";
import DestinationPopup from "@/components/Popups/DestinationPopup";
import AccomodationPopup from "@/components/Popups/AccomodationPopup";
import { useAppContext } from "@/context/AppContext";
import { Skeleton } from "@/components/ui/skeleton";

function DestAndAct() {
  const {
    fetchedDestinations,
    allFetchedDayTrips,
    isLoading,
    setBookingCustomizationData,
    bookingCustomizationData,
    customizeTour,
  } = useAppContext();
  const [activities, setActivities] = React.useState([]);
  const [activitiesData, setActivitiesData] = React.useState([]);
  const [openActivities, setOpenActivities] = React.useState(false);
  //   dest
  const [destinations, setDestinations] = React.useState([]);
  const [destinationsData, setDestinationsData] = React.useState([]);
  const [openDestinations, setOpenDestinations] = React.useState(false);

  //   acc
  const [openAccomodation, setOpenAccomodation] = React.useState(false);
  const [selectedDstn, setSelectedDstn] = React.useState(null);

  // add activity
  const addActivity = (activity) => {
    const newList = [activity, ...activities];
    setActivities(newList);
    setBookingCustomizationData({
      ...bookingCustomizationData,
      dayTrips: newList,
    });
    // remove selected activity from activities dataa
    const newActivitiesData = activitiesData.filter(
      (data) => data.id !== activity.id
    );
    setActivitiesData(newActivitiesData);
  };

  //   add destination
  const addDestination = (destination) => {
    const newList = [
      {
        ...destination,
        accomodation: {
          status: false,
        },
      },
      ...destinations,
    ];

    setDestinations(newList);
    setBookingCustomizationData({
      ...bookingCustomizationData,
      addedItinerary: newList,
    });

    // remove selected destination from destinations data
    const newDestinationsData = destinationsData.filter(
      (data) => data.id !== destination.id
    );
    setDestinationsData(newDestinationsData);
  };

  //   remove destination....................
  const removeDestination = (destination) => {
    const newDestinations = destinations.filter(
      (dest) => dest.id !== destination.id
    );
    setDestinations(newDestinations);
    setDestinationsData([destination, ...destinationsData]);
    setBookingCustomizationData({
      ...bookingCustomizationData,
      addedItinerary: newDestinations,
    });
  };

  //   remove activity..............................
  const removeActivity = (activity) => {
    const newActivities = activities.filter((act) => act.id !== activity.id);
    setActivities(newActivities);
    setActivitiesData([activity, ...activitiesData]);
    setBookingCustomizationData({
      ...bookingCustomizationData,
      dayTrips: newActivities,
    });
  };
  //   add accommodation on destination..............
  const addAccommodation = (datas) => {
    const accom = datas?.acc;
    const dstnId = datas?.dstnId;

    //search dstn on destinations and add accomodation on it
    const findDstn = destinations.find((dst) => dst.id === dstnId);
    // update dstn
    const updatedDstn = {
      ...findDstn,
      accomodation: {
        status: true,
        ...accom,
      },
    };
    // update destinations
    const newDestinations = destinations?.map((dst) =>
      dst.id === dstnId ? updatedDstn : dst
    );

    setDestinations(newDestinations);
    setSelectedDstn(null);
    setOpenAccomodation(false);

    setBookingCustomizationData({
      ...bookingCustomizationData,
      addedItinerary: newDestinations,
    });
  };

  // ************ USE EFFECT ****************
  useEffect(() => {
    if (fetchedDestinations.length > 0) {
      let dstns = fetchedDestinations;
      if (customizeTour) {
        const dstnsInCustomizeTour = customizeTour.itinerary.map(
          (itm) => itm.destinationId
        );
        dstns = dstns.filter((itm) => !dstnsInCustomizeTour.includes(itm.id));
      }

      dstns = dstns.sort((a, b) => a.name.localeCompare(b.name));
      setDestinationsData(dstns);
    }
  }, [fetchedDestinations, customizeTour]);
  useEffect(() => {
    if (allFetchedDayTrips.length > 0) setActivitiesData(allFetchedDayTrips);
  }, [allFetchedDayTrips]);

  if (isLoading) return <Skeleton className="w-full mt-20 h-48" />;

  return (
    <>
      {openActivities && (
        <ActivitiesPopup
          handleOpen={openActivities}
          handleClose={() => setOpenActivities(false)}
          onSelect={addActivity}
          activities={activitiesData}
        />
      )}

      {openDestinations && (
        <DestinationPopup
          handleOpen={openDestinations}
          handleClose={() => setOpenDestinations(false)}
          onSelect={addDestination}
          destinations={destinationsData}
        />
      )}
      {openAccomodation && (
        <AccomodationPopup
          handleOpen={openAccomodation}
          handleClose={() => setOpenAccomodation(false)}
          onSelect={addAccommodation}
          dstnId={selectedDstn}
        />
      )}
      <div className="space-y-4 w-full">
        <p className="text-xs italic text-textcolor">
          Add Destinations & Activities(day trips) to your itinerary
        </p>
        {/* dest */}
        <div className="space-y-4">
          <div className="flex justify-between flex-wrap gap-2 items-center w-full">
            <h4 className="font-semibold text-white">Destinations</h4>
            <button
              onClick={() => setOpenDestinations(true)}
              className="px-8 border border-primary border-dashed py-1.5 font-semibold text-primary rounded text-xs"
            >
              Add
            </button>
          </div>
          {destinations?.length > 0 && (
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
              {destinations?.map((destination, index) => (
                <div
                  key={index}
                  className="p-2 rounded border bg-highlight border-gray-800 relative space-y-4"
                >
                  {/* dest */}
                  <div className="space-y-3">
                    <Image
                      src={destination?.photos[0]}
                      width={2000}
                      height={240}
                      alt="blog"
                      className="w-full rounded h-20 object-cover bg-gray-800"
                    />
                    <h5 className="text-sm font-normal text-textcolor">
                      {destination?.name}
                    </h5>
                    <button
                      onClick={() => {
                        setOpenAccomodation(true);
                        setSelectedDstn(destination.id);
                      }}
                      className={`w-full bg-primary text-black rounded py-1.5  text-xs`}
                    >
                      {destination?.accomodation?.status ? "Change" : "Select"}{" "}
                      Accomodation
                    </button>
                  </div>
                  {/* acc */}
                  {destination?.accomodation?.status && (
                    <div className="flex gap-2 items-center">
                      <Image
                        src={destination?.accomodation?.photos[0]}
                        width={2000}
                        height={240}
                        alt="blog"
                        className="w-1/3 rounded h-14 object-cover bg-gray-800"
                      />

                      <div className="w-2/3">
                        <p className="text-xs text-white leading-5 font-normal">
                          {destination?.accomodation?.name}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* remove */}
                  <button
                    onClick={() => removeDestination(destination)}
                    className="absolute flex-all text-xs w-6 h-6 rounded-full border border-primary/50 text-primary bg-black -top-7 -right-2"
                  >
                    <FaMinus />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* act */}
        <div className="space-y-4">
          <div className="flex justify-between flex-wrap gap-2 items-center w-full">
            <h4 className="font-semibold text-white">Activities/Day Trips</h4>
            <button
              onClick={() => setOpenActivities(true)}
              className="px-8 border border-primary border-dashed py-1.5 font-semibold text-primary rounded text-xs"
            >
              Add
            </button>
          </div>
          {activities?.length > 0 && (
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
              {activities?.map((activity, index) => (
                <div
                  key={index}
                  className="p-2 rounded border bg-highlight border-gray-800 relative space-y-4"
                >
                  <div className="flex gap-4 items-center">
                    <Image
                      src={activity?.photos[0]}
                      width={2000}
                      height={240}
                      alt="blog"
                      className="w-1/3 rounded h-14 object-cover bg-gray-800"
                    />

                    <div className="w-2/3">
                      <p className="text-sm text-textcolor leading-5 font-normal">
                        {activity?.title}
                      </p>
                    </div>
                  </div>
                  {/* remove */}
                  <button
                    onClick={() => removeActivity(activity)}
                    className="absolute flex-all text-xs w-6 h-6 rounded-full border border-primary/50 text-primary bg-black -top-7 -right-2"
                  >
                    <FaMinus />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DestAndAct;
