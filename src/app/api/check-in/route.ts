import { NextResponse } from "next/server";
import type { CheckInPayload } from "@/content/types";

/**
 * Check-in webhook stub (v2).
 *
 * Production recommendation: prefer a git-based update (PR / commit to
 * `src/content/places.ts`) rather than writing files on a read-only
 * serverless filesystem. This route validates the secret and returns a
 * clear JSON response so you can wire automation later.
 *
 * Env: CHECK_IN_WEBHOOK_SECRET
 */
export async function POST(request: Request) {
  const secret = process.env.CHECK_IN_WEBHOOK_SECRET;

  if (!secret) {
    return NextResponse.json(
      {
        ok: false,
        error: "CHECK_IN_WEBHOOK_SECRET is not configured",
        hint: "Set the env var, then POST a CheckInPayload JSON body.",
      },
      { status: 503 }
    );
  }

  let body: CheckInPayload;
  try {
    body = (await request.json()) as CheckInPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const headerSecret = request.headers.get("x-check-in-secret");
  const provided = headerSecret || body.secret;

  if (!provided || provided !== secret) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  if (!body.date || !body.title) {
    return NextResponse.json(
      {
        ok: false,
        error: "Missing required fields",
        required: ["date", "title"],
        optional: ["companions", "image", "nightImage", "id"],
      },
      { status: 400 }
    );
  }

  // Stub only — do not mutate content files on serverless hosts.
  // Wire git-based updates or an external store in v2.
  return NextResponse.json({
    ok: true,
    received: {
      id: body.id ?? `check-in-${body.date}`,
      date: body.date,
      title: body.title,
      companions: body.companions ?? [],
      image: body.image ?? null,
      nightImage: body.nightImage ?? null,
    },
    persisted: false,
    message:
      "Payload accepted. Content was not written. For production, append via git to src/content/places.ts or connect a writable store.",
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "/api/check-in",
    method: "POST",
    auth: "Header x-check-in-secret or body.secret === CHECK_IN_WEBHOOK_SECRET",
    schema: {
      date: "YYYY-MM-DD",
      title: "string | { zh, en }",
      companions: "(string | { zh, en })[]?",
      image: "string?",
      nightImage: "string?",
      id: "string?",
    },
  });
}
