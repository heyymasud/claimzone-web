import { create } from 'zustand';
import { createClient } from '@/lib/supabase/client';
import { User, UserStats } from '@/types/users';

// Initialize Supabase client
const supabase = createClient();

interface AuthStore {
  user: User | null;
  userStats: UserStats | null;
  userFavorites: number[];
  loading: boolean;
  initialized: boolean;
  favoriteLoading: number | null;

  // Auth actions
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resendConfirmationEmail: (email: string) => Promise<void>;

  // User stats
  fetchUserStats: () => Promise<void>;
  addClaim: (giveawayId: number, worth: number) => Promise<void>;

  // Favorites
  loadFavorites: () => Promise<void>;
  addFavorite: (giveawayId: number) => Promise<void>;
  removeFavorite: (giveawayId: number) => Promise<void>;
  isFavorite: (giveawayId: number) => boolean;
}

export const useAuthStore = create<AuthStore>((set, get) => {
  let authSubscription: any = null;

  const initializeAuth = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData?.session;

    if (session?.user) {
      const user = {
        id: session.user.id,
        username:
          session.user.user_metadata?.username ||
          session.user.email?.split('@')[0] ||
          'User',
        email: session.user.email || '',
        createdAt: new Date(session.user.created_at || Date.now()).getTime(),
      };

      set({ user });
      await Promise.all([get().fetchUserStats(), get().loadFavorites()]);
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user && event === 'SIGNED_IN') {
          const user = {
            id: session.user.id,
            username:
              session.user.user_metadata?.username ||
              session.user.email?.split('@')[0] ||
              'User',
            email: session.user.email || '',
            createdAt: new Date(session.user.created_at || Date.now()).getTime(),
          }

          set({ user, loading: true });
          await Promise.all([get().fetchUserStats(), get().loadFavorites()]);
          set({ loading: false });
        } else if (event === 'SIGNED_OUT') {
          set({
            user: null,
            userStats: null,
            userFavorites: [],
            favoriteLoading: null,
          });
        }
      }
    )

    authSubscription = subscription;
    set({ initialized: true });
  };

  if (typeof window !== 'undefined') {
    initializeAuth();
    window.addEventListener('beforeunload', () => {
      authSubscription?.unsubscribe?.();
    });
  }

  return {
    user: null,
    userStats: null,
    userFavorites: [],
    loading: true,
    initialized: false,
    favoriteLoading: null,

    /** LOGIN */
    login: async (email, password) => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error(error.message);
    },

    /** REGISTER */
    register: async (username, email, password) => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username }
        },
      })
      if (error) throw new Error(error.message);
    },

    /** LOGOUT */
    logout: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) console.error('Logout error:', error);
      set({ user: null, userStats: null, userFavorites: [], favoriteLoading: null })
    },

    /** RESEND CONFIRMATION EMAIL */
    resendConfirmationEmail: async (email) => {
      const supabase = createClient()
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: { emailRedirectTo: window.location.origin },
      })
      if (error) throw new Error(error.message)
    },

    /** FETCH / CREATE USER STATS */
    fetchUserStats: async () => {
      const { user } = get();
      if (!user) return;

      setTimeout(async () => {
        const { data, error } = await supabase
          .from('user_stats')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching stats:', error);
          return;
        }

        if (!data) {
          const defaultStats: UserStats = {
            username: user.username || 'User',
            total_claimed: 0,
            total_worth: 0,
            claimed_giveaways: [],
          };

          const { data: inserted, error: insertError } = await supabase
            .from('user_stats')
            .insert([{ user_id: user.id, ...defaultStats }])
            .select()
            .single();

          if (insertError) {
            console.error('Error creating default stats:', insertError);
            return;
          }

          set({ userStats: inserted });
        } else {
          set({ userStats: data });
        }
      })
    },

    /** ADD CLAIM */
    addClaim: async (giveawayId, worth) => {
      const { user, userStats } = get();
      if (!user || !userStats) return;

      const updatedStats: UserStats = {
        ...userStats,
        total_claimed: userStats.total_claimed + 1,
        total_worth: userStats.total_worth + worth,
        claimed_giveaways: Array.from(
          new Set([...(userStats.claimed_giveaways || []), giveawayId])
        ),
      };

      const { data, error } = await supabase
        .from('user_stats')
        .update({
          total_claimed: updatedStats.total_claimed,
          total_worth: updatedStats.total_worth,
          claimed_giveaways: updatedStats.claimed_giveaways,
        })
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating user stats:', error);
        return;
      }

      set({ userStats: data });
    },

    /** LOAD FAVORITES */
    loadFavorites: async () => {
      const { user } = get();
      if (!user) return;

      setTimeout(async () => {
        const { data, error } = await supabase
          .from('user_favorites')
          .select('giveaway_id')
          .eq('user_id', user.id);

        if (error) {
          console.error('Error loading favorites:', error);
          set({ initialized: true });
          return;
        }

        set({
          userFavorites: data?.map((f) => f.giveaway_id) || [],
          initialized: true,
        });
      })
    },

    /** ADD FAVORITE */
    addFavorite: async (giveawayId) => {
      const { user, userFavorites } = get();
      if (!user) return;

      set({
        userFavorites: Array.from(new Set([...userFavorites, giveawayId])),
        favoriteLoading: giveawayId,
      });

      try {
        const { error } = await supabase
          .from('user_favorites')
          .insert([{ user_id: user.id, giveaway_id: giveawayId }]);

        if (error) {
          set({
            userFavorites: userFavorites.filter((id) => id !== giveawayId),
            favoriteLoading: null,
          });
          throw new Error(error.message);
        }
      } catch (err) {
        console.error('Error in addFavorite:', err);
      } finally {
        set({ favoriteLoading: null });
      }
    },

    /** REMOVE FAVORITE */
    removeFavorite: async (giveawayId) => {

      const { user, userFavorites } = get();
      if (!user) return;

      set({
        userFavorites: userFavorites.filter((id) => id !== giveawayId),
        favoriteLoading: giveawayId,
      });

      try {
        const { error } = await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('giveaway_id', giveawayId);

        if (error) {
          set({
            userFavorites: Array.from(new Set([...userFavorites, giveawayId])),
            favoriteLoading: null,
          });
          throw new Error(error.message);
        }
      } catch (err) {
        console.error('Error in removeFavorite:', err);
      } finally {
        set({ favoriteLoading: null });
      }
    },

    /** CHECK IF FAVORITE */
    isFavorite: (giveawayId) => {
      const { userFavorites } = get();
      return userFavorites.includes(giveawayId);
    },
  };
});