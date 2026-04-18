import { Lead, LeadStatus, Niche, Zone } from '../lib/types'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { useAuthStore } from './useAuthStore'
import { axiosClient } from '../lib/axiosClient'
import { serverConfig } from '../lib/serverConfig'

type LeadsStore = {
    leads: Lead[]
    niches: Niche[]
    zones: Zone[]
    addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void
    addLeads: (leads: Omit<Lead, 'id' | 'createdAt' | 'userId'>[]) => Promise<Lead[]>
    updateLeadStatus: (leadId: string, status: LeadStatus) => Promise<void>
    deleteLead: (leadId: string) => Promise<void>
    addniche: (name: string) => Promise<Niche>
    addzone: (name: string, nicheId: string) => Promise<Zone>
    getnicheName: (nicheId: string) => Promise<string>
    getzoneName: (zoneId: string) => Promise<string>
    getzonesByniche: (nicheId: string) => Promise<Zone[]>
    getNichesByUser: () => Promise<Niche[]>
    getLeadsByUserAndNicheAndZone: ({ nicheId, zoneId }: { nicheId: string, zoneId: string }) => Promise<Lead[]>
    loadLeads: () => Promise<Lead[]>
}

const getAuthUserId = (): string => {
    const userId = useAuthStore.getState().infoUser?.id
    if (!userId) throw new Error('No authenticated user')
    return userId
}

export const useLeadsStore = create<LeadsStore>()(
    persist(
        (set, get) => ({
            leads: [],
            niches: [],
            zones: [],
            addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => {
            },
            addLeads: async (leads: Omit<Lead, 'id' | 'createdAt' | 'userId'>[]) => {
                const newLeads = leads.map((lead) => {
                    const newLead = {
                        ...lead,
                        userId: getAuthUserId()
                    }
                    return newLead;
                })
                const localUrl = serverConfig.leads.common;

                try {
                    const { data } = await axiosClient.post(localUrl, newLeads);
                    return data;
                } catch (error) {
                    throw error;
                }
            },
            updateLeadStatus: async (leadId: string, status: LeadStatus) => {
                const localUrl = serverConfig.leads.updateStatus({ leadId, status });

                const previousLeads = get().leads;

                set(state => ({
                    leads: state.leads.map(l => l.id === leadId ? { ...l, status } : l)
                }));

                try {
                    await axiosClient.patch(localUrl);
                } catch (error) {
                    set({ leads: previousLeads });
                    throw error;
                }
            },
            deleteLead: async (leadId: string) => {
                const localUrl = serverConfig.leads.delete({ leadId });
                try {
                    const { data } = await axiosClient.delete(localUrl);
                    set(state => ({ leads: state.leads.filter(lead => lead.id !== leadId) }));
                } catch (error) {
                    throw error;
                }

            },
            addniche: async (name: string) => {
                if (name.length < 3) return;
                const userId = getAuthUserId();
                const localUrl = serverConfig.niches.common;

                const normalizedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

                const newNiche = { name: normalizedName, userId }

                try {
                    const { data } = await axiosClient.post(localUrl, newNiche);
                    const finalNiche = data.data;
                    set(state => ({ niches: [...state.niches, finalNiche] }));
                    return data.data;
                } catch (error) {
                    throw error;
                }
            },
            addzone: async (name: string, nicheId: string) => {
                if (name.length < 3) return;
                const userId = getAuthUserId();
                const localUrl = serverConfig.zones.common;

                const normalizedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

                const newZone = { nicheId, name: normalizedName, userId }

                try {
                    const { data } = await axiosClient.post(localUrl, newZone);
                    const finalZone = data.data;
                    set(state => ({ zones: [...state.zones, finalZone] }));
                    return data.data;
                } catch (error) {
                    throw error;
                }
            },
            getnicheName: async (nicheId: string) => {
                const localUrl = serverConfig.niches.findOne({ nicheId });

                try {
                    const { data } = await axiosClient(localUrl);
                } catch (error) {

                }

                return "";
            },
            getzoneName: async (zoneId: string) => {
                return ""
            },
            getzonesByniche: async (nicheId: string) => {
                const userId = getAuthUserId();
                const localUrl = serverConfig.zones.getZonesByNiche({ nicheId, userId });
                try {
                    const { data } = await axiosClient(localUrl);
                    set({ zones: data.data })
                    return data.data;
                } catch (error) {
                    throw error;
                }
            },
            getNichesByUser: async () => {
                const userId = getAuthUserId();
                const localUrl = serverConfig.niches.getNichesByUser({ userId });
                try {
                    const { data } = await axiosClient(localUrl);
                    set({ niches: data.data })
                    return [];
                } catch (error) {
                    throw error;
                }
            },
            getLeadsByUserAndNicheAndZone: async ({ nicheId, zoneId }: { nicheId: string, zoneId: string }) => {
                const userId = getAuthUserId();
                const localUrl = serverConfig.leads.getLeadsByUser({ userId, nicheId, zoneId });
                try {
                    const { data } = await axiosClient(localUrl);
                    return data.data;
                } catch (error) {
                    throw error;
                }
            },
            loadLeads: async () => {
                const localUrl = serverConfig.leads.getLeadsByUser({ userId: getAuthUserId() });

                try {
                    const { data } = await axiosClient(localUrl);
                    set({ leads: data.data })
                    return data.data;
                } catch (error) {
                    throw Error
                }
                return []
            }

        }),
        {
            name: 'leads-store',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                leads: state.leads,
                niches: state.niches,
                zones: state.zones,
            }),
        }
    )
)