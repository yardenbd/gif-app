import { FilterObject, IGif } from "./types";

export const filterByDate = (gif: IGif, filterBy: Partial<FilterObject>) => {
  if (typeof filterBy["date"] === "object") {
    if (!filterBy.date) return gif;
    const isGreaterOperator = filterBy?.date?.from === "Later than";
    const isLaterThanFilterDate = isGreaterOperator
      ? Date.parse(gif.import_datetime) > Date.parse(filterBy.date.time)
      : Date.parse(gif.import_datetime) < Date.parse(filterBy.date.time);
    if (isLaterThanFilterDate) return gif;
    else return null;
  } else return null;
};

export const filterByRating = (gif: IGif, filterBy: Partial<FilterObject>) => {
  if (!filterBy.rating) return gif;
  if (typeof filterBy["rating"] === "string") {
    if (gif["rating"] === filterBy.rating) return gif;
    else return null;
  } else return null;
};
