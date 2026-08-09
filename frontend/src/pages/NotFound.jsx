import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050B14] text-white flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="text-[#D4AF37] text-sm uppercase tracking-[0.3em] mb-4">404</div>
        <h1 className="font-serif-lux text-4xl mb-4">Page not found</h1>
        <p className="text-white/55 mb-8">The page you requested does not exist or may have moved.</p>
        <Link to="/" className="inline-block bg-[#D4AF37] text-[#050B14] px-7 py-3 uppercase tracking-wider text-sm font-semibold">Return Home</Link>
      </div>
    </div>
  );
}
