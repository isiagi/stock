'use client'

import { useState } from 'react'
import EntityManager from '@/components/entity-manager'

interface Supplier {
  id: number
  name: string
  email: string
  phone: string
}

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    { id: 1, name: 'Supplier A', email: 'supplierA@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Supplier B', email: 'supplierB@example.com', phone: '098-765-4321' },
  ])

  const handleAddSupplier = (supplier: Omit<Supplier, 'id'>) => {
    setSuppliers((prev) => [...prev, { ...supplier, id: Date.now() }])
  }

  const handleUpdateSupplier = (updatedSupplier: Supplier) => {
    setSuppliers((prev) =>
      prev.map((supplier) =>
        supplier.id === updatedSupplier.id ? updatedSupplier : supplier
      )
    )
  }

  const handleDeleteSupplier = (id: number) => {
    setSuppliers((prev) => prev.filter((supplier) => supplier.id !== id))
  }

  return (
    <EntityManager
      title="Suppliers"
      entities={suppliers}
      onAdd={handleAddSupplier}
      onUpdate={handleUpdateSupplier}
      onDelete={handleDeleteSupplier}
    />
  )
}

