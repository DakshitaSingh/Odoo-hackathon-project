import React, { useState } from 'react';

const AddNewItemPage = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    size: '',
    condition: '',
    tags: '',
    images: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageUpload = (e) => {
    setForm({ ...form, images: [...e.target.files] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // Submit logic here
  };

  return (
    <div className='bg-gradient-to-br from-purple-50 via-white to-purple-100'>
      <div className="min-h-screen w-1/2 mx-auto p-8 ">
      <h1 className="text-2xl font-bold text-purple-700 mb-6">Add New Item</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md space-y-4 border border-gray-200"
      >
        <div>
          <label className="block mb-1 font-medium">Upload Images</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleImageUpload}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          ></textarea>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Type</label>
            <input
              type="text"
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Size</label>
            <input
              type="text"
              name="size"
              value={form.size}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Condition</label>
            <input
              type="text"
              name="condition"
              value={form.condition}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full shadow hover:scale-105 transition"
        >
          Submit Item
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddNewItemPage;