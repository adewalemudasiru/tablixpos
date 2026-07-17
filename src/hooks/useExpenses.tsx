// hooks/useExpenses.ts
import { useState, useCallback, useEffect, useMemo } from "react"
import { useAppStore } from "../store/AppContext"
import { expensesAPI, type ApiExpense } from "../services/api"
import type { Expense } from "../store/AppContext"
import { toast } from "sonner"

function mapApiExpense(e: ApiExpense): Expense {
  return {
    id: e.id,
    date: e.expenseDate.split("T")[0],
    description: e.description,
    category: e.category,
    amount: e.amount,
    paidBy: "Owner",
    status: "Approved",
    notes: "",
  }
}

export interface ExpenseForm {
  category: string
  description: string
  amount: string
  date: string
  paymentMethod: "Cash" | "Transfer" | "Card"
  reference: string
  notes: string
}

export function useExpenses() {
  const { expenses, setExpenses } = useAppStore()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchExpenses = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await expensesAPI.list()
      setExpenses(res.data.expenses.map(mapApiExpense))
    } catch (e: any) {
      setError(e?.data?.message ?? e?.message ?? "Failed to load expenses.")
    } finally {
      setLoading(false)
    }
  }, [setExpenses])

  useEffect(() => {
    fetchExpenses()
  }, [fetchExpenses])

  const addExpense = useCallback(
    async (form: ExpenseForm) => {
      try {
        await expensesAPI.create({
          amount: Number(form.amount.replace(/,/g, "")),
          description: form.description,
          category: form.category as ApiExpense["category"],
          expenseDate: form.date,
        })
        toast.success("Expense added successfully")
        await fetchExpenses()
        return true
      } catch (e: any) {
        toast.error(e?.data?.message ?? e?.message ?? "Failed to add expense.")
        return false
      }
    },
    [fetchExpenses]
  )

  const updateExpense = useCallback(
    async (id: string, form: ExpenseForm) => {
      try {
        await expensesAPI.update(id, {
          amount: Number(form.amount.replace(/,/g, "")),
          description: form.description,
          category: form.category as ApiExpense["category"],
          expenseDate: form.date,
        })
        toast.success("Expense updated")
        await fetchExpenses()
        return true
      } catch (e: any) {
        toast.error(
          e?.data?.message ?? e?.message ?? "Failed to update expense."
        )
        return false
      }
    },
    [fetchExpenses]
  )

  const deleteExpense = useCallback(
    async (id: string) => {
      try {
        await expensesAPI.remove(id)
        toast.success("Expense deleted")
        await fetchExpenses()
        return true
      } catch (e: any) {
        toast.error(
          e?.data?.message ?? e?.message ?? "Failed to delete expense."
        )
        return false
      }
    },
    [fetchExpenses]
  )

  const approvedTotal = useMemo(
    () =>
      expenses
        .filter((e) => e.status === "Approved")
        .reduce((s, e) => s + e.amount, 0),
    [expenses]
  )

  const thisMonthTotal = useMemo(
    () => expenses.reduce((s, e) => s + e.amount, 0),
    [expenses]
  )

  const pendingCount = useMemo(
    () => expenses.filter((e) => e.status === "Pending").length,
    [expenses]
  )

  const pendingTotal = useMemo(
    () =>
      expenses
        .filter((e) => e.status === "Pending")
        .reduce((s, e) => s + e.amount, 0),
    [expenses]
  )

  const uniqueCategories = useMemo(() => {
    const cats = Array.from(
      new Set(expenses.map((e) => e.category).filter(Boolean))
    )
    return cats.sort()
  }, [expenses])

  const toEditForm = (e: Expense): ExpenseForm => ({
    category: e.category,
    description: e.description,
    amount: e.amount.toString(),
    date: e.date,
    paymentMethod: (e.paymentMethod as "Cash" | "Transfer" | "Card") || "Cash",
    reference: e.reference || "",
    notes: e.notes || "",
  })

  return {
    expenses,
    loading,
    error,
    fetchExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
    approvedTotal,
    thisMonthTotal,
    pendingCount,
    pendingTotal,
    uniqueCategories,
    toEditForm,
  }
}
