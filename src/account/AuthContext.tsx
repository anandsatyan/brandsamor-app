import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  claimLocalArtifacts,
  fetchAccountSession,
  fetchAccountWorkspace,
  logoutAccount,
  requestMagicLink,
  type AccountConsultationEntry,
  type AccountCustomer,
  type AccountSamplingSession,
} from './api';
import { listLocalConversations } from '../scentStudio/lib/conversationLibrary';
import { SAMPLING_STORAGE_KEY, type SamplingState } from '../sampling/types/sampling';

type AuthContextValue = {
  loading: boolean;
  customer: AccountCustomer | null;
  authenticated: boolean;
  consultations: AccountConsultationEntry[];
  openSampling: AccountSamplingSession | null;
  refresh: () => Promise<void>;
  requestLink: (email: string, nextPath: string) => Promise<{
    ok: boolean;
    mode: string;
    emailed: boolean;
    devMagicUrl?: string;
  }>;
  logout: () => Promise<void>;
  syncLocalToAccount: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readLocalSamplingSessionId(): string | null {
  try {
    const raw = localStorage.getItem(SAMPLING_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SamplingState;
    return parsed?.sessionId || null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState<AccountCustomer | null>(null);
  const [consultations, setConsultations] = useState<AccountConsultationEntry[]>([]);
  const [openSampling, setOpenSampling] = useState<AccountSamplingSession | null>(null);

  const syncLocalToAccount = useCallback(async () => {
    const localConsults = listLocalConversations().map((c) => ({
      consultationId: c.consultationId,
      recoveryToken: c.recoveryToken,
    }));
    const samplingSessionId = readLocalSamplingSessionId();
    const claimed = await claimLocalArtifacts({
      consultations: localConsults,
      samplingSessionIds: samplingSessionId ? [samplingSessionId] : [],
    });
    setConsultations(claimed.consultations || []);
    setOpenSampling(claimed.openSampling || null);
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const session = await fetchAccountSession();
      if (!session.authenticated || !session.customer) {
        setCustomer(null);
        setConsultations([]);
        setOpenSampling(null);
        return;
      }
      setCustomer(session.customer);
      try {
        await syncLocalToAccount().catch(() => null);
        const workspace = await fetchAccountWorkspace();
        setCustomer(workspace.customer);
        setConsultations(workspace.consultations || []);
        setOpenSampling(workspace.openSampling || null);
      } catch {
        // Session may exist even if workspace fails (e.g. DB blip)
      }
    } catch {
      setCustomer(null);
    } finally {
      setLoading(false);
    }
  }, [syncLocalToAccount]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const requestLink = useCallback(async (email: string, nextPath: string) => {
    return requestMagicLink(email, nextPath);
  }, []);

  const logout = useCallback(async () => {
    await logoutAccount();
    setCustomer(null);
    setConsultations([]);
    setOpenSampling(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      loading,
      customer,
      authenticated: Boolean(customer),
      consultations,
      openSampling,
      refresh,
      requestLink,
      logout,
      syncLocalToAccount,
    }),
    [
      loading,
      customer,
      consultations,
      openSampling,
      refresh,
      requestLink,
      logout,
      syncLocalToAccount,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}

/** Safe optional hook when provider may be absent (e.g. marketing pages). */
export function useOptionalAuth() {
  return useContext(AuthContext);
}
