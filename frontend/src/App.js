import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";
import { Layout } from "@/components/site/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Industries from "@/pages/Industries";
import Process from "@/pages/Process";
import Blog from "@/pages/Blog";
import Article from "@/pages/Article";
import Contact from "@/pages/Contact";
import Schedule from "@/pages/Schedule";
import { Privacy, Terms } from "@/pages/Legal";
import NotFound from "@/pages/NotFound";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";

const Site = (C) => (
  <Layout>
    <C />
  </Layout>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-center" theme="dark" toastOptions={{ style: { background: "#0A1120", border: "1px solid rgba(212,175,55,0.3)", color: "#fff" } }} />
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/industries" element={<Layout><Industries /></Layout>} />
          <Route path="/process" element={<Layout><Process /></Layout>} />
          <Route path="/blog" element={<Layout><Blog /></Layout>} />
          <Route path="/blog/:slug" element={<Layout><Article /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/schedule" element={<Layout><Schedule /></Layout>} />
          <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
          <Route path="/terms" element={<Layout><Terms /></Layout>} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
