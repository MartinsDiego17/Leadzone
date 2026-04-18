import Papa from 'papaparse'
import { PreviewData } from '../types/PreviewData'
import { Lead } from "../../../lib/types";

type ProcessCsvResult = {
    data: PreviewData[] | null
    leadsRepeat: number
}

const minRows = ["Name", "Phone", "Fulladdress", "Website"];

export const processCsv = (file: File, currentLeads: Lead[]): Promise<ProcessCsvResult> => {

    let leadsRepeat = 0;

    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const data: PreviewData[] = results.data
                    .filter((row: any) => {
                        const nameOfRow = row['Name']?.toLowerCase()
                        const keysOfObjectGMapsExtractor = Object.keys(row);
                        minRows.forEach((key: string) => {
                            if (!keysOfObjectGMapsExtractor.includes(key)) resolve({ data: null, leadsRepeat: 0 })
                        })

                        const isDuplicate = currentLeads.some(
                            lead => lead.name.toLowerCase() === nameOfRow
                        )
                        if (isDuplicate) leadsRepeat++
                        return !isDuplicate
                    })
                    .map((row: any) => ({
                        name: row['Name'] ?? '',
                        phone: row['Phone'] ?? '',
                        email: '',
                        address: row['Fulladdress'] ?? '',
                        website: row['Website'] ?? '',
                    }))

                resolve({ data, leadsRepeat })
            },
            error: (error) => {
                reject(error)
            }
        })
    })
}