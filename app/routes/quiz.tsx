import { useLoaderData } from "react-router"
import { lessons as allLessons } from "~/data/lesson";

export function loader(){
    return{
        lessons: allLessons
    }
}

export default function quizzes(){
    const { lessons } = useLoaderData<typeof loader>();
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="w-full flex flex-col items-center justify-center">
                    <table className="bg-slate-100 border-2 border-black table-auto">
                    <thead>
                    <tr>
                        <th className="p-2 text-left"><input type="checkbox" /></th>
                        <th className="p-2 text-left"><p>Lesson</p></th>
                        <th className="p-2 text-left"><p>Name</p></th>
                    </tr>
                    </thead>
            {lessons.map((val) => {
                return(
                    <tbody>
                        <tr key={val.id}>
                            <td className="p-2"><input type="checkbox" /></td>
                            <td className="p-2"><p>{val.lesson}</p></td>
                            <td className="p-2"><p>{val.name}</p></td>
                        </tr>
                    </tbody>
                )
            })}
                    </table>
            </div>
            <div>
                <button>Hello</button>
            </div>
        </div>
    )
}