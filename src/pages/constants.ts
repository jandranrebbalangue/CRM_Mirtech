export interface ClientsProps {
  id: string,
  name: string,
  contact: string,
  avatar?: string,
  organization: string,
  assignedUser?: string,
  status: string,
  createdAt?: string,
}

export interface SelectOptionsProps {
  label: string,
  value: string,
}

export const CLIENTS_KEY = "CLIENTS"

export const STATUS_OPTIONS = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];


