'use client'

import { useState } from 'react'
import DashboardLayout from '@/app/components/layout'
import Modal from './modal'

interface Entity {
  id: number
  name: string
  email: string
  phone: string
}

interface EntityManagerProps {
  title: string
  entities: Entity[]
  onAdd: (entity: Omit<Entity, 'id'>) => void
  onUpdate: (entity: Entity) => void
  onDelete: (id: number) => void
}

export default function EntityManager({
  title,
  entities,
  onAdd,
  onUpdate,
  onDelete,
}: EntityManagerProps) {
  const [newEntity, setNewEntity] = useState<Omit<Entity, 'id'>>({
    name: '',
    email: '',
    phone: '',
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewEntity((prev) => ({ ...prev, [name]: value }))
  }

  const handleAdd = () => {
    onAdd(newEntity)
    setNewEntity({ name: '', email: '', phone: '' })
    setIsModalOpen(false)
  }

  const handleUpdate = (entity: Entity) => {
    onUpdate(entity)
    setEditingId(null)
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Add New {title.slice(0, -1)}
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Add New ${title.slice(0, -1)}`}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newEntity.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={newEntity.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={newEntity.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <button
            onClick={handleAdd}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add {title.slice(0, -1)}
          </button>
        </div>
      </Modal>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entities.map((entity) => (
              <tr key={entity.id}>
                <td className="px-4 py-2 border">
                  {editingId === entity.id ? (
                    <input
                      type="text"
                      value={entity.name}
                      onChange={(e) => handleUpdate({ ...entity, name: e.target.value })}
                      className="border p-1 rounded"
                    />
                  ) : (
                    entity.name
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {editingId === entity.id ? (
                    <input
                      type="email"
                      value={entity.email}
                      onChange={(e) => handleUpdate({ ...entity, email: e.target.value })}
                      className="border p-1 rounded"
                    />
                  ) : (
                    entity.email
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {editingId === entity.id ? (
                    <input
                      type="tel"
                      value={entity.phone}
                      onChange={(e) => handleUpdate({ ...entity, phone: e.target.value })}
                      className="border p-1 rounded"
                    />
                  ) : (
                    entity.phone
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {editingId === entity.id ? (
                    <button
                      onClick={() => handleUpdate(entity)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingId(entity.id)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(entity.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}

