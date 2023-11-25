import { PublicHoliday, PublicHolidayShort } from "../types";

export const mockPublicHoliday: PublicHoliday = {
  date: "date",
  localName: "localName",
  name: "name",
  countryCode: "countryCode",
  fixed: true,
  global: false,
  counties: null,
  launchYear: null,
  types: ["type1", "type2"],
};

export const mockPublicHolidayShort: PublicHolidayShort = {
  name: "name",
  localName: "localName",
  date: "date",
};

export const mockPublicHolidaysList = [
  {
    date: "2023-01-01",
    localName: "Jour de l'an",
    name: "New Year's Day",
    countryCode: "FR",
    fixed: true,
    global: true,
    counties: null,
    launchYear: 1967,
    types: ["Public"],
  },
  {
    date: "2023-04-10",
    localName: "Lundi de Pâques",
    name: "Easter Monday",
    countryCode: "FR",
    fixed: false,
    global: true,
    counties: null,
    launchYear: 1642,
    types: ["Public"],
  },
];

export const mockPublicHolidaysListShort = [
  {
    date: "2023-01-01",
    localName: "Jour de l'an",
    name: "New Year's Day",
  },
  {
    date: "2023-04-10",
    localName: "Lundi de Pâques",
    name: "Easter Monday",
  },
];
