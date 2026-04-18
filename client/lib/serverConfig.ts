const enviroment = process.env;
const serverUrl = enviroment.NEXT_PUBLIC_SERVER_URL;
const leadsPrefix = `${serverUrl}/leads`;
const nichesPrefix = `${serverUrl}/niches`;
const zonesPrefix = `${serverUrl}/zones`;

export const serverConfig = {
    leads: {
        common: leadsPrefix,
        getLeadsByUser: ({ userId, nicheId, zoneId }: { userId: string, nicheId?: string, zoneId?: string }) => {
            const params = new URLSearchParams()
            if (nicheId) params.append('nicheId', nicheId)
            if (zoneId) params.append('zoneId', zoneId)
            const query = params.toString()
            return `${leadsPrefix}/by-user/${userId}${query ? `?${query}` : ''}`
        },
        updateStatus: ({ leadId, status } : { leadId: string, status: string }) => `${leadsPrefix}/update-status?leadId=${leadId}&status=${status}`,
        delete: ({ leadId } : { leadId: string }) => `${leadsPrefix}/delete/${leadId}`
    },
    niches: {
        common: nichesPrefix,
        getNichesByUser: ({ userId }: { userId: string }) => `${nichesPrefix}/by-user/${userId}`,
        findOne: ({ nicheId } : { nicheId: string }) => `${nichesPrefix}/${nicheId}`
    },
    zones: {
        common: zonesPrefix,
        getZonesByNiche: ({ nicheId, userId }: { nicheId: string, userId: string }) => `${zonesPrefix}/by-niche/${nicheId}?userId=${userId}`
    }
}