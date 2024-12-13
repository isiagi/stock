'use client'

import { useState } from 'react'
import DashboardLayout from '../../components/layout'
import Modal from '@/components/modal'

interface PurchaseOrder {
  id: number
  orderNumber: string
  supplier: string
  orderDate: string
  totalAmount: number
  status: 'Pending' | 'Approved' | 'Received'
}

export default function PurchaseOrders() {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([
    { id: 1, orderNumber: 'PO-001', supplier: 'Supplier A', orderDate: '2023-05-01', totalAmount: 1000, status: 'Pending' },
    { id: 2, orderNumber: 'PO-002', supplier: 'Supplier B', orderDate: '2023-05-02', totalAmount: 1500, status: 'Approved' },
  ])

  const [newPurchaseOrder, setNewPurchaseOrder] = useState<Omit<PurchaseOrder, 'id'>>({
    orderNumber: '',
    supplier: '',
    orderDate: '',
    totalAmount: 0,
    status: 'Pending',
  })

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewPurchaseOrder((prev) => ({ ...prev, [name]: name === 'totalAmount' ? Number(value) : value }))
  }

  const handleAddPurchaseOrder = () => {
    setPurchaseOrders((prev) => [...prev, { ...newPurchaseOrder, id: Date.now() }])
    setNewPurchaseOrder({ orderNumber: '', supplier: '', orderDate: '', totalAmount: 0, status: 'Pending' })
    setIsModalOpen(false)
  }

  const handleDeletePurchaseOrder = (id: number) => {
    setPurchaseOrders((prev) => prev.filter((order) => order.id !== id))
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Purchase Orders</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Add New Purchase Order
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Purchase Order">
        <div className="space-y-4">
          <div>
            <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">
              Order Number
            </label>
            <input
              type="text"
              id="orderNumber"
              name="orderNumber"
              value={newPurchaseOrder.orderNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">
              Supplier
            </label>
            <input
              type="text"
              id="supplier"
              name="supplier"
              value={newPurchaseOrder.supplier}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700">
              Order Date
            </label>
            <input
              type="date"
              id="orderDate"
              name="orderDate"
              value={newPurchaseOrder.orderDate}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700">
              Total Amount
            </label>
            <input
              type="number"
              id="totalAmount"
              name="totalAmount"
              value={newPurchaseOrder.totalAmount}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={newPurchaseOrder.status}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Received">Received</option>
            </select>
          </div>
          <button
            onClick={handleAddPurchaseOrder}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Purchase Order
          </button>
        </div>
      </Modal>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Order Number</th>
              <th className="px-4 py-2 border">Supplier</th>
              <th className="px-4 py-2 border">Order Date</th>
              <th className="px-4 py-2 border">Total Amount</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-2 border">{order.orderNumber}</td>
                <td className="px-4 py-2 border">{order.supplier}</td>
                <td className="px-4 py-2 border">{order.orderDate}</td>
                <td className="px-4 py-2 border">${order.totalAmount.toFixed(2)}</td>
                <td className="px-4 py-2 border">{order.status}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDeletePurchaseOrder(order.id)}
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

