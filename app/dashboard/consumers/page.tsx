'use client'

import { useState } from 'react'
import EntityManager from '@/components/entity-manager'

interface Consumer {
  id: number
  name: string
  email: string
  phone: string
}

export default function Consumers() {
  const [consumers, setConsumers] = useState<Consumer[]>([
    { id: 1, name: 'Consumer A', email: 'consumerA@example.com', phone: '111-222-3333' },
    { id: 2, name: 'Consumer B', email: 'consumerB@example.com', phone: '444-555-6666' },
  ])

  const handleAddConsumer = (consumer: Omit<Consumer, 'id'>) => {
    setConsumers((prev) => [...prev, { ...consumer, id: Date.now() }])
  }

  const handleUpdateConsumer = (updatedConsumer: Consumer) => {
    setConsumers((prev) =>
      prev.map((consumer) =>
        consumer.id === updatedConsumer.id ? updatedConsumer : consumer
      )
    )
  }

  const handleDeleteConsumer = (id: number) => {
    setConsumers((prev) => prev.filter((consumer) => consumer.id !== id))
  }

  return (
    <EntityManager
      title="Consumers"
      entities={consumers}
      onAdd={handleAddConsumer}
      onUpdate={handleUpdateConsumer}
      onDelete={handleDeleteConsumer}
    />
  )
}

