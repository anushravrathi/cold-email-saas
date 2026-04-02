import { NextResponse } from "next/server";
import Papa from "papaparse";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const text = await file.text();

    const parsed = Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
    });

    return NextResponse.json({
      message: "Parsed successfully",
      data: parsed.data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to parse CSV" },
      { status: 500 }
    );
  }
}