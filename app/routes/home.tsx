import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return(
    <div className="flex-1 flex flex-col items-center justify-center">
      <p>Welcome Ka komsay</p>
      <p>[redacted] is a reviewer website for DCIT 26 – Application Development course that
provides all the lessons covered throughout the semester in one convenient platform.
It also features interactive quizzes that allow students to test their knowledge, practice
recalling important concepts, and prepare for exams and quizzes.</p>
      <div className="mx-auto mt-auto grid w-full max-w-4xl grid-cols-2 gap-8 px-6 pb-10">
        <Link to="/lessons" className="block">
          <div className="grid min-h-60 content-start bg-white p-4">
            <div />
          </div>
        </Link>
        <Link to="/quiz" className="block">
          <div className="grid min-h-60 content-start bg-white p-4">
            <div />
          </div>
        </Link>
      </div>
    </div>
  )
}
