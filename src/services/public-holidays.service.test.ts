import axios from "axios";
import * as publicHolidaysService from "./public-holidays.service";
import {
  mockPublicHolidaysList,
  mockPublicHolidaysListShort,
} from "../mocks/mockPublicHoliday";

describe("getListOfPublicHolidays", () => {
  test("should get the list of public holidays be year and country", async () => {
    // mock the response from API
    const year = 2023;
    const country = "FR";

    jest.spyOn(axios, "get").mockImplementation(() => Promise.resolve({ data: mockPublicHolidaysList }));

    const response = await publicHolidaysService.getListOfPublicHolidays(year, country);
    // expect function to return the short list from the API response
    expect(response).toEqual(mockPublicHolidaysListShort);
  });

  test("should throw error if the country are NOT valid", async () => {
    const year = 2021;
    const country = "RO";

    await expect(publicHolidaysService.getListOfPublicHolidays(year, country)).rejects.toThrow(
      new Error(`Country provided is not supported, received: ${country}`)
    );
  });

  test("should throw error if the year is NOT valid", async () => {
    const year = 2021;
    const country = "FR";

    await expect(publicHolidaysService.getListOfPublicHolidays(year, country)).rejects.toThrow(
      new Error(`Year provided not the current, received: ${year}`)
    );
  });

  test("should return an empty array if the API call is not successful", async () => {
    const year = 2023;
    const country = "FR";

    jest.spyOn(axios, "get").mockImplementation(() => Promise.reject(new Error('error')));

    const response = await publicHolidaysService.getListOfPublicHolidays(year, country);
    // expect function to return the short list from the API response
    expect(response).toEqual([]);
  });
});

describe("checkIfTodayIsPublicHoliday", () => {
  test("should check if today is public holiday", async () => {
    // mock the response from API
    const country = "FR";

    jest.spyOn(axios, "get").mockImplementation(() => Promise.resolve({ status: 200 }));

    const response = await publicHolidaysService.checkIfTodayIsPublicHoliday(country);
    expect(response).toEqual(true);
  });

  test("should throw error and return false if today is not a public holiday", async () => {
    const country = "FR";

    jest.spyOn(axios, "get").mockImplementation(() => Promise.resolve({ status: 404 }));

    const response = await publicHolidaysService.checkIfTodayIsPublicHoliday(country);
    expect(response).toEqual(false);
  });
});

describe("getNextPublicHolidays", () => {
  test("should get next public holiday for a country", async () => {
    // mock the response from API
    const country = "FR";

    jest.spyOn(axios, "get").mockImplementation(() => Promise.resolve({ data: mockPublicHolidaysList }));

    const response = await publicHolidaysService.getNextPublicHolidays(country);
    // expect function to return the short list from the API response
    expect(response).toEqual(mockPublicHolidaysListShort);
  });

  test("should throw error if the country is NOT valid", async () => {
    const country = "RO";

    await expect(publicHolidaysService.getNextPublicHolidays(country)).rejects.toThrow(
      new Error(`Country provided is not supported, received: ${country}`)
    );
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
