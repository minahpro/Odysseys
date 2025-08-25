// UserContext.js
"use client";
import {
  fetchDocuments,
  getMultipleDocsByFieldNames,
  getSingleDocByFieldName,
} from "@/firebase/databaseOperations";
import firebase from "@/firebase/firebaseInit";
import { onAuthStateChanged } from "firebase/auth";
import { signOutUser } from "@/firebase/authOperations";
import React, { createContext, useState, useContext, useEffect } from "react";
// Create a context with a default value of null for the user

const AppContext = createContext(null);
export const useAppContext = () => useContext(AppContext);
export const AppContextProvider = ({ children }) => {
  const { auth } = firebase;
  const [destinations, setDestinations] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [systemRoles, setSystemRoles] = useState([]);
  const [allFetchedDayTrips, setAllFetchedDayTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [filteredTripsSetOption, setFilteredTripsSetOption] = useState({
    title: "all",
    value: "",
  });
  const [tours, setTours] = useState([]);
  const [allFetchedTours, setAllFetchedTours] = useState([]);
  const [searchOptionSet, setSearchOptionSet] = useState({
    title: "All",
    value: "all",
  });
  const [authUser, setAuthUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [didSucceed, setDidSucceed] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingAuthUser, setIsFetchingAuthUser] = useState(true);
  const [isInAdvancedCustomization, setIsInAdvancedCustomization] =
    useState(false);
  const [customizeTour, setCustomizeTour] = useState(null);
  const [bookingCustomizationData, setBookingCustomizationData] = useState({
    customizedItinerary: [],
    addedItinerary: [],
    dayTrips: [],
  });
  const [companyDetails, setCompanyDetails] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [reviews, setReviews] = useState({});

  const handleSetDestinations = (destinationsList) => {
    setDestinations(destinationsList);
  };

  const handleSetAccommodations = (accmList) => {
    setAccommodations(accmList);
  };

  const updateAuthUser = (newInfo) => {
    setAuthUser(newInfo);
  };

  const handleSignOut = async () => {
    try {
      const result = await signOutUser();
      if (result.didSucceed) {
        setAuthUser(null);
        return { didSucceed: true, message: result.message };
      } else {
        return { didSucceed: false, message: result.message };
      }
    } catch (error) {
      return { didSucceed: false, message: "Error signing out" };
    }
  };

  const handleOpenLoading = () => setIsLoading((prev) => true);
  const handleCloseLoading = () => setIsLoading((prev) => false);

  const fetchSystemRoles = async () => {
    handleOpenLoading();

    const { didSucceed, items } = await fetchDocuments("roles");

    if (didSucceed) {
      if (items.length > 1) {
        setSystemRoles(items);
      }
    }

    handleCloseLoading();
  };

  const fetchDayTrips = async () => {
    handleOpenLoading();
    const rs = await getMultipleDocsByFieldNames(
      "day-trips",
      [{ fieldName: "isPublished", value: true }],
      {
        fieldName: "createdAt",
        value: "desc",
      }
    );

    if (rs.didSucceed) {
      handleSetFetchedDayTrips(rs.documents);
      setDidSucceed(true);
    }

    handleCloseLoading();
  };

  const handleSetFetchedDayTrips = (data) => {
    setAllFetchedDayTrips(data);
  };

  const handleFilterDayTrips = (options) => {
    if (options.title === "all") {
      setFilteredTrips(allFetchedDayTrips);
    }
    if (options.title === "category") {
      const trips = allFetchedDayTrips.filter(
        (trip) => trip.category === options.value
      );
      setFilteredTrips(trips);
      setFilteredTripsSetOption({ title: "category", value: options.label });
    }
    if (options.title === "destination") {
      const trips = allFetchedDayTrips.filter((trip) =>
        trip.destinations.includes(options.value)
      );

      setFilteredTrips(trips);
      setFilteredTripsSetOption({
        title: "destination",
        value: options.valueTitle,
      });
    }

    if (options.title === "tags") {
      const trips = allFetchedDayTrips.filter((trip) =>
        trip.tags.includes(options.value)
      );

      setFilteredTrips(trips);
      setFilteredTripsSetOption({
        title: "tags",
        value: options.valueTitle,
      });
    }
  };

  const fetchToursAccommodationsDestinations = async () => {
    handleOpenLoading();
    const rsArray = await Promise.all([
      getMultipleDocsByFieldNames(
        "accommodations",
        [{ fieldName: "isPublished", value: true }],
        {
          fieldName: "createdAt",
          value: "desc",
        }
      ),
      getMultipleDocsByFieldNames(
        "destinations",
        [{ fieldName: "isPublished", value: true }],
        {
          fieldName: "createdAt",
          value: "desc",
        }
      ),
      getMultipleDocsByFieldNames(
        "tours",
        [{ fieldName: "isPublished", value: true }],
        {
          fieldName: "createdAt",
          value: "desc",
        }
      ),
      getMultipleDocsByFieldNames(
        "day-trips",
        [{ fieldName: "isPublished", value: true }],
        {
          fieldName: "createdAt",
          value: "desc",
        }
      ),
      getMultipleDocsByFieldNames("company-details", [], {
        fieldName: "createdAt",
        value: "desc",
      }),
    ]);

    const accmRs = rsArray[0];
    const dstnRs = rsArray[1];
    const trsRs = rsArray[2];
    const tripsRs = rsArray[3];
    const companyRs = rsArray[4];

    if (
      accmRs.didSucceed &&
      dstnRs.didSucceed &&
      trsRs.didSucceed &&
      tripsRs.didSucceed &&
      companyRs.didSucceed
    ) {
      setDestinations(dstnRs.documents);
      setAccommodations(accmRs.documents);
      setAllFetchedDayTrips(tripsRs.documents);
      setFilteredTrips(tripsRs.documents);
      setCompanyDetails(companyRs.documents);
      //populate destinations and accommodations to tour itineraries.....
      const updatedTours = trsRs.documents.map((tr) => {
        const tourItn = tr.itinerary.map((item) => {
          let dstn = null;
          let accm = null;
          //get real destination data.............................
          if (item.destinationId) {
            const foundDst = dstnRs.documents.find(
              (element) => element.id === item.destinationId
            );
            dstn = foundDst;
          }
          //get real accommodation data...........................
          if (item.accommodationId) {
            const foundAccm = accmRs.documents.find(
              (element) => element.id === item.accommodationId
            );
            accm = foundAccm;
          }

          return {
            ...item,
            destination: dstn ? dstn : null,
            accommodation: accm ? accm : null,
          };
        });
        return { ...tr, itinerary: tourItn };
      });

      setAllFetchedTours(updatedTours);
      setTours(updatedTours);
    } else {
      //set fetching error message.............
      setErrorMessage(
        "Something went wrong while fetching system data..try again later"
      );

      console.log("no data fetched error ...on initial context data fetch");
    }
    handleCloseLoading();
  };

  const handleChangeSearchOptionSet = ({ title, value }) => {
    setSearchOptionSet({ title: title, value: value });
  };

  const handleChangeFilterOptions = async (searchOption) => {
    if (allFetchedTours.length < 1) {
      //no tours were found as this will only be called when initial data fetching has been done......
      console.log("no tours available for filtering in safaris page");
    } else {
      //tours already fetched ........ we have to filter them....
      handleSetFilteredTours(searchOption);
    }
  };

  const handleSetFilteredTours = (searchOption) => {
    let newList = [];

    //filter options.........................................
    switch (searchOption.title) {
      case "All":
        //all tours..........................................
        setTours(allFetchedTours);
        setSearchOptionSet({ title: "All", value: "all" });
        break;
      case "groupType":
        //tour group types...................................
        newList = allFetchedTours.filter(
          (tour) => tour.category === searchOption.value
        );

        setTours(newList);
        setSearchOptionSet({
          title: "groupType",
          value: searchOption.valueTitle,
        });

        break;
      case "focus":
        //tour focus..........................................
        newList = allFetchedTours.filter((tour) => {
          return tour.focus.includes(searchOption.value);
        });

        setTours(newList);
        setSearchOptionSet({ title: "focus", value: searchOption.valueTitle });
        break;
      case "standard":
        //tour standard............................................
        newList = allFetchedTours.filter(
          (tour) => tour.standard === searchOption.value
        );
        setTours(newList);
        setSearchOptionSet({
          title: "standard",
          value: searchOption.valueTitle,
        });
        break;
      case "featured":
        //featured tours............................................
        newList = allFetchedTours.filter((tour) => tour.isFeatured);
        setTours(newList);
        setSearchOptionSet({ title: "tags", value: "featured" });
        break;

      case "tags":
        //tour tags..............
        newList = allFetchedTours.filter((tour) =>
          tour.tags.includes(searchOption.value)
        );
        setTours(newList);
        setSearchOptionSet({ title: "tags", value: searchOption.valueTitle });
        break;

      case "destination":
        //by destination .............
        newList = allFetchedTours.filter((tour) =>
          tour.itinerary.some(
            (itineraryItem) =>
              itineraryItem.destinationId === searchOption.value
          )
        );
        setTours(newList);
        setSearchOptionSet({
          title: "destination",
          value: searchOption.valueTitle,
        });
        break;
      case "price":
        //by price .................
        newList = allFetchedTours.filter((tour) => {
          const price = tour.price.foreigner.adult.highSeason;
          const tourPrice = parseInt(price);

          if (
            tourPrice >= searchOption.value.min &&
            tourPrice <= searchOption.value.max
          )
            return true;
          return false;
        });

        const orderedTours = newList.sort(
          (a, b) =>
            parseInt(a.price.foreigner.adult.highSeason) -
            parseInt(b.price.foreigner.adult.highSeason)
        );

        setTours(orderedTours);
        setSearchOptionSet({ title: "price", value: searchOption.value });
        break;

      case "duration":
        //by duration ........
        newList = allFetchedTours.filter((tour) => {
          if (
            tour.duration >= searchOption.value.min &&
            tour.duration <= searchOption.value.max
          ) {
            return true;
          }
          return false;
        });

        setTours(newList);
        setSearchOptionSet({
          title: "duration",
          value:
            searchOption.value.max === 100
              ? "13 + days"
              : `${searchOption.value.min} to ${searchOption.value.max} days`,
        });

        break;
      default:
        break;
    }
  };

  //filter by price.............................................................
  const handleFilterByPrice = (min, max) => {
    let items = allFetchedTours.filter((tour) => {
      const tourPrice = parseInt(tour.price);
      if (tourPrice >= min && tourPrice <= max) return true;
      return false;
    });
    setTours(items);
  };

  //ordering by price...........................................................
  const handleOrderTours = (order) => {
    let orderedTours = [...tours];
    if (order == "cheap-first") {
      orderedTours.sort(
        (a, b) =>
          parseInt(a.price.foreigner.adult.highSeason) -
          parseInt(b.price.foreigner.adult.highSeason)
      );
    } else if (order == "expensive-first") {
      orderedTours.sort(
        (a, b) =>
          parseInt(b.price.foreigner.adult.highSeason) -
          parseInt(a.price.foreigner.adult.highSeason)
      );
    } else if (order == "ascending") {
      orderedTours.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order == "descending") {
      orderedTours.sort((a, b) => b.title.localeCompare(a.title));
    }
    setTours(orderedTours);
  };

  //populate destn and accms  to tours.......................
  const getUpdatedItn = (itinerary) => {
    const itn = itinerary.map((item) => {
      //get real destination data...............
      const foundDst = destinations.find(
        (element) => element.id === item.destinationId
      );
      //get real accommodation data.............
      const foundAccm = accommodations.find(
        (element) => element.id === item.accommodationId
      );

      return {
        ...item,
        destination: foundDst ? foundDst : null,
        accommodation: foundAccm ? foundAccm : null,
      };
    });

    return itn;
  };

  const handlePopulateDstsAndAccmsToTours = () => {
    handleOpenLoading();
    setAllFetchedTours((prevState) => {
      const updatedTours = prevState.map((tour) => {
        const updatedItn = getUpdatedItn(tour.itinerary);

        const updatedTour = { ...tour, itinerary: updatedItn };
        return updatedTour;
      });

      return updatedTours;
    });

    handleCloseLoading();
  };

  // fetch reviews from "/api/google-reviews"
  const fetchReviews = async () => {
    setIsLoadingReviews(true);
    const response = await fetch("/api/google-reviews");
    const data = await response.json();
    if (data?.didSucceed) {
      setReviews({
        reviews: data?.reviews,
        placeUrl: data?.placeUrl,
      });
    } else {
      console.log("Error fetching reviews:", data.message);
    }
    setIsLoadingReviews(false);
  };

  //auth state change........................................
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchData = async () => {
          const rs = await getSingleDocByFieldName("users", [
            {
              fieldName: "userId",
              value: user.uid,
            },
          ]);

          if (rs.didSucceed) {
            if (rs.document === null) {
              updateAuthUser({
                userId: user.uid,
                email: user.email,
                isAdmin: false,
              });
              setIsFetchingAuthUser(false);
            } else {
              updateAuthUser(rs.document);
              setIsFetchingAuthUser(false);
            }
          } else {
            updateAuthUser({
              userId: user.uid,
              email: user.email,
              isAdmin: false,
            });
            setIsFetchingAuthUser(false);
          }
        };

        fetchData();
      } else {
        updateAuthUser(null);
        setIsFetchingAuthUser(false);
      }
    });

    return () => unsubscribe();
  }, []);
  //end of auth state change........

  //fetch system data when the app is opened first time.......
  useEffect(() => {
    fetchToursAccommodationsDestinations();
  }, []);

  //fetch reviews.............................................
  useEffect(() => {
    fetchReviews();
  }, []);

  //object to be exposed to the whole app....................

  const dataToExport = {
    tours,
    isLoading,
    errorMessage,
    handleOpenLoading,
    handleCloseLoading,
    handleChangeFilterOptions,
    searchOptionSet,
    handleChangeSearchOptionSet,
    handleFilterByPrice,
    handleOrderTours,
    updateAuthUser,
    authUser,
    handleSignOut,
    handleSetDestinations,
    handleSetAccommodations,
    fetchedAccommodations: accommodations,
    fetchedDestinations: destinations,
    allFetchedTours,
    handleSetFilteredTours,
    didSucceed,
    handlePopulateDstsAndAccmsToTours,
    isFetchingAuthUser,
    fetchSystemRoles,
    handleSetFetchedDayTrips,
    allFetchedDayTrips,
    fetchDayTrips,
    filteredTrips,
    filteredTripsSetOption,
    handleFilterDayTrips,
    isInAdvancedCustomization,
    setIsInAdvancedCustomization,
    customizeTour,
    setCustomizeTour,
    setBookingCustomizationData,
    bookingCustomizationData,
    companyDetails,
    reviews,
    isLoadingReviews,
  };

  return (
    <AppContext.Provider value={dataToExport}>{children}</AppContext.Provider>
  );
};

//https://wetu.com/ItineraryOutputs/Discovery/30d0de03-d9ae-4d0a-ad9b-577dbc7ce998
