import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../services/productServices.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductForm({ existingProduct, onSuccess, onCancelEdit }) {
  const [product, setProduct] = useState({ name: '', quantity: '', price: '', image: '' });

  useEffect(() => {
    if (existingProduct) {
      setProduct(existingProduct);
    } else {
      setProduct({ name: '', quantity: '', price: '', image: '' });
    }
  }, [existingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await createProduct(product);
      toast.success('Product added successfully');
      setProduct({ name: '', quantity: '', price: '', image: '' }); 
      onSuccess();
    } catch (error) {
      toast.error('Action failed');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(product._id, product);
      toast.success('Product updated successfully');
      setProduct({ name: '', quantity: '', price: '', image: '' }); 
      onSuccess();
    } catch (error) {
      toast.error('Action failed');
    }
  };

  return (
    <form className="mb-4 ml-3">
      <input name="name" value={product.name} onChange={handleChange} placeholder="Name" className="mb-2 p-2 border rounded ml-3" />
      <input name="quantity" type="number" value={product.quantity} onChange={handleChange} placeholder="Quantity" className="mb-2 p-2 border rounded ml-3" />
      <input name="price" type="number" value={product.price} onChange={handleChange} placeholder="Price" className="mb-2 p-2 border rounded ml-3" />
      <input name="image" value={product.image} onChange={handleChange} placeholder="Image URL" className="mb-2 p-2 border rounded ml-3" />
      {existingProduct ? (
        <>
          <button type="button" onClick={handleUpdate} className="bg-yellow-500 text-white p-2 rounded ml-3">
            Update Product
          </button>
          <button type="button" onClick={onCancelEdit} className="bg-gray-500 text-white p-2 rounded ml-3">
            Cancel Edit
          </button>
        </>
      ) : (
        <button type="button" onClick={handleAdd} className="bg-blue-500 text-white p-2 rounded ml-3">
          Add Product
        </button>
      )}
    </form>
  );
}

export default ProductForm;
