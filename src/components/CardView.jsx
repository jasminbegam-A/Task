import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../services/productServices.js';
import ProductForm from './ProductForm';

function CardView() {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await getProducts();
    setProducts(result.data);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchData();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);  // Set the product to be edited
    setIsEditing(true);
  };

  const handleSuccess = () => {
    setIsEditing(false);
    setEditingProduct(null);
    fetchData();
  };

  return (
    <div>
      <ProductForm existingProduct={editingProduct} onSuccess={handleSuccess} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product._id} className="border rounded shadow p-4">
            <div className="relative h-48 mb-4">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain rounded" 
              />
            </div>
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="mb-2">Price: ₹{product.price}</p>
            <p className="mb-2">Quantity: {product.quantity}</p>
            <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white p-2 rounded mr-2">
              Edit
            </button>
            <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white p-2 rounded">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardView;
