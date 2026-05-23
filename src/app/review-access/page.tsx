import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const REVIEW_COOKIE = "lim_review";
const REVIEW_COOKIE_VALUE = "granted";
const REVIEW_PASSWORD = "MotionReview2026";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

async function submit(formData: FormData) {
  "use server";

  const password = String(formData.get("password") ?? "");
  const from = String(formData.get("from") ?? "/");
  const safeFrom = from.startsWith("/") && !from.startsWith("//") ? from : "/";

  if (password !== REVIEW_PASSWORD) {
    redirect(`/review-access?from=${encodeURIComponent(safeFrom)}&error=1`);
  }

  const jar = await cookies();
  jar.set(REVIEW_COOKIE, REVIEW_COOKIE_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: COOKIE_MAX_AGE
  });

  redirect(safeFrom);
}

type PageProps = {
  searchParams: Promise<{ from?: string; error?: string }>;
};

export default async function ReviewAccessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const from = params.from ?? "/";
  const hasError = params.error === "1";

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f4efe4",
        color: "#111111",
        fontFamily: "Inter, system-ui, sans-serif",
        padding: "2rem"
      }}
    >
      <div style={{ width: "100%", maxWidth: "360px" }}>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            margin: 0,
            letterSpacing: "-0.01em"
          }}
        >
          Lash in Motion
        </h1>
        <p
          style={{
            marginTop: "0.5rem",
            marginBottom: "1.5rem",
            fontSize: "0.875rem",
            color: "#111111",
            opacity: 0.7
          }}
        >
          Private review
        </p>
        <p style={{ marginTop: 0, marginBottom: "1.5rem", fontSize: "0.95rem" }}>
          Enter the review password to continue.
        </p>
        <form action={submit}>
          <input type="hidden" name="from" value={from} />
          <input
            type="password"
            name="password"
            autoFocus
            required
            aria-label="Review password"
            style={{
              width: "100%",
              padding: "0.75rem 0.875rem",
              fontSize: "1rem",
              background: "#ffffff",
              border: "1px solid #111111",
              borderRadius: 0,
              color: "#111111",
              outline: "none",
              boxSizing: "border-box"
            }}
          />
          {hasError ? (
            <p
              style={{
                marginTop: "0.75rem",
                marginBottom: 0,
                fontSize: "0.85rem",
                color: "#c1121f"
              }}
            >
              Incorrect password. Try again.
            </p>
          ) : null}
          <button
            type="submit"
            style={{
              marginTop: "1rem",
              width: "100%",
              padding: "0.75rem 1rem",
              fontSize: "0.95rem",
              fontWeight: 500,
              background: "#111111",
              color: "#f4efe4",
              border: "1px solid #111111",
              borderRadius: 0,
              cursor: "pointer"
            }}
          >
            Continue
          </button>
        </form>
      </div>
    </main>
  );
}
