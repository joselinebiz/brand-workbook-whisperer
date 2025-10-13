import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Purchase {
  product_type: string;
  expires_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  purchases: Purchase[];
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  checkAccess: (productType: string) => boolean;
  refreshPurchases: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchPurchases = async (userId: string) => {
    const { data, error } = await supabase
      .from('purchases')
      .select('product_type, expires_at')
      .eq('user_id', userId);
    
    if (error) {
      if (import.meta.env.DEV) {
        console.error('[AuthContext] Error fetching purchases:', error);
      }
    } else {
      setPurchases(data || []);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            fetchPurchases(session.user.id);
          }, 0);
        } else {
          setPurchases([]);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchPurchases(session.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });
    
    if (!error) {
      toast({
        title: "Account created!",
        description: "You can now sign in with your credentials.",
      });
    }
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (!error) {
      navigate('/');
    }
    
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setPurchases([]);
    navigate('/');
  };

  const checkAccess = (productType: string): boolean => {
    // Workbook 0 is always free
    if (productType === 'workbook_0') return true;
    
    // Check if user has bundle access
    const bundlePurchase = purchases.find(p => p.product_type === 'bundle');
    if (bundlePurchase && new Date(bundlePurchase.expires_at) > new Date()) {
      return true;
    }
    
    // Check if user has specific product access
    const purchase = purchases.find(p => p.product_type === productType);
    if (purchase && new Date(purchase.expires_at) > new Date()) {
      return true;
    }
    
    return false;
  };

  const refreshPurchases = async () => {
    if (user) {
      await fetchPurchases(user.id);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      purchases,
      loading,
      signUp,
      signIn,
      signOut,
      checkAccess,
      refreshPurchases
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};