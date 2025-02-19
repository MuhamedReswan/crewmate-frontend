import { Users, Star, Clock, Award } from 'lucide-react';
import Navbar from '@/components/common/Navbar/Navbar';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Navbar/>
      <section className="relative h-[500px] bg-gray-900 text-white">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-4">Event Helpers &
            corporation
            Service</h1>
          <p className="text-xl mb-8">Elevating dining experiences with excellence</p>
          <button className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold w-fit hover:bg-yellow-400 transition-colors">
            Get Started
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold">25+</div>
            <div className="text-sm">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">5150</div>
            <div className="text-sm">Satisfied Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">95+</div>
            <div className="text-sm">Expert Staff</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-2">Expert Staff</h3>
              <p className="text-gray-600">Professional and experienced team</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-2">Quality Service</h3>
              <p className="text-gray-600">Exceptional dining experience</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Always here when you need us</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-2">Certified Services</h3>
              <p className="text-gray-600">Industry recognized excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Don't Miss Out on Perfect Service</h2>
            <p className="text-gray-600 mb-8">Join thousands of satisfied customers who trust our expertise</p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>Our Story</li>
              <li>Team</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>Event Management</li>
              <li>Staff Training</li>
              <li>Consulting</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>Support</li>
              <li>Sales</li>
              <li>Partners</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;