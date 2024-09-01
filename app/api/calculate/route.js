import { NextResponse } from "next/server";
import { ethers } from "ethers";

export async function GET() {
  try {
    if (!process.env.INFURA_PROJECT_ID) {
      throw new Error("INFURA_PROJECT_ID is not set");
    }

    const provider = new ethers.providers.JsonRpcProvider(
      `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
    );

    const savingsDaiAddress = "0x83F20F44975D03b1b09e64809B757c47f942BEeA";
    const treasuryAddress = "0x36bD3044ab68f600f6d3e081056F34f2a58432c4";

    const abi = [
      "function balanceOf(address) view returns (uint256)",
      "function convertToAssets(uint256) view returns (uint256)",
    ];

    const contract = new ethers.Contract(savingsDaiAddress, abi, provider);

    const sDAIBalance = await contract.balanceOf(treasuryAddress);
    const daiAmount = await contract.convertToAssets(sDAIBalance);

    const daiValue = ethers.utils.formatEther(daiAmount);

    return NextResponse.json({ daiValue });
  } catch (error) {
    console.error("Error in GET /api/calculate:", error);
    return NextResponse.json(
      { error: "An error occurred while calculating. Please try again later." },
      { status: 500 }
    );
  }
}
