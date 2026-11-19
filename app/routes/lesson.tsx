import type { Route } from "./+types/lesson";
import { Link, useSearchParams } from "react-router";
import { lessons } from "~/data/lesson";

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) return [{ title: "Lesson" }];
  return [{ title: `${loaderData.lesson.lesson} – ${loaderData.lesson.name}` }];
}

export function clientLoader({ params }: Route.ClientLoaderArgs) {
  const lesson = lessons.find((l) => l.id === params.lessonId);
  if (!lesson) throw new Response("Lesson not found", { status: 404 });
  return { lesson, lessons };
}

export default function LessonDetail({ loaderData }: Route.ComponentProps) {
  const { lesson, lessons } = loaderData;
  const [searchParams, setSearchParams] = useSearchParams();

  const hasSlides = Boolean(lesson.pdf);
  const hasText = Boolean(lesson.text?.length);
  const req = searchParams.get("view");
  const preferred = lesson.defaultView ?? (hasSlides ? "slides" : "text");
  const view =
    req === "text" && hasText ? "text" :
    req === "slides" && hasSlides ? "slides" :
    preferred === "text" && hasText ? "text" :
    hasSlides ? "slides" : "text";

  const setView = (next: "slides" | "text") =>
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("view", next);
      return p;
    }, { preventScrollReset: true });

  const base = import.meta.env.BASE_URL;
  const pdfPath = lesson.pdf?.startsWith("/") ? lesson.pdf.slice(1) : lesson.pdf;
  const pdfSrc = pdfPath
    ? `${base}${pdfPath}#navpanes=0&pagemode=none&view=FitH&zoom=page-width`
    : undefined;

  return (
    <div className="mx-auto w-full max-w-5xl p-6">
      <article className="min-w-0 flex-1">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">{lesson.lesson}: {lesson.name}</h1>
          {hasSlides && hasText && (
            <div role="group" aria-label="Lesson view"
              className="flex overflow-hidden rounded-lg border-2 border-black">
              <button type="button" onClick={() => setView("slides")} aria-pressed={view === "slides"}
                className={`px-3 py-1 ${view === "slides" ? "bg-black text-white" : "bg-white text-black"}`}>
                Slides
              </button>
              <button type="button" onClick={() => setView("text")} aria-pressed={view === "text"}
                className={`px-3 py-1 ${view === "text" ? "bg-black text-white" : "bg-white text-black"}`}>
                Text
              </button>
            </div>
          )}
        </div>

        <p className="mb-4">{lesson.description}</p>

        {view === "slides" && pdfSrc ? (
          <div className="flex flex-col gap-2">
            <iframe src={pdfSrc} title={`${lesson.lesson} slides`}
              className="h-[80vh] w-full rounded-lg border-2 border-black bg-white" />
          </div>
        ) : hasText ? (
          <div className="flex flex-col gap-3">
            {(lesson.text ?? []).map((paragraph, i) => <p key={i}>{paragraph}</p>)}
          </div>
        ) : (
          <p>Content coming soon.</p>
        )}

        <Link to="/lessons" className="mt-6 inline-block">← Back to all lessons</Link>
      </article>
    </div>
  );
}
