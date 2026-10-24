/**
 * PAGES
 *   /          → Home (landing page)
 *   /quiz      → The 5-step quiz
 *   /r/:id     → A saved result (shareable link)
 *   /admin     → Admin dashboard
 */
import { lazy, Suspense } from "react";
import { SiteProvider, usePath } from "./lib/app.jsx";
import Home from "./pages/Home.jsx";
import Quiz from "./pages/Quiz.jsx";
import Result from "./pages/Result.jsx";

const Admin = lazy(() => import("./admin/Admin.jsx")); // only loaded for /admin

function Routes() {
  const path = usePath();
  if (path.startsWith("/admin"))
    return (
      <Suspense fallback={null}>
        <Admin />
      </Suspense>
    );
  if (path.startsWith("/quiz")) return <Quiz />;
  if (path.startsWith("/r/")) return <Result id={path.split("/")[2]} />;
  return <Home />;
}

export default function App() {
  return (
    <SiteProvider>
      <Routes />
    </SiteProvider>
  );
}
