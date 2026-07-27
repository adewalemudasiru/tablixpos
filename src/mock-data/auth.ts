export interface MockAuthUser {
  id: string
  email: string
  pin: string
  businessName: string
  ownerName: string
  phone: string
  role: "Admin" | "Owner"
  createdAt: string
}

const STORAGE_KEY = "tablix_mock_users"
const DEFAULT_ADMIN: MockAuthUser = {
  id: "mock-admin-001",
  email: "admin@tablix.com",
  pin: "123456",
  businessName: "Tablix Demo Restaurant",
  ownerName: "Admin Owner",
  phone: "+2348012345678",
  role: "Admin",
  createdAt: new Date().toISOString(),
}

function readUsers(): MockAuthUser[] {
  if (typeof window === "undefined") return [DEFAULT_ADMIN]

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([DEFAULT_ADMIN]))
      return [DEFAULT_ADMIN]
    }

    const parsed = JSON.parse(raw) as MockAuthUser[]
    if (!Array.isArray(parsed) || parsed.length === 0) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([DEFAULT_ADMIN]))
      return [DEFAULT_ADMIN]
    }

    const hasAdmin = parsed.some(
      (u) => u.email.toLowerCase() === DEFAULT_ADMIN.email.toLowerCase()
    )
    if (!hasAdmin) {
      const next = [DEFAULT_ADMIN, ...parsed]
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    }

    return parsed
  } catch {
    return [DEFAULT_ADMIN]
  }
}

function writeUsers(users: MockAuthUser[]) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

export function getMockUsers(): MockAuthUser[] {
  return readUsers()
}

export function findMockUser(email: string, pin?: string) {
  const users = readUsers()
  const normalizedEmail = email.trim().toLowerCase()
  return users.find((user) => {
    const emailMatches = user.email.toLowerCase() === normalizedEmail
    return pin ? emailMatches && user.pin === pin : emailMatches
  })
}

export function createMockUser(input: {
  email: string
  password?: string
  pin?: string
  businessName: string
  ownerName: string
  phone: string
}) {
  const users = readUsers()
  const exists = users.some(
    (user) => user.email.toLowerCase() === input.email.trim().toLowerCase()
  )
  if (exists) {
    throw new Error("A user with this email already exists.")
  }

  const normalizedPin = (input.pin ?? input.password ?? "123456")
    .replace(/\D/g, "")
    .slice(0, 6)

  const nextUser: MockAuthUser = {
    id: `mock-user-${Date.now()}`,
    email: input.email.trim().toLowerCase(),
    pin: normalizedPin || "123456",
    businessName: input.businessName.trim(),
    ownerName: input.ownerName.trim(),
    phone: input.phone.trim(),
    role: "Owner",
    createdAt: new Date().toISOString(),
  }

  writeUsers([nextUser, ...users])
  return nextUser
}
