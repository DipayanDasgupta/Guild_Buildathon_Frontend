"use client"
import { Heart, Car, Bike, Shield } from "lucide-react"

export function ProductsGrid() {
    // This data would be fetched from your `/api/dashboard/products` endpoint
  const products = [
    { title: "Health Insurance", icon: Heart },
    { title: "Car Insurance", icon: Car },
    { title: "Bike Insurance", icon: Bike },
    { title: "Life Insurance", icon: Shield },
  ];
  return (
    <div className="p-6 bg-card rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-foreground">Explore Our Products</h3>
      <p className="mb-4 text-muted-foreground">Get instant quotes for what matters most.</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.title} className="p-4 border rounded-lg cursor-pointer border-border hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3 mb-2"><product.icon className="w-5 h-5 text-primary" /><h4 className="font-medium text-foreground">{product.title}</h4></div>
            <button className="w-full mt-2 text-sm py-1.5 rounded-md border border-border bg-transparent hover:bg-secondary">Get Quote</button>
          </div>
        ))}
      </div>
    </div>
  )
}
