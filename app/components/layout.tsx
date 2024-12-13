"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Home', href: '/dashboard' },
  { name: 'Stock', href: '/dashboard/stock' },
  { name: 'Suppliers', href: '/dashboard/suppliers' },
  { name: 'Consumers', href: '/dashboard/consumers' },
  { name: 'Products', href: '/dashboard/products' },
  { name: 'Purchase Orders', href: '/dashboard/purchase-orders' },
  { name: 'Sales Orders', href: '/dashboard/sales-orders' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <nav className="mt-5 px-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 ${
                pathname === item.href
                  ? 'text-gray-900 bg-gray-100'
                  : 'text-gray-600'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  )
}

