// src/pages/LandingPage.jsx
import React from 'react';
import hero from '../assets/hero.png';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';
import Navbar from './Navbar'; // Adjust path if needed


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 font-sans">
      {/* Header */}
     <Navbar />


      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 py-16 max-w-7xl mx-auto">
        <div className="md:w-1/2">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Beautiful Clothes <br />
            <span className="text-violet-700">Swap. Redeem. Rewear.</span>
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Join our community-driven platform that helps you give your unused clothes a new life. Swap them with others or redeem using points.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-500 text-white rounded-full font-medium shadow hover:opacity-90 transition">Start Swapping</button>
            <button className="px-6 py-3 border-2 border-violet-600 text-violet-700 rounded-full font-medium hover:bg-violet-50 transition">Browse Items</button>
            <button className="px-6 py-3 border-2 border-blue-500 text-blue-600 rounded-full font-medium hover:bg-blue-50 transition">List an Item</button>
          </div>
        </div>

        <div className="md:w-1/2 mb-8 md:mb-0 relative z-10">
          <div className="absolute top-4 left-4 w-full h-full rounded-xl bg-purple-100 z-0 transform translate-x-1 translate-y-0"></div>
          <img
            src={hero}
            alt="Community swapping clothes"
            className="relative w-full rounded-xl border-4 border-white shadow-2xl z-10"
          />
        </div>
      </section>

      {/* Featured Items Carousel */}
      <section className="px-8 pt-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Items</h2>
       <Swiper
  modules={[Navigation, Pagination, Autoplay]}
  slidesPerView={1}
  spaceBetween={20}
  loop
  navigation
  pagination={{ clickable: true }}
  autoplay={{
    delay: 1000, // auto-slide every 3 seconds
    disableOnInteraction: false,
  }}
  className="rounded-xl"
>
  {[img1, img2, img3, img4].map((img, index) => (
    <SwiperSlide key={index}>
      <div className="flex justify-center items-center py-6">
        <img
          src={img}
          alt={`Featured ${index + 1}`}
          className="w-full max-w-[700px] object-contain rounded-xl shadow-lg"
        />
      </div>
    </SwiperSlide>
  ))}
</Swiper>

      </section>

      {/* Categories Section */}
      <section className="px-8 pt-10 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {['Men', 'Women', 'Kids', 'Accessories', 'Shoes', 'Ethnic', 'Winter Wear', 'Summer Wear'].map((category) => (
            <div key={category} className="bg-white p-4 rounded-xl shadow hover:shadow-lg text-center text-violet-700 font-semibold">
              {category}
            </div>
          ))}
        </div>
      </section>

      {/* Product Listings */}
      <section className="px-8 pt-16 pb-20 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Listings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src="https://via.placeholder.com/300x200.png?text=Item+Image"
                alt={`Product ${item}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-violet-700">Item Title {item}</h3>
                <p className="text-sm text-gray-600">Short description of the item goes here.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Section from Wireframe */}
      <section className="px-8 pb-20 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">What Makes ReWear Special?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-violet-700 mb-2">Community-Driven</h3>
            <p className="text-gray-600">Our platform is built around people sharing and caring. Join thousands who are making an impact together.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-violet-700 mb-2">Sustainable Choices</h3>
            <p className="text-gray-600">By reusing clothes, you contribute to reducing textile waste and carbon footprint. Fashion meets sustainability here.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
