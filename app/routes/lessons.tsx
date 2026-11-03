import { Link, useLoaderData } from "react-router"

interface Lesson {id: string; lesson: string;name: string, description: string}

const Hardcoded_Lessons: Lesson[] = [
    {id: "1", lesson:"Lesson 1", name: "Glimpse at Emerging Technologies", description: "This lesson provides an overview of emerging technologies and their impact on various industries."},
    {id: "2", lesson:"Lesson 2", name: "Introduction To C++ Programming", description: "This lesson introduces the fundamentals of C++ programming and its applications."},
    {id: "3", lesson:"Lesson 3", name: "C++ Basics", description: "This lesson covers the basic concepts and syntax of C++ programming."},
]
export function loader() {
    return {
        lessons: Hardcoded_Lessons
    }
}

export default function lessons() {
    const { lessons } = useLoaderData<typeof loader>();
    return (
        <div>
            <div>
                <p>DCIT 26 LECTURES</p>
                <p>Access Lectures materials and class discussions to learn the key concepts and lessons from each topic.</p>
            </div>
            {lessons.map((val) => {
                return (
                    <div key={val.id} className="bg-slate-100 border-2 rounded-lg border-black p-4 m-4">
                        <Link to="lessons"><h2>{val.lesson}</h2></Link>
                        <Link to="lessons"><p>{val.name}</p></Link>
                        <Link to="lessons"><p>{val.description}</p></Link>
                    </div>
                )
            })}
        </div>
    )
}