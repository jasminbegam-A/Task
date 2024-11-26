import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../services/productServices.js';
import ProductForm from './ProductForm';

function TableView() {
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
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      fetchData();
      alert('Product deleted successfully');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsEditing(true);
  };

  const handleSuccess = () => {
    setIsEditing(false);
    setEditingProduct(null);
    fetchData();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingProduct(null);
  };

  return (
    <div>
      <ProductForm existingProduct={editingProduct} onSuccess={handleSuccess} onCancelEdit={handleCancelEdit} />
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Image</th>
            <th className="py-2 px-4 border-b text-center">Name</th>
            <th className="py-2 px-4 border-b text-center">Price</th>
            <th className="py-2 px-4 border-b text-center">Quantity</th>
            <th className="py-2 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td className="py-2 px-4 border-b text-center">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover mx-auto" />
              </td>
              <td className="py-2 px-4 border-b text-center">{product.name}</td>
              <td className="py-2 px-4 border-b text-center">₹{product.price}</td>
              <td className="py-2 px-4 border-b text-center">{product.quantity}</td>
              <td className="py-2 px-4 border-b text-center">
                <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white p-2 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white p-2 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableView;
