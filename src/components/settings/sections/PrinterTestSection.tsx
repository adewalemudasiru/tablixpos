import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Button } from "../../ds"
import { Card, FormSelect, ToggleRow } from "../common"
import { SectionLabel } from "@/components/SectionLabel"
import { usePrinter } from "../../../hooks/usePrinter"

const PRINTER_TYPES = [
  "ESC/POS Thermal (80mm)",
  "ESC/POS Thermal (58mm)",
  "Star Micronics TSP100",
  "Epson TM-T88",
  "USB / Bluetooth Printer",
]

export function PrinterTestSection() {
  const printer = usePrinter()
  const [printers, setPrinters] = useState<string[]>([])
  const [selectedPrinter, setSelectedPrinter] = useState<string>("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    if (!printer.hasElectron) return

    printer.getPrinters().then((list) => {
      if (!cancelled) {
        setPrinters(list)
        setSelectedPrinter(list[0] ?? "")
      }
    })

    return () => {
      cancelled = true
    }
  }, [printer])

  const handleRefresh = async () => {
    setLoading(true)
    const list = await printer.getPrinters()
    setPrinters(list)
    setSelectedPrinter(list[0] ?? "")
    setLoading(false)
  }

  const handleTestPrint = async () => {
    setLoading(true)
    const success = await printer.printViaElectron()
    setLoading(false)
    if (success) {
      toast.success("Test print sent to the default system printer.")
    } else {
      toast.error("Test print failed. Falling back to browser print.")
    }
  }

  return (
    <Card>
      <div className="flex flex-col gap-5">
        <SectionLabel>Printer / POS hardware</SectionLabel>
        <div className="space-y-4">
          <div className="text-sm text-slate-600">
            Electron printer support is available when running the desktop app.
            Use the refresh button to discover installed printers.
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormSelect
              label="Printer Type"
              value={selectedPrinter || ""}
              onChange={(value) => setSelectedPrinter(value)}
              options={printers.length ? printers : PRINTER_TYPES}
            />
            <ToggleRow
              label="Force browser print fallback"
              sub="Use the browser print dialog instead of the native Electron print API."
              checked={!printer.hasElectron}
              onChange={() => {
                toast(
                  `Electron printer API is ${printer.hasElectron ? "available" : "not available"}.`
                )
              }}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={handleRefresh} loading={loading}>
              Refresh printers
            </Button>
            <Button onClick={handleTestPrint} loading={loading}>
              Print test receipt
            </Button>
          </div>
          <div className="text-xs text-slate-500">
            If no printers appear, make sure the desktop app is running and your
            printer is installed in the OS.
          </div>
        </div>
      </div>
    </Card>
  )
}
