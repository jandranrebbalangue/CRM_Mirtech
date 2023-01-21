export interface ClientsProps {
  id: number,
  name: string,
  contact: number,
  avatar?: string,
  organization: string,
  assignedUser?: string,
  status: string,
  createdAt?: string,
}

export const USER_KEY = "CLIENT_USER"

export const STATUS_OPTIONS = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];


