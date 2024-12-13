'use client'

import { useState } from 'react'
import DashboardLayout from '../../components/layout'
import Modal from '@/components/modal'

interface StockItem {
  id: number
  openingStock: number
  stockReceived: number
  sales: number
  brand: string
  date: string
  availableStock: number
}

export default function Stock() {
  const [stockItems, setStockItems] = useState<StockItem[]>([
    {
      id: 1,
      openingStock: 100,
      stockReceived: 50,
      sales: 30,
      brand: 'Brand A',
      date: '2023-05-01',
      availableStock: 120,
    },
    // Add more initial stock items as needed
  ])

  const [newItem, setNewItem] = useState<Omit<StockItem, 'id' | 'availableStock'>>({
    openingStock: 0,
    stockReceived: 0,
    sales: 0,
    brand: '',
    date: '',
  })

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewItem((prev) => ({ ...prev, [name]: name === 'brand' ? value : Number(value) }))
  }

  const handleAddItem = () => {
    const availableStock = newItem.openingStock + newItem.stockReceived - newItem.sales
    setStockItems((prev) => [
      ...prev,
      { ...newItem, id: Date.now(), availableStock },
    ])
    setNewItem({
      openingStock: 0,
      stockReceived: 0,
      sales: 0,
      brand: '',
      date: '',
    })
    setIsModalOpen(false)
  }

  const handleDeleteItem = (id: number) => {
    setStockItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Stock Management</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Add New Stock
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Stock">
        <div className="space-y-4">
          <div>
            <label htmlFor="openingStock" className="block text-sm font-medium text-gray-700">
              Opening Stock
            </label>
            <input
              type="number"
              id="openingStock"
              name="openingStock"
              value={newItem.openingStock}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="stockReceived" className="block text-sm font-medium text-gray-700">
              Stock Received
            </label>
            <input
              type="number"
              id="stockReceived"
              name="stockReceived"
              value={newItem.stockReceived}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="sales" className="block text-sm font-medium text-gray-700">
              Sales
            </label>
            <input
              type="number"
              id="sales"
              name="sales"
              value={newItem.sales}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={newItem.brand}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={newItem.date}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <button
            onClick={handleAddItem}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Stock
          </button>
        </div>
      </Modal>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Opening Stock</th>
              <th className="px-4 py-2 border">Stock Received</th>
              <th className="px-4 py-2 border">Sales</th>
              <th className="px-4 py-2 border">Brand</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Available Stock</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stockItems.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-2 border">{item.openingStock}</td>
                <td className="px-4 py-2 border">{item.stockReceived}</td>
                <td className="px-4 py-2 border">{item.sales}</td>
                <td className="px-4 py-2 border">{item.brand}</td>
                <td className="px-4 py-2 border">{item.date}</td>
                <td className="px-4 py-2 border">{item.availableStock}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDeleteItem(item.id)}
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

