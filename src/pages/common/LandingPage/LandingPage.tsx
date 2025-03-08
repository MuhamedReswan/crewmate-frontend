import { Calendar, Coffee, Utensils, Wine, CheckCircle, Clock, Users } from 'lucide-react';
import Footer from '@/components/common/Footer/Footer'; 
import Header from '@/components/common/Header/Header';

function LandingPage() {


  return (
    <div className="min-h-screen bg-white">
  <Header/>
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

     <Footer/>

    </div>
  );
}

export default LandingPage;


















// import { Users, Star, Clock, Award } from 'lucide-react';
// import Navbar from '@/components/common/Navbar/Navbar';

// const LandingPage = () => {
//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section */}
//       <Navbar/>
//       <section className="relative h-[500px] bg-gray-900 text-white">
//         <div className="absolute inset-0 bg-black/50"></div>
//         <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
//           <h1 className="text-5xl font-bold mb-4">Event Helpers &
//             corporation
//             Service</h1>
//           <p className="text-xl mb-8">Elevating dining experiences with excellence</p>
//           <button className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold w-fit hover:bg-yellow-400 transition-colors">
//             Get Started
//           </button>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="bg-blue-600 text-white py-12">
//         <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="text-center">
//             <div className="text-3xl font-bold">25+</div>
//             <div className="text-sm">Years Experience</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold">5150</div>
//             <div className="text-sm">Satisfied Clients</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold">95+</div>
//             <div className="text-sm">Expert Staff</div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Service</h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div className="text-center">
//               <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
//                 <Users className="w-8 h-8 text-yellow-600" />
//               </div>
//               <h3 className="font-semibold mb-2">Expert Staff</h3>
//               <p className="text-gray-600">Professional and experienced team</p>
//             </div>
//             <div className="text-center">
//               <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
//                 <Star className="w-8 h-8 text-yellow-600" />
//               </div>
//               <h3 className="font-semibold mb-2">Quality Service</h3>
//               <p className="text-gray-600">Exceptional dining experience</p>
//             </div>
//             <div className="text-center">
//               <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
//                 <Clock className="w-8 h-8 text-yellow-600" />
//               </div>
//               <h3 className="font-semibold mb-2">24/7 Support</h3>
//               <p className="text-gray-600">Always here when you need us</p>
//             </div>
//             <div className="text-center">
//               <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
//                 <Award className="w-8 h-8 text-yellow-600" />
//               </div>
//               <h3 className="font-semibold mb-2">Certified Services</h3>
//               <p className="text-gray-600">Industry recognized excellence</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 bg-yellow-50">
//         <div className="container mx-auto px-4">
//           <div className="text-center max-w-2xl mx-auto">
//             <h2 className="text-3xl font-bold mb-4">Don't Miss Out on Perfect Service</h2>
//             <p className="text-gray-600 mb-8">Join thousands of satisfied customers who trust our expertise</p>
//             <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
//               Learn More
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div>
//             <h3 className="font-bold text-lg mb-4">About Us</h3>
//             <ul className="space-y-2">
//               <li>Our Story</li>
//               <li>Team</li>
//               <li>Careers</li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="font-bold text-lg mb-4">Services</h3>
//             <ul className="space-y-2">
//               <li>Event Management</li>
//               <li>Staff Training</li>
//               <li>Consulting</li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="font-bold text-lg mb-4">Contact</h3>
//             <ul className="space-y-2">
//               <li>Support</li>
//               <li>Sales</li>
//               <li>Partners</li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="font-bold text-lg mb-4">Legal</h3>
//             <ul className="space-y-2">
//               <li>Privacy Policy</li>
//               <li>Terms of Service</li>
//               <li>Cookie Policy</li>
//             </ul>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;