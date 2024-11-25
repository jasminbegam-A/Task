import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../services/productServices.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductForm({ existingProduct, onSuccess }) {
  const [product, setProduct] = useState({ name: '', quantity: '', price: '', image: '' });

  useEffect(() => {
    if (existingProduct) {
      setProduct(existingProduct);
    }
  }, [existingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product._id) {
        await updateProduct(product._id, product);
        toast.success('Product updated successfully');
      } else {
        await createProduct(product);
        toast.success('Product added successfully');
      }
      onSuccess();
    } catch (error) {
      toast.error('Action failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 ml-3">
      <input name="name" value={product.name} onChange={handleChange} placeholder="Name" className="mb-2 p-2 border rounded ml-3" />
      <input name="quantity" type="number" value={product.quantity} onChange={handleChange} placeholder="Quantity" className="mb-2 p-2 border rounded ml-3" />
      <input name="price" type="number" value={product.price} onChange={handleChange} placeholder="Price" className="mb-2 p-2 border rounded ml-3" />
      <input name="image" value={product.image} onChange={handleChange} placeholder="Image URL" className="mb-2 p-2 border rounded ml-3" />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded ml-3">
        {product._id ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
}

export default ProductForm;
