import React from 'react';

export const Footer = () => {
  return (
    <footer className='bg-white text-gray-700 border-t border-gray-300'>
      <div className='container mx-auto py-6 px-4'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='mb-6 md:mb-0'>
            <h2 className='text-xl font-semibold'>Company Name</h2>
            <p className='text-gray-600 mt-2'>Providing quality services since 2024.</p>
          </div>
          <div className='flex flex-col md:flex-row gap-8 mb-6 md:mb-0'>
            <div>
              <h3 className='text-lg font-medium'>Quick Links</h3>
              <ul className='mt-2'>
                <li><a href="/about" className='text-gray-600 hover:text-blue-600 transition duration-300'>About Us</a></li>
                <li><a href="/contact" className='text-gray-600 hover:text-blue-600 transition duration-300'>Contact</a></li>
                <li><a href="/privacy" className='text-gray-600 hover:text-blue-600 transition duration-300'>Privacy Policy</a></li>
                <li><a href="/terms" className='text-gray-600 hover:text-blue-600 transition duration-300'>Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className='text-lg font-medium'>Follow Us</h3>
              <div className='flex gap-4 mt-2'>
                <a href="https://facebook.com" className='text-gray-600 hover:text-blue-600 transition duration-300'>
                  Facebook
                </a>
                <a href="https://twitter.com" className='text-gray-600 hover:text-blue-600 transition duration-300'>
                  Twitter
                </a>
                <a href="https://instagram.com" className='text-gray-600 hover:text-blue-600 transition duration-300'>
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='text-center mt-6'>
          <p className='text-gray-500 text-sm'>© 2024 Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};


