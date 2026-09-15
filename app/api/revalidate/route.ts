import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Body shape is controlled by the GROQ projection configured on the webhook in
// sanity.io/manage, not by the document's full shape - keep it in sync with that projection.
type WebhookPayload = {
  _type: string;
  slug?: string;
};

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    if (!body?._type) {
      return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }

    switch (body._type) {
      case "profile":
        revalidatePath("/");
        revalidatePath("/about");
        break;
      case "job":
        revalidatePath("/");
        break;
      case "project":
        revalidatePath("/projects");
        if (body.slug) {
          revalidatePath(`/projects/${body.slug}`);
        }
        break;
      default:
        return NextResponse.json(
          { message: `No revalidation configured for type: ${body._type}` },
          { status: 400 }
        );
    }

    return NextResponse.json({ revalidated: true, type: body._type, now: Date.now() });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
