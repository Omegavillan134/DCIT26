import { Link, Outlet } from "react-router"

export default function layout() {
    return(
        <body className="min-h-screen bg-gradient-to-r from-cyan-200 to-slate-300">
            <div className="min-h-screen flex flex-col">
                <div className="w-full flex flex-col">
                    <div className="bg-sky-900 min-h-30">
                        <div className="flex relative">
                            <div className="absolute top-10 right-30">
                                <div className="flex flex-rows gap-4 ">
                                    <Link className="link text-white" to="/">Home</Link>
                                    <Link className="link text-white" to="lessons">Lessons</Link>
                                    <Link className="link text-white" to="reviewer">Review</Link>
                                    <Link className="link text-white" to="quiz">Quiz</Link>
                                    <Link className="link text-white" to="Contact Us">Contact Us</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Outlet />
            </div>
        </body>
    )
}