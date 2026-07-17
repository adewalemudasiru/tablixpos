interface AddSupplierForm {
  name: string
  contactPerson: string
  phone: string
  email: string
  address: string
  itemsSupplied: string
}

export const EMPTY_SUPPLIER_FORM: AddSupplierForm = {
  name: "",
  contactPerson: "",
  phone: "",
  email: "",
  address: "",
  itemsSupplied: "",
}

export const SUPPLIER_FIELD_DEFS: {
  key: keyof AddSupplierForm
  label: string
  placeholder: string
  type?: string
}[] = [
  {
    key: "name",
    label: "Supplier Name",
    placeholder: "e.g. Lagos Food Supplies",
  },
  {
    key: "contactPerson",
    label: "Contact Person",
    placeholder: "e.g. Emeka Okafor",
  },
  {
    key: "phone",
    label: "Phone Number",
    placeholder: "e.g. +234 801 234 5678",
  },
  {
    key: "email",
    label: "Email Address",
    placeholder: "e.g. contact@supplier.ng",
    type: "email",
  },
  {
    key: "address",
    label: "Address",
    placeholder: "e.g. 123 Food Street, Lagos",
  },
  {
    key: "itemsSupplied",
    label: "Items Supplied",
    placeholder: "e.g. Rice, Flour, Palm Oil",
  },
]
