import type { Route } from "./+types/quiz";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Quiz" }];
}

export default function Quiz() {
  const quizSrc = `${import.meta.env.BASE_URL}quiz/quiz.html`;

  return (
    <div className="w-full">
      <iframe
        src={quizSrc}
        title="Quiz"
        className="w-full border-0"
        style={{ minHeight: "calc(100vh - 8rem)" }}
      />
    </div>
  );
}
