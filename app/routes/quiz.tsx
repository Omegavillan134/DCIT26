import { useLoaderData } from "react-router"
import type { Route } from "./+types/quiz"

export function meta({}: Route.MetaArgs) {
    return [{title: "Quiz"}]
}

export default function quizzes(){
    return (
        <div className="w-fuill">
            <iframe
            src="/quiz/quiz.html"
            title="Quiz"
            className="w-full border-0"
            style={{minHeight: "calc(100vh - 8rem)"}}
            />
        </div>
    )
}