import * as moment from "moment";

/* Creates GET query from url and parameters. */
export const buildQuery = (url, params) => {
  const stringifiedParams = Object.entries(params)
    .map(param => `${param[0]}=${param[1].toString()}`)
    .reduce((a, b) => `${a}&${b}`);

  return `${url}?${stringifiedParams}`;
};

/* Formats Moment object to dd/mm/YYYY for HTTP requests. */
export const formatMomentKiwi = date => {
  return date.format("DD/MM/YYYY");
};

/* One way flights have upper date limit set to +1 day of lower one. */
export const getOneWayFlightFormattedDates = date => {
  const dateFromMoment = moment(date);
  const dateFrom = formatMomentKiwi(dateFromMoment);

  const dateToMoment = moment(date).add(1, "day");
  const dateTo = formatMomentKiwi(dateToMoment);

  return { dateFrom, dateTo };
};

export const getFormattedDate = date => {
  return moment(date).format("LL");
};

export const getFormattedDateTimeFromUnixTimestamp = unixTimestamp => {
  return moment.unix(unixTimestamp).format("LL hh:mm");
};
