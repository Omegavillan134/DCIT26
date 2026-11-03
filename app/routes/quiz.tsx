import { useLoaderData } from "react-router"


interface Lesson {id: string; lesson: string;name: string}

const Hardcoded_Lessons: Lesson[] = [
    {id: "1", lesson:"Lesson 1", name: "Glimpse at Emerging Technologies"},
    {id: "2", lesson:"Lesson 2", name: "Introduction To C++ Programming"},
    {id: "3", lesson:"Lesson 3", name: "C++ Basics"},
    {id: "4", lesson:"Lesson 4", name: "C++ Logic"},
    {id: "5", lesson:"Lesson 5", name: "Functions & Debugging in C+"},
]

export function loader(){
    return{
        lessons: Hardcoded_Lessons
    }
}

export default function quizzes(){
    const { lessons } = useLoaderData<typeof loader>();
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="bg-white w-full flex flex-col items-center justify-center">
                    <tr>
                        <th></th>
                        <th><p>Lesson</p></th>
                        <th><p>Name</p></th>
                    </tr>
            {lessons.map((val) => {
                return(
                    <table className="border-2 border-separate">
                        
                        <tr key={val.id}>
                            <td><input type="checkbox" /></td>
                            <td><p>{val.lesson}</p></td>
                            <td><p>{val.name}</p></td>
                        </tr>
                    </table>
                )
            })}
            </div>
            <div>
                <button>Hello</button>
            </div>
        </div>
    )
}