
import React, { useState } from 'react';
import { Eye, EyeOff, Lock, LogIn, User, Calendar, Coffee, Utensils, Wine, CheckCircle, Clock, Users } from 'lucide-react';

function Test2() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
    setShowLoginModal(false);
    // Add your authentication logic here
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-[#4B49AC]">EventHelpers</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-700 font-bold hover:text-[#4B49AC]">Home</a>
            <a href="#" className="text-gray-700 font-bold hover:text-[#4B49AC]">Services</a>
            <a href="#" className="text-gray-700 font-bold hover:text-[#4B49AC]">About</a>
            <a href="#" className="text-gray-700 font-bold hover:text-[#4B49AC]">Contact</a>
          </nav>
          <button 
            onClick={() => setShowLoginModal(true)}
            className="bg-[#4B49AC] text-white px-4 py-2 rounded-md hover:bg-[#3f3d91] transition duration-150"
          >
            Login
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0000]/80 to-[#0000]/10 z-10"></div>
        <div 
          className="h-[400px] bg-cover bg-center relative" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80')" }}
        >
          <div className="container mx-auto px-4 h-full flex items-center relative z-20">
            <div className="max-w-lg">
              <h1 className="text-4xl font-bold text-white mb-4">Event Helpers & Corporation Service</h1>
              <p className="text-white text-lg mb-6">Professional staff for your events, parties, and corporate functions</p>
              <button className="bg-white text-[#4B49AC] px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition duration-150">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Popular services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1565992441121-4367c2967103?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                alt="Serving Staff" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <Utensils className="h-5 w-5 text-[#4B49AC] mr-2" />
                  <h3 className="font-medium text-gray-800">Serving Staff</h3>
                </div>
                <p className="text-gray-600 text-sm">Professional servers for your events and parties</p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                alt="Barista" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <Coffee className="h-5 w-5 text-[#4B49AC] mr-2" />
                  <h3 className="font-medium text-gray-800">Barista</h3>
                </div>
                <p className="text-gray-600 text-sm">Expert coffee service for your corporate events</p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1574096079513-d8259312b785?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                alt="Bartending" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <Wine className="h-5 w-5 text-[#4B49AC] mr-2" />
                  <h3 className="font-medium text-gray-800">Bartending</h3>
                </div>
                <p className="text-gray-600 text-sm">Professional bartenders for your special occasions</p>
              </div>
            </div>

            {/* Service 4 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                alt="Events" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <Calendar className="h-5 w-5 text-[#4B49AC] mr-2" />
                  <h3 className="font-medium text-gray-800">Events</h3>
                </div>
                <p className="text-gray-600 text-sm">Full-service event planning and coordination</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <button className="bg-[#4B49AC] text-white px-6 py-2 rounded-md hover:bg-[#3f3d91] transition duration-150">
              View all services
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-[#4B49AC] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">One Stop Event Helpers Service</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold mb-1">25+</p>
              <p className="text-sm opacity-80">Years of Experience</p>
            </div>
            <div>
              <p className="text-3xl font-bold mb-1">5150</p>
              <p className="text-sm opacity-80">Events Completed</p>
            </div>
            <div>
              <p className="text-3xl font-bold mb-1">2325</p>
              <p className="text-sm opacity-80">Happy Clients</p>
            </div>
            <div>
              <p className="text-3xl font-bold mb-1">15+</p>
              <p className="text-sm opacity-80">Service Categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">We Follow The Process</h2>
          <p className="text-gray-600 mb-8 text-center">Our streamlined approach ensures your event runs smoothly</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="font-medium text-gray-800 mb-2">Booking</h3>
              <p className="text-gray-600 text-sm">Schedule your event with our easy booking system</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="font-medium text-gray-800 mb-2">Consultation</h3>
              <p className="text-gray-600 text-sm">Discuss your needs with our event specialists</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="font-medium text-gray-800 mb-2">Planning</h3>
              <p className="text-gray-600 text-sm">We handle all the details and preparations</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="font-medium text-gray-800 mb-2">Service</h3>
              <p className="text-gray-600 text-sm">Professional execution of your event</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-12 bg-yellow-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Over 25+ Year Of Experience In Event Helpers Service</h2>
              <p className="text-gray-700 mb-6">We've been providing top-quality event staffing and services for over two decades, making us the trusted choice for events of all sizes.</p>
              <button className="bg-[#4B49AC] text-white px-6 py-2 rounded-md hover:bg-[#3f3d91] transition duration-150">
                Learn More
              </button>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                alt="Event Staff" 
                className="rounded-lg h-40 w-full object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                alt="Corporate Event" 
                className="rounded-lg h-40 w-full object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                alt="Bartending" 
                className="rounded-lg h-40 w-full object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                alt="Catering" 
                className="rounded-lg h-40 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-12 pb-6 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">EventHelpers</h3>
              <p className="text-gray-600 text-sm mb-4">Professional event staffing and services for all your needs.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-[#4B49AC]">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#4B49AC]">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#4B49AC]">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-[#4B49AC]">Serving Staff</a></li>
                <li><a href="#" className="hover:text-[#4B49AC]">Bartending</a></li>
                <li><a href="#" className="hover:text-[#4B49AC]">Barista Service</a></li>
                <li><a href="#" className="hover:text-[#4B49AC]">Event Planning</a></li>
                <li><a href="#" className="hover:text-[#4B49AC]">Corporate Events</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-[#4B49AC]">About Us</a></li>
                <li><a href="#" className="hover:text-[#4B49AC]">Careers</a></li>
                <li><a href="#" className="hover:text-[#4B49AC]">Testimonials</a></li>
                <li><a href="#" className="hover:text-[#4B49AC]">Blog</a></li>
                <li><a href="#" className="hover:text-[#4B49AC]">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>123 Event Street, Suite 100</li>
                <li>New York, NY 10001</li>
                <li>info@eventhelpers.com</li>
                <li>(555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-6">
            <p className="text-sm text-gray-600 text-center">© 2025 EventHelpers. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-md">
            {/* Header */}
            <div className="bg-[#4B49AC] p-6 text-center">
              <div className="flex justify-center mb-3">
                <div className="bg-white/20 p-3 rounded-full">
                  <LogIn className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white">Admin Login</h1>
              <p className="text-purple-200 mt-1">Sign in to your admin dashboard</p>
            </div>

            {/* Form */}
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4B49AC] focus:border-[#4B49AC]"
                      placeholder="admin@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4B49AC] focus:border-[#4B49AC]"
                      placeholder="••••••••"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-[#4B49AC] focus:ring-[#4B49AC] border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-[#4B49AC] hover:text-[#3f3d91]">
                      Forgot password?
                    </a>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#4B49AC] hover:bg-[#3f3d91] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4B49AC] transition duration-150"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign in
                </button>
              </form>
            </div>

            {/* Close Button */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
              <p className="text-sm text-gray-600">© 2025 EventHelpers. All rights reserved.</p>
              <button 
                onClick={() => setShowLoginModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Test2;


// ADMIN LOGIN

// import React, { useState } from 'react';
// import { Eye, EyeOff, Lock, LogIn, User } from 'lucide-react';

// function Test2() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log({ email, password, rememberMe });
//     // Add your authentication logic here
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         {/* Card */}
//         <div className="bg-white rounded-xl shadow-xl overflow-hidden">
//           {/* Header */}
//           <div className="bg-indigo-600 p-6 text-center">
//             <div className="flex justify-center mb-3">
//               <div className="bg-white/20 p-3 rounded-full">
//                 <LogIn className="h-8 w-8 text-white" />
//               </div>
//             </div>
//             <h1 className="text-2xl font-bold text-white">Admin Login</h1>
//             <p className="text-indigo-200 mt-1">Sign in to your admin dashboard</p>
//           </div>

//           {/* Form */}
//           <div className="p-6">
//             <form onSubmit={handleSubmit}>
//               {/* Email Field */}
//               <div className="mb-4">
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <User className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="email"
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="admin@example.com"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Password Field */}
//               <div className="mb-6">
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Lock className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="••••••••"
//                     required
//                   />
//                   <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="text-gray-400 hover:text-gray-500 focus:outline-none"
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-5 w-5" />
//                       ) : (
//                         <Eye className="h-5 w-5" />
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Remember Me & Forgot Password */}
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center">
//                   <input
//                     id="remember-me"
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                     className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                   />
//                   <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
//                     Remember me
//                   </label>
//                 </div>
//                 <div className="text-sm">
//                   <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//                     Forgot password?
//                   </a>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
//               >
//                 <LogIn className="h-5 w-5 mr-2" />
//                 Sign in
//               </button>
//             </form>
//           </div>

//           {/* Footer */}
//           <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center text-sm text-gray-600">
//             <p>© 2025 Admin Dashboard. All rights reserved.</p>
//           </div>
//         </div>

//         {/* Responsive message */}
//         <div className="mt-6 text-center text-sm text-gray-600">
//           <p>This login page is fully responsive and works on all devices.</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Test2;