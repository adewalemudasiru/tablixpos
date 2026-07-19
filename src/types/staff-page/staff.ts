export interface StaffForm {
  name: string
  email: string
  role: string
  pin: string
  assignedStation?: string
}

export interface Staff {
  id: string
  name: string
  email: string | null
  phone: string | null
  role: string
  isActive: boolean
  createdAt: string
  updatedAt?: string
  assignedStation?: string
}

export type StaffTab = "Team" | "Roles & Permissions" | "Activity"

export interface StaffStats {
  totalStaff: number
  adminsAndManagers: number
  cashiers: number
  waitersAndChefs: number
}

export interface StaffTableProps {
  staff: Staff[]
  loading: boolean
  search: string
  roleFilter: string
  page: number
  pageSize: number
  kotEnabled: boolean
  roles: any[]
  onEdit: (staff: Staff) => void
  onResetPin: (staff: Staff) => void
  onDelete: (staff: Staff) => void
  onSearchChange: (value: string) => void
  onRoleFilterChange: (value: string) => void
  onPageChange: (page: number) => void
}
