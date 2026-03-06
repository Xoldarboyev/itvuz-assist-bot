import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useLanguage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t.loggedIn);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl bg-card p-8 border border-border">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 font-body text-sm transition-colors">
          <ArrowLeft className="h-4 w-4" /> {t.back}
        </button>
        <h1 className="font-display text-4xl text-primary text-center mb-2">
          bodroq<span className="text-accent">.uz</span>
        </h1>
        <p className="text-center text-muted-foreground font-body text-sm mb-8">{t.signInTitle}</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input type="email" placeholder={t.email} value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder={t.password} value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t.signingIn : t.signIn}
          </Button>
        </form>
        <p className="text-center text-muted-foreground font-body text-sm mt-6">
          {t.dontHaveAccount}{" "}
          <Link to="/register" className="text-accent hover:underline">{t.register}</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
