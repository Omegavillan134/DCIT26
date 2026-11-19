import { Link, useLoaderData } from "react-router";
import { lessons as allLessons } from "~/data/lesson";

export function loader() {
  return { lessons: allLessons };
}

export default function Lessons() {
  const { lessons } = useLoaderData<typeof loader>();
  return (
    <div>
      <div>
        <p>DCIT 26 LECTURES</p>
        <p>Access Lectures materials and class discussions to learn the key concepts and lessons from each topic.</p>
      </div>
      {lessons.map((val) => (
        <Link key={val.id} to={`/lessons/${val.id}`}
          className="block bg-slate-100 border-2 rounded-lg border-black p-4 m-4">
          <h2>{val.lesson}</h2>
          <p>{val.name}</p>
          <p>{val.description}</p>
          <p className="text-xs">
            {[val.pdf ? "Slides" : "", val.text?.length ? "Text" : ""].filter(Boolean).join(" · ")}
          </p>
        </Link>
      ))}
    </div>
  );
}