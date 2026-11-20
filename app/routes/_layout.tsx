import { NavLink, Outlet } from "react-router";

export default function Layout() {

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-200 to-slate-300">
      <div className="flex min-h-screen flex-col">
        <div className="flex w-full flex-col">
          <div className="min-h-30 bg-sky-900">
            <div className="relative flex">
              <div className="absolute right-30 top-10">
                <div className="flex gap-4">
                  <nav className="flex gap-4">
                    <NavLink className="link text-white" to="/">Home</NavLink>
                    <NavLink className="link text-white" to="/lessons">Lessons</NavLink>
                    <NavLink className="link text-white" to="/quiz">Quiz</NavLink>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
