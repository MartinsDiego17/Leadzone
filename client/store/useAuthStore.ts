import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Session } from '@supabase/supabase-js'
import { InfoUser } from '../../client/lib/types'
import { supabaseClient } from '../lib/supabaseClient'

interface AuthStore {
    infoUser: InfoUser | null
    session: Session | null
    isHydrated: boolean
    setSessionFromSupabase: () => Promise<Session | null | undefined>
    loginWithGoogle: () => Promise<void>
    logout: () => Promise<void>
    setInfoUser: () => void
}

export const useAuthStore = create<AuthStore>()(persist((set, get) => {

    supabaseClient.auth.onAuthStateChange((_event, session) => {
        set({ session, isHydrated: true })
        get().setInfoUser()
    })

    return {
        infoUser: null,
        session: null,
        isHydrated: false,

        setSessionFromSupabase: async () => {
            const { data, error } = await supabaseClient.auth.getSession()
            if (error) {
                console.error('Error getting session:', error)
                set({ session: null, isHydrated: true })
                return
            }
            set({ session: data.session, isHydrated: true })
            return data.session
        },

        loginWithGoogle: async () => {
            const { error } = await supabaseClient.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            })
            if (error) {
                console.error('Google login error:', error)
            }
        },

        logout: async () => {
            console.log("HOLA")
            const { error } = await supabaseClient.auth.signOut()
            if (error) {
                console.error('Logout error:', error)
                return
            }
            set({ session: null, infoUser: null, isHydrated: false })
            window.location.href = '/'
        },

        setInfoUser: () => {
            const session = get().session

            if (!session?.user) {
                set({ infoUser: null })
                return
            }

            const user = session.user

            set({
                infoUser: {
                    id: user.id,
                    email: user.email ?? '',
                    fullname: user.user_metadata?.full_name ?? '',
                }
            })
        }
    }
},
    {
        name: 'auth-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
            session: state.session,
            infoUser: state.infoUser,
        }),
    }
)
)