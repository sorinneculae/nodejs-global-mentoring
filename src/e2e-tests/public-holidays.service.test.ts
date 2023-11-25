import axios, { AxiosResponse } from "axios";
import * as publicHolidaysService from "../services/public-holidays.service";
import { PUBLIC_HOLIDAYS_API_URL } from "../config";

// integration tests

describe("getListOfPublicHolidays", () => {
  test("should get the list of public holidays be year and country", async () => {
    const year = 2023;
    const country = "FR";
    const response: AxiosResponse = await axios.get(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`);

    expect(response.status).toEqual(200);
    expect(response.data.length).toEqual(11);
  });

  test("should check if today is public holiday", async () => {
    const country = "FR";
    const response: AxiosResponse = await axios.get(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`);
    expect(response.data).toBeDefined();
    if (response.data) {
      expect(response.status).toEqual(200);  
    } else {
      expect(response.status).toEqual(204);
    }
  });

  test("should get next public holiday for a country", async () => {
    const country = "FR";
    const response: AxiosResponse =  await axios.get(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${country}`);
    expect(response.status).toEqual(200);
    expect(response.data.length).toBeGreaterThan(0);
  });
});
