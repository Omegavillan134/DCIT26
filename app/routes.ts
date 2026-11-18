import { type RouteConfig, index, layout, route} from "@react-router/dev/routes";

export default [
    layout("routes/_layout.tsx", [
        index("routes/home.tsx"),
        route("quiz", "routes/quiz.tsx"),
        route("lessons", "routes/lessons.tsx"),
        route("lessons/:lessonId", "routes/lesson.tsx"),
])] satisfies RouteConfig;
