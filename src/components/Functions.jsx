// Sort tours by different criteria
const sortTours = ({ sortFilter, availableTours, setFinalTours }) => {
  const sortedTours = [...availableTours];

  switch (sortFilter) {
    case "expensive-cheap":
      setFinalTours(
        sortedTours.sort(
          (a, b) =>
            parseInt(b.price.foreigner.adult.highSeason) -
            parseInt(a.price.foreigner.adult.highSeason)
        )
      );
      break;
    case "cheap-expensive":
      setFinalTours(
        sortedTours.sort(
          (a, b) =>
            parseInt(a.price.foreigner.adult.highSeason) -
            parseInt(b.price.foreigner.adult.highSeason)
        )
      );
      break;
    case "ascending":
      setFinalTours(sortedTours.sort((a, b) => a.title.localeCompare(b.title)));
      break;
    case "descending":
      setFinalTours(sortedTours.sort((a, b) => b.title.localeCompare(a.title)));
      break;
    default:
      setFinalTours(availableTours);
      break;
  }
};

// Filter tours by different categories
const filterByTours = ({ filterByFilter, availableTours, setFinalTours }) => {
  switch (filterByFilter) {
    case "recommended":
      setFinalTours(availableTours.filter((tour) => tour.isRecommended));
      break;
    case "featured":
      setFinalTours(availableTours.filter((tour) => tour.isFeatured));
      break;
    case "offer":
      setFinalTours(availableTours.filter((tour) => tour.isOnOffer));
      break;
    case "special":
      setFinalTours(availableTours.filter((tour) => tour.isSpecial));
      break;
    case "latest":
      setFinalTours(
        availableTours.sort(
          (a, b) =>
            new Date(b.createdAt?.seconds) - new Date(a.createdAt?.seconds)
        )
      );
      break;
    default:
      setFinalTours(availableTours);
      break;
  }
};

// Find item by title
const findItTitle = ({ data, title }) => {
  return data?.find((item) => item.title === title)?.id;
};

// Find item by name
const findItName = ({ data, title }) => {
  return data?.find((item) => item.name === title)?.id;
};

// Get array of names/titles from IDs
export const findItArray = ({ ids, datas, dest }) => {
  return ids?.map((id) => {
    const data = datas?.find((item) => item.id === id);
    return dest ? data?.name : data?.title;
  });
};

// Sort tours by duration
const sortToursDuration = ({ tourDuration, availableTours, setFinalTours }) => {
  let filteredTours;

  switch (tourDuration) {
    case "1-3":
      filteredTours = availableTours.filter(
        (tour) => tour.duration > 0 && tour.duration <= 3
      );
      break;
    case "4-6":
      filteredTours = availableTours.filter(
        (tour) => tour.duration > 3 && tour.duration <= 6
      );
      break;
    case "7+":
      filteredTours = availableTours.filter((tour) => tour.duration > 6);
      break;
    default:
      filteredTours = availableTours;
      break;
  }

  setFinalTours(filteredTours);
};

// Remove filter options with zero counts
const removeZeroCounts = ({ datas, title, getAmount }) => {
  const dataWithCounts = datas.map((item) => {
    const count = getAmount({ type: title, id: item.id });
    const name = title === "destination" ? item.name : item.title;

    return {
      ...item,
      count,
      label: `${name} (${count})`,
      value: name,
    };
  });

  return dataWithCounts.filter((item) => item.count > 0);
};

const downloadFile = ({ file, name }) => {
  const link = document.createElement("a");
  link.href = file;
  link.download = name;
  link.click();
};

export {
  sortTours,
  findItTitle,
  findItName,
  sortToursDuration,
  removeZeroCounts,
  filterByTours,
  downloadFile,
};
