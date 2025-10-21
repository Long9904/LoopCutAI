import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TangibleCard } from '@/components/ui/tangible-card';
import { TangibleButton } from '@/components/ui/tangible-button';
import { TangibleInput } from '@/components/ui/tangible-input';
import { DollarSign } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic
    console.log('Login:', { email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-accent-blue/30 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[10px] border-[1.5px] border-border bg-primary shadow-[4px_4px_0px_hsl(var(--border))]">
            <DollarSign className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">Welcome to LoopCutAI</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to manage your subscriptions
          </p>
        </div>

        <TangibleCard>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <TangibleInput
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <TangibleInput
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <TangibleButton type="submit" className="w-full" size="lg">
              Sign In
            </TangibleButton>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/register" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </form>
        </TangibleCard>
      </motion.div>
    </div>
  );
};
