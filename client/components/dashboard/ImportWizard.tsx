"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import type { Lead, LeadStatus, Niche, Zone } from "../../lib/types"
import { Upload, ArrowRight, Check, AlertTriangle, AlertCircle, FileX, Target } from "lucide-react"
import { FadeIn } from "../shared/Animations"
import { PreviewData } from "./types/PreviewData"
import { processCsv } from "./helpers/processCsv"
import Link from "next/link"
import { Button } from "../ui/button"
import { useLeadsStore } from "../../store/useLeadsStore"


export function ImportWizard() {
  const router = useRouter()
  const { niches, zones, addniche, addzone, addLeads, getnicheName, getzoneName, getzonesByniche, getLeadsByUserAndNicheAndZone } = useLeadsStore()

  const [step, setStep] = useState(1)
  const [selectedniche, setSelectedniche] = useState("")
  const [selectedzone, setSelectedzone] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [newnicheName, setNewnicheName] = useState("")
  const [newzoneName, setNewzoneName] = useState("")
  const [showNewnicheDialog, setShowNewnicheDialog] = useState(false)
  const [showNewzoneDialog, setShowNewzoneDialog] = useState(false)
  const [showInvalidCsvDialog, setShowInvalidCsvDialog] = useState(false) // 👈 nuevo estado
  const [duplicatesCount, setDuplicatesCount] = useState(0)
  const [errorText, setErrorText] = useState<string>("");
  const [filteredzones, setFilteredZones] = useState<Zone[]>([]);
  const [previewData, setPreviewData] = useState<PreviewData[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

    const currentLeads: Lead[] = await getLeadsByUserAndNicheAndZone({ nicheId: selectedniche, zoneId: selectedzone });

    if (e.target.files?.[0]) {
      const response = await processCsv(e.target.files[0], currentLeads)
      if (response.data) {
        setPreviewData(response.data)
        setFile(e.target.files[0])
        setDuplicatesCount(response.leadsRepeat)
      } else {
        e.target.value = ""
        setFile(null)
        setShowInvalidCsvDialog(true)
      }
    }
  }
  const handlenicheChange = (value: string) => {
    if (value === "nuevo") {
      setShowNewnicheDialog(true)
    } else {
      setSelectedniche(value)
      setSelectedzone("")
    }
  }
  const handlezoneChange = (value: string) => {
    if (value === "nueva") {
      setShowNewzoneDialog(true)
    } else {
      setSelectedzone(value)
    }
  }
  const createniche = async () => {
    if (niches.map(niche => niche.name.toLowerCase()).includes(newnicheName.toLowerCase())) return setErrorText("Ya tienes este nicho en tu lista")
    if (newnicheName.length < 3) return setErrorText("El nicho debe tener como mínimo 3 caracteres");
    if (newnicheName.trim()) {
      const newniche = await addniche(newnicheName)
      setSelectedniche(newniche.id)
      setNewnicheName("")
      setShowNewnicheDialog(false)
      setErrorText("");
      const newFilteredZones = await getzonesByniche(newniche.id);
      setFilteredZones(newFilteredZones)
    }
  }
  const createzone = async () => {
    if (zones.map(zone => zone.name.toLowerCase()).includes(newzoneName.toLowerCase())) return setErrorText("Ya tienes esta zona en tu lista")
    if (newzoneName.length < 3) return setErrorText("La zona debe tener como mínimo 3 caracteres");
    if (newzoneName.trim() && selectedniche) {
      const newzone = await addzone(newzoneName, selectedniche)
      setFilteredZones([...filteredzones, newzone])
      setSelectedzone(newzone.id)
      setNewzoneName("")
      setShowNewzoneDialog(false)
      setErrorText("");
    }
  }
  const handleImport = () => {
    const newLeads = previewData.map(data => ({
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      website: data.website,
      status: "nuevo" as LeadStatus,
      nicheId: selectedniche,
      zoneId: selectedzone,
    }))

    addLeads(newLeads)
    router.push(`/dashboard/leads?niche=${selectedniche}&zone=${selectedzone}`)
  }

  useEffect(() => {
    if (selectedniche) {
      const fetchZones = async () => {
        const response = await getzonesByniche(selectedniche);
        setFilteredZones(response);
      }
      fetchZones();
    }
  }, [selectedniche]);

  const currentNameNiche = (id: string) => niches.find(n => n.id === id)?.name ?? "";
  const currentNameZone = (id: string) => zones.find(z => z.id === id)?.name ?? "";

  const canProceedToStep2 = selectedniche && selectedzone && file
  const allDuplicates = previewData.length === 0 && duplicatesCount > 0

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <FadeIn>
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold">Importar CSV</h1>
          <p className="text-muted-foreground mt-1">Sube tu archivo de G-Maps Extractor y organízalo por nicho y zona</p>
        </div>
      </FadeIn>

      {/* Stepper */}
      <FadeIn delay={100}>
        <div className="flex items-center justify-center gap-4">
          {[
            { num: 1, label: "Configurar" },
            { num: 2, label: "Previsualizar" },
            { num: 3, label: "Confirmar" }
          ].map((s, index) => (
            <div key={s.num} className="flex items-center">
              <div className={`flex items-center gap-2 transition-all ${step >= s.num ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all ${step >= s.num ? 'border-primary bg-primary/20' : 'border-border bg-card'
                  }`}>
                  {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span className="hidden sm:inline text-sm">{s.label}</span>
              </div>
              {index < 2 && (
                <div className={`w-8 sm:w-16 h-0.5 mx-2 transition-colors ${step > s.num ? 'bg-primary' : 'bg-border'}`} />
              )}
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Step 1: Configure */}
      {step === 1 && (
        <FadeIn delay={200}>
          <Card className="glass glass-border">
            <CardHeader>
              <CardTitle className="font-heading">Configurar importación</CardTitle>
              <CardDescription>Selecciona el nicho y la zona para estos leads</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">nicho</label>
                  <Select value={selectedniche} onValueChange={handlenicheChange}>
                    <SelectTrigger className="bg-secondary/50 border-border">
                      <SelectValue placeholder="Seleccionar nicho" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {niches.map((n: Niche) => (
                        <SelectItem key={n.id} value={n.id}>{n.name}</SelectItem>
                      ))}
                      <SelectItem value="nuevo" className="text-primary">+ Crear nuevo nicho</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">zona</label>
                  <Select value={selectedzone} onValueChange={handlezoneChange} disabled={!selectedniche}>
                    <SelectTrigger className="bg-secondary/50 border-border">
                      <SelectValue placeholder={selectedniche ? "Seleccionar zona" : "Primero selecciona un nicho"} />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {
                        filteredzones && (
                          <>
                            {filteredzones.map((z: Zone) => (
                              <SelectItem key={z.id} value={z.id}>{z.name}</SelectItem>
                            ))}
                          </>
                        )
                      }
                      <SelectItem value="nueva" className="text-primary">+ Crear nueva zona</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div
                className={`border-2 border-dashed border-border rounded-xl p-8 text-center transition-all group
    ${selectedniche && selectedzone
                    ? 'hover:border-primary/50 cursor-pointer'
                    : 'opacity-50 cursor-not-allowed'
                  }`}
                onClick={() => selectedniche && selectedzone && document.getElementById('file-input')?.click()}
              >
                <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-4 group-hover:text-primary transition-colors" />
                {file ? (
                  <p className="text-primary font-medium">{file.name}</p>
                ) : (
                  <>
                    <p className="text-foreground">
                      {selectedniche && selectedzone
                        ? 'Arrastra tu CSV aquí o haz click para seleccionar'
                        : 'Selecciona un nicho y zona primero'
                      }
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">Archivos .csv de G-Maps Extractor</p>
                  </>
                )}
                <input
                  id="file-input"
                  type="file"
                  accept=".csv"
                  className="hidden"
                  disabled={!selectedniche || !selectedzone}
                  onChange={handleFileChange}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-lime"
                  disabled={!canProceedToStep2}
                  onClick={() => setStep(2)}
                >
                  Continuar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      )}

      {/* Step 2: Preview */}
      {step === 2 && (
        <FadeIn>
          <Card className="glass glass-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-heading">Previsualizar registros</CardTitle>
                  <CardDescription>Revisa los datos antes de importar</CardDescription>
                </div>
                <Badge variant="secondary" className="bg-secondary">
                  {previewData.length + duplicatesCount} registros en total
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {duplicatesCount > 0 && (
                <div className="flex items-center gap-3 p-4 bg-yellow-950/30 border border-yellow-900/50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
                  <p className="text-sm text-yellow-200">{duplicatesCount} registro{duplicatesCount > 1 && "s"} ya existe{duplicatesCount > 1 && "n"} y será{duplicatesCount > 1 && "n"} ignorado{duplicatesCount > 1 && "s"}</p>
                </div>
              )}

              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">Nombre</th>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">Teléfono</th>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground hidden sm:table-cell">Email</th>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground hidden md:table-cell">Direccion</th>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground hidden lg:table-cell">Sitio web</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((row, index) => (
                      <tr key={index} className="border-b border-border last:border-0">
                        <td className="p-3 text-sm">{row.name}</td>
                        <td className="p-3 text-sm text-muted-foreground">{row.phone}</td>
                        <td className="p-3 text-sm text-muted-foreground hidden sm:table-cell">{row.email || "-"}</td>
                        <td className="p-3 text-sm text-muted-foreground hidden md:table-cell">{row.address}</td>
                        <td className="p-3 text-sm text-muted-foreground hidden lg:table-cell">{row.website || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-muted-foreground text-center">Mostrando {previewData.length} de {previewData.length + duplicatesCount} registros</p>

              <div className="flex justify-between">
                <Button variant="outline" className="border-border" onClick={() => setStep(1)}>
                  Volver
                </Button>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-lime"
                  onClick={() => setStep(3)}
                  disabled={allDuplicates}
                >
                  Continuar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      )}

      {/* Step 3: Confirm */}
      {step === 3 && (
        <FadeIn>
          <Card className="glass glass-border">
            <CardHeader>
              <CardTitle className="font-heading">Confirmar importacion</CardTitle>
              <CardDescription>Revisa el resumen y confirma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-secondary/50 rounded-lg p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nicho</span>
                  <span className="font-medium">{currentNameNiche(selectedniche)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Zona</span>
                  <span className="font-medium">{currentNameZone(selectedzone)}</span>
                </div>
                <div className="border-t border-border pt-4 flex justify-between">
                  <span className="text-muted-foreground">Leads a importar</span>
                  <span className="font-medium text-primary">{previewData.length}</span>
                </div>
                {duplicatesCount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duplicados descartados</span>
                    <span className="font-medium text-muted-foreground">{duplicatesCount}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" className="border-border" onClick={() => setStep(2)}>
                  Volver
                </Button>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-lime"
                  onClick={handleImport}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Confirmar importacion
                </Button>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      )}

      {/* New niche Dialog */}
      <Dialog open={showNewnicheDialog} onOpenChange={setShowNewnicheDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-heading">Crear nuevo nicho</DialogTitle>
            <DialogDescription>
              Ingresa el nombre del nuevo nicho para tus leads
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Ej: Arquitectos"
              value={newnicheName}
              onChange={(e) => setNewnicheName(e.target.value)}
              className="bg-secondary border-border"
            />
          </div>
          {errorText.length
            ? <p className="flex place-items-center gap-x-2">
              <span className="opacity-70"><AlertCircle size={15} /></span>
              <span>{errorText}</span>
            </p>
            : <></>}
          <DialogFooter>
            <Button variant="outline" className="border-border" onClick={() => setShowNewnicheDialog(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={createniche}
              disabled={!newnicheName.trim()}
            >
              Crear nicho
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New zone Dialog */}
      <Dialog open={showNewzoneDialog} onOpenChange={setShowNewzoneDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-heading">Crear nueva zone</DialogTitle>
            <DialogDescription>
              Ingresa el nombre de la nueva zona para el nicho {currentNameNiche(selectedniche)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Ej: Palermo"
              value={newzoneName}
              onChange={(e) => setNewzoneName(e.target.value)}
              className="bg-secondary border-border"
            />
          </div>
          {errorText.length
            ? <p className="flex place-items-center gap-x-2">
              <span className="opacity-70"><AlertCircle size={15} /></span>
              <span>{errorText}</span>
            </p>
            : <></>}
          <DialogFooter>
            <Button variant="outline" className="border-border" onClick={() => setShowNewzoneDialog(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={createzone}
              disabled={!newzoneName.trim()}
            >
              Crear zone
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ✅ Invalid CSV Dialog */}
      <Dialog open={showInvalidCsvDialog} onOpenChange={setShowInvalidCsvDialog}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-full bg-red-950/50 border border-red-900/50 flex items-center justify-center shrink-0">
                <FileX className="w-5 h-5 text-red-400" />
              </div>
              <DialogTitle className="font-heading">Archivo no compatible</DialogTitle>
            </div>
            <DialogDescription className="text-sm text-muted-foreground leading-relaxed pt-1">
              El archivo CSV que subiste no tiene el formato correcto. Esta herramienta solo acepta archivos generados con{" "}
              <Link href={"https://gmapsextractor.com/"} target="_blank">
                <span className="text-foreground font-medium">G-Maps Extractor</span>.
              </Link>
            </DialogDescription>
          </DialogHeader>

          <div className="bg-secondary/50 border border-border rounded-lg p-4 space-y-2 text-sm">
            <p className="font-medium text-foreground">¿Cómo solucionarlo?</p>
            <ol className="space-y-1 text-muted-foreground list-decimal list-inside">
              <li>Abre
                <Link href={"https://gmapsextractor.com/"} target="_blank">
                  <span className="text-foreground">{" "}G-Maps Extractor{" "}</span>
                </Link>
                y realiza tu búsqueda</li>
              <li>Exporta los resultados en formato <span className="text-foreground">.csv</span></li>
              <li>Vuelve a subir ese archivo aquí</li>
            </ol>
          </div>

          <DialogFooter>
            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setShowInvalidCsvDialog(false)}
            >
              Entendido, voy a intentarlo de nuevo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}