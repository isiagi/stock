'use client'

import { useState } from 'react'
import DashboardLayout from '../../components/layout'
import Modal from '@/components/modal'

interface SalesOrder {
  id: number
  orderNumber: string
  customer: string
  orderDate: string
  totalAmount: number
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered'
}

export default function SalesOrders() {
  const [salesOrders, setSalesOrders] = useState<SalesOrder[]>([
    { id: 1, orderNumber: 'SO-001', customer: 'Customer A', orderDate: '2023-05-01', totalAmount: 500, status: 'Pending' },
    { id: 2, orderNumber: 'SO-002', customer: 'Customer B', orderDate: '2023-05-02', totalAmount: 750, status: 'Processing' },
  ])

  const [newSalesOrder, setNewSalesOrder] = useState<Omit<SalesOrder, 'id'>>({
    orderNumber: '',
    customer: '',
    orderDate: '',
    totalAmount: 0,
    status: 'Pending',
  })

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewSalesOrder((prev) => ({ ...prev, [name]: name === 'totalAmount' ? Number(value) : value }))
  }

  const handleAddSalesOrder = () => {
    setSalesOrders((prev) => [...prev, { ...newSalesOrder, id: Date.now() }])
    setNewSalesOrder({ orderNumber: '', customer: '', orderDate: '', totalAmount: 0, status: 'Pending' })
    setIsModalOpen(false)
  }

  const handleDeleteSalesOrder = (id: number) => {
    setSalesOrders((prev) => prev.filter((order) => order.id !== id))
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Sales Orders</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Add New Sales Order
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Sales Order">
        <div className="space-y-4">
          <div>
            <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">
              Order Number
            </label>
            <input
              type="text"
              id="orderNumber"
              name="orderNumber"
              value={newSalesOrder.orderNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="customer" className="block text-sm font-medium text-gray-700">
              Customer
            </label>
            <input
              type="text"
              id="customer"
              name="customer"
              value={newSalesOrder.customer}
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
              value={newSalesOrder.orderDate}
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
              value={newSalesOrder.totalAmount}
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
              value={newSalesOrder.status}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          <button
            onClick={handleAddSalesOrder}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Sales Order
          </button>
        </div>
      </Modal>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Order Number</th>
              <th className="px-4 py-2 border">Customer</th>
              <th className="px-4 py-2 border">Order Date</th>
              <th className="px-4 py-2 border">Total Amount</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {salesOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-2 border">{order.orderNumber}</td>
                <td className="px-4 py-2 border">{order.customer}</td>
                <td className="px-4 py-2 border">{order.orderDate}</td>
                <td className="px-4 py-2 border">${order.totalAmount.toFixed(2)}</td>
                <td className="px-4 py-2 border">{order.status}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDeleteSalesOrder(order.id)}
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

