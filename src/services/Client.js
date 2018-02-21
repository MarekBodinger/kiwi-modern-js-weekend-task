import { buildQuery, getOneWayFlightFormattedDates } from "./Utils";

const API_ENDPOINT = "https://api.skypicker.com/";

export const getLocations = searchText => {
  const locationsEndpoint = `${API_ENDPOINT}locations/`;
  const url = buildQuery(locationsEndpoint, { term: searchText });

  return fetch(url).then(response => response.json());
};

export const getFlights = (flyFrom, flyTo, date) => {
  const flightsEndpoint = `${API_ENDPOINT}flights`;
  const { dateFrom, dateTo } = getOneWayFlightFormattedDates(date);
  const url = buildQuery(flightsEndpoint, {
    flyFrom,
    to: flyTo,
    dateFrom,
    dateTo
  });

  return fetch(url).then(response => response.json());
};
