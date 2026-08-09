import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { formatError } from "../../lib/api";

export default function AdminLogin() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back.");
      nav("/admin");
    } catch (err) {
      toast.error(formatError(err.response?.data?.detail));
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050B14] px-6">
      <form onSubmit={submit} data-testid="admin-login-form" className="bg-[#0A1120] border border-white/10 p-10 w-full max-w-md">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-10 h-10 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]"><Lock size={18} /></span>
          <div>
            <div className="font-serif-lux text-xl text-white">Kencroft Admin</div>
            <div className="text-white/40 text-xs uppercase tracking-wider">Lead Management</div>
          </div>
        </div>
        <label className="block mb-4">
          <span className="text-xs uppercase tracking-wider text-white/50 block mb-2">Email</span>
          <input required autoComplete="username" type="email" data-testid="admin-email" className="lux-input" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="block mb-6">
          <span className="text-xs uppercase tracking-wider text-white/50 block mb-2">Password</span>
          <input required autoComplete="current-password" type="password" data-testid="admin-password" className="lux-input" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit" disabled={loading} data-testid="admin-login-submit"
          className="w-full bg-[#D4AF37] text-[#050B14] px-8 py-4 uppercase tracking-wider text-sm font-semibold hover:bg-[#E5C158] transition-colors disabled:opacity-60">
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
