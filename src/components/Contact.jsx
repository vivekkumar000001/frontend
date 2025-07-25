import React from 'react';
import { FaEnvelope, FaPhone, FaComments } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto bg-[rgba(45,50,67,0.8)] rounded-xl p-6 md:p-8 shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-orange-500 border-b border-gray-700 pb-3">
          Contact Us
        </h2>
        
        <p className="text-gray-300 mb-8 leading-relaxed">
          Have questions or need assistance? Our support team is available 24/7 to help you with any issues.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <ContactCard 
            icon={<FaEnvelope size={24} className="mr-2" />} 
            title="Email Support"
            items={[
              { label: 'General inquiries', value: 'support@dragontiger.com' },
              { label: 'Account issues', value: 'info@fastcasino.com' }
            ]}
          />
          
          <ContactCard 
            icon={<FaPhone size={24} className="mr-2" />} 
            title="Phone Support"
            items={[
              { label: 'India Toll-Free', value: '1800-123-4567' },
              { label: 'International', value: '+91 98765 43210' }
            ]}
          />
          
          <ContactCard 
            icon={<FaComments size={24} className="mr-2" />} 
            title="Live Chat"
            description="Available 24/7 for instant support"
            button="Start Live Chat"
          />
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold mb-6 text-orange-500">
          Send Us a Message
        </h3>
        
        <form className="space-y-6">
          <div className="space-y-2">
            <label className="block font-medium text-gray-300">Your Name</label>
            <input 
              type="text" 
              className="w-full bg-[rgba(255,255,255,0.1)] border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-orange-500"
              placeholder="Enter your name"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block font-medium text-gray-300">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-[rgba(255,255,255,0.1)] border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-orange-500"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block font-medium text-gray-300">Subject</label>
            <input 
              type="text" 
              className="w-full bg-[rgba(255,255,255,0.1)] border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-orange-500"
              placeholder="Enter subject"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block font-medium text-gray-300">Message</label>
            <textarea 
              rows="5"
              className="w-full bg-[rgba(255,255,255,0.1)] border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-orange-500"
              placeholder="Enter your message"
            ></textarea>
          </div>
          
          <button 
            type="submit"
            className="bg-gradient-to-r from-orange-500 to-orange-700 text-white py-3 px-8 rounded-lg font-bold text-lg w-full hover:opacity-90 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

const ContactCard = ({ icon, title, items, description, button }) => {
  return (
    <div className="bg-[rgba(26,31,45,0.6)] rounded-xl p-6">
      <h3 className="text-lg md:text-xl font-bold mb-4 text-orange-500 flex items-center">
        {icon} {title}
      </h3>
      
      {items && (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index}>
              <p className="text-gray-400">{item.label}:</p>
              <p className="text-yellow-400 font-medium">{item.value}</p>
            </div>
          ))}
        </div>
      )}
      
      {description && (
        <p className="text-gray-300 mb-4">{description}</p>
      )}
      
      {button && title === "Live Chat" ? (
        <a
          href="https://t.me/+nQxMewxBhXljZjk1"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-gradient-to-r from-orange-500 to-orange-700 text-white py-2 px-4 rounded-lg font-medium w-full hover:opacity-90 transition"
        >
          {button}
        </a>
      ) : (
        button && (
          <button className="bg-gradient-to-r from-orange-500 to-orange-700 text-white py-2 px-4 rounded-lg font-medium w-full">
            {button}
          </button>
        )
      )}
    </div>
  );
};

export default Contact;
