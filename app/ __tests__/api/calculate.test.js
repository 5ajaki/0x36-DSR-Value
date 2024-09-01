import { GET } from "@/app/api/calculate/route";
import { NextResponse } from "next/server";

jest.mock("ethers");

describe("GET /api/calculate", () => {
  it("should return the correct DAI value", async () => {
    const mockBalanceOf = jest.fn().mockResolvedValue("1000000000000000000");
    const mockConvertToAssets = jest
      .fn()
      .mockResolvedValue("1100000000000000000");

    const mockContract = {
      balanceOf: mockBalanceOf,
      convertToAssets: mockConvertToAssets,
    };

    jest
      .spyOn(require("ethers"), "Contract")
      .mockImplementation(() => mockContract);

    const response = await GET();
    const data = await response.json();

    expect(data.daiValue).toBe("1.1");
  });

  it("should handle errors", async () => {
    jest.spyOn(require("ethers"), "Contract").mockImplementation(() => {
      throw new Error("Mock error");
    });

    const response = await GET();
    const data = await response.json();

    expect(data.error).toBe("An error occurred while calculating");
    expect(response.status).toBe(500);
  });
});
