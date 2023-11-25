import axios from "axios";
import * as publicHolidaysService from "../services/public-holidays.service";

// integration tests

describe("getListOfPublicHolidays", () => {
  test("should get the list of public holidays be year and country", async () => {
    const year = 2023;
    const country = "FR";
    const response = await publicHolidaysService.getListOfPublicHolidays(year, country);
    expect(response.length).toEqual(11);
  });
});

describe("checkIfTodayIsPublicHoliday", () => {
  test("should check if today is public holiday", async () => {
    const country = "FR";
    const response = await publicHolidaysService.checkIfTodayIsPublicHoliday(country);
    expect(typeof response).toBe("boolean");
  });
});

describe("getNextPublicHolidays", () => {
  test("should get next public holiday for a country", async () => {
    const country = "FR";
    const response = await publicHolidaysService.getNextPublicHolidays(country);
    expect(response.length).toBeGreaterThan(2);
  });
});

