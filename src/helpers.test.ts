import * as helpers from "./helpers";
import { PublicHoliday, PublicHolidayShort } from "./types";

describe("Validate country", () => {
  test("should return true if country is in the list", () => {
    const country = "FR";
    const year = 2023;
    const result = helpers.validateInput({ year, country });
    expect(result).toEqual(true);
  });

  test("should throw error if country is NOT in the list", () => {
    const country = "RO";
    const year = 2023;
    expect(() => helpers.validateInput({ year, country })).toThrowError(
      new Error(`Country provided is not supported, received: ${country}`)
    );
  });

  test("should throw error if year is NOT the current year", () => {
    const country = "FR";
    const year = 2021;
    expect(() => helpers.validateInput({ year, country })).toThrowError(
      new Error(`Year provided not the current, received: ${year}`)
    );
  });
});

describe("shortenPublicHoliday()", () => {
  const mockPublicHoliday: PublicHoliday = {
    date: 'date',
    localName: 'localName',
    name: 'name',
    countryCode: 'countryCode', 
    fixed: true,
    global: false,
    counties: null,
    launchYear: null,
    types: ['type1', 'type2']
  }
  const mockPublicHolidayShort: PublicHolidayShort = {
    name: 'name',
    localName: 'localName',
    date: 'date',
  }

  test("should return a short version of Public Holiday", () => {
    const result = helpers.shortenPublicHoliday(mockPublicHoliday);
    expect(result).toStrictEqual(mockPublicHolidayShort);
  });
});
