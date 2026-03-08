import * as React from 'react';
import { useState } from 'react';
import { Heart, Users, Clock, Shield, User, Settings, Bell, Calendar, Star, Plus } from "lucide-react";

const RuralTelemedicineApp = () => {
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [currentUserRole, setCurrentUserRole] = useState('patient');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const languages = ['English', 'Hindi', 'Punjabi'];
  const userRoles = ['patient', 'doctor', 'pharmacy', 'admin'];

  const handleLogin = (role: string) => {
    setIsLoggedIn(true);
    setCurrentUserRole(role);
    setUserName(role === 'patient' ? 'Rajesh Kumar' : 
                role === 'doctor' ? 'Dr. Singh' : 
                role === 'pharmacy' ? 'Nabha Pharmacy' : 'Health Dept Admin');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-xl font-bold text-blue-800">Nabha Healthcare</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <select 
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value)}
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">Welcome, {userName}</span>
                <button 
                  onClick={handleLogout}
                  className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                {userRoles.map(role => (
                  <button 
                    key={role}
                    onClick={() => handleLogin(role)}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm hover:bg-blue-200 capitalize"
                  >
                    {role} Login
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        {!isLoggedIn ? (
          <HeroSection />
        ) : (
          <Dashboard userRole={currentUserRole} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>Nabha Healthcare Telemedicine Service • Partnered with Punjab Health Department</p>
          <p className="text-blue-200 text-sm mt-2">© 2023 All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
          Quality Healthcare for Rural Communities
        </h2>
        <p className="text-gray-700 mb-6">
          Access doctors, get prescriptions, and find medicines in your local area through our telemedicine platform. 
          Available in English, Hindi, and Punjabi.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard 
            icon={<Users className="h-6 w-6" />}
            title="Video Consultations"
            description="Connect with doctors via secure video calls"
          />
          <FeatureCard 
            icon={<Shield className="h-6 w-6" />}
            title="Digital Records"
            description="Aadhaar-based encrypted health records"
          />
          <FeatureCard 
            icon={<Heart className="h-6 w-6" />}
            title="AI Symptom Checker"
            description="Get preliminary health advice offline"
          />
          <FeatureCard 
            icon={<Clock className="h-6 w-6" />}
            title="Medicine Availability"
            description="Check stock at local pharmacies in real-time"
          />
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <img 
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e2fd8db8-de11-4bee-8d79-3082e22c6051.png" 
          alt="Doctor consulting with a patient via video call in a rural setting with mobile device" 
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-blue-100">
      <div className="text-blue-600 mb-2">{icon}</div>
      <h3 className="font-semibold text-blue-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

const Dashboard = ({ userRole }: { userRole: string }) => {
  const renderPatientDashboard = () => (
    <div>
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Patient Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard 
          title="Book Consultation"
          description="Schedule a video call with a doctor"
          icon={<Calendar className="h-8 w-8" />}
          action="Book Now"
        />
        <DashboardCard 
          title="Symptom Checker"
          description="Get AI-powered health suggestions"
          icon={<Heart className="h-8 w-8" />}
          action="Check Symptoms"
        />
        <DashboardCard 
          title="Health Records"
          description="View your medical history"
          icon={<Shield className="h-8 w-8" />}
          action="View Records"
        />
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Recent Consultations</h3>
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">15 Nov 2023</td>
                <td className="px-6 py-4 whitespace-nowrap">Dr. Gurpreet Singh</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">10 Nov 2023</td>
                <td className="px-6 py-4 whitespace-nowrap">Dr. Priya Sharma</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Scheduled</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderDoctorDashboard = () => (
    <div>
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Doctor Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard 
          title="Upcoming Appointments"
          description="View your scheduled consultations"
          icon={<Calendar className="h-8 w-8" />}
          action="View Schedule"
          count={5}
        />
        <DashboardCard 
          title="Patient Records"
          description="Access patient medical history"
          icon={<User className="h-8 w-8" />}
          action="Search Patients"
        />
        <DashboardCard 
          title="Write Prescription"
          description="Create digital prescriptions"
          icon={<Plus className="h-8 w-8" />}
          action="New Prescription"
        />
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Today's Appointments</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Rajesh Kumar</h4>
              <p className="text-sm text-gray-600">10:30 AM - Video Consultation</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">Start Call</button>
          </div>
          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Preeti Kaur</h4>
              <p className="text-sm text-gray-600">11:45 AM - Video Consultation</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">Start Call</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPharmacyDashboard = () => (
    <div>
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Pharmacy Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard 
          title="Medicine Stock"
          description="Manage your medicine inventory"
          icon={<Heart className="h-8 w-8" />}
          action="Update Stock"
        />
        <DashboardCard 
          title="Prescription Requests"
          description="View pending prescriptions"
          icon={<Bell className="h-8 w-8" />}
          action="View Requests"
          count={3}
        />
        <DashboardCard 
          title="Sales Report"
          description="Generate sales analytics"
          icon={<Star className="h-8 w-8" />}
          action="View Reports"
        />
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Low Stock Alert</h3>
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medicine</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Paracetamol 500mg</td>
                <td className="px-6 py-4 whitespace-nowrap">12 packets</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 text-sm">Reorder</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Amoxicillin 250mg</td>
                <td className="px-6 py-4 whitespace-nowrap">8 packets</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 text-sm">Reorder</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div>
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Health Department Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <DashboardCard 
          title="Total Doctors"
          description="Registered medical practitioners"
          icon={<User className="h-8 w-8" />}
          value="247"
        />
        <DashboardCard 
          title="Active Consultations"
          description="Ongoing telemedicine sessions"
          icon={<Clock className="h-8 w-8" />}
          value="43"
        />
        <DashboardCard 
          title="Pharmacy Partners"
          description="Connected local pharmacies"
          icon={<Heart className="h-8 w-8" />}
          value="89"
        />
        <DashboardCard 
          title="Patient Satisfaction"
          description="Average rating from patients"
          icon={<Star className="h-8 w-8" />}
          value="4.7/5"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Regional Usage Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Punjab Central</span>
              <span className="font-medium">1,243 consultations</span>
            </div>
            <div className="flex justify-between">
              <span>Punjab West</span>
              <span className="font-medium">987 consultations</span>
            </div>
            <div className="flex justify-between">
              <span>Punjab East</span>
              <span className="font-medium">756 consultations</span>
            </div>
            <div className="flex justify-between">
              <span>Punjab South</span>
              <span className="font-medium">632 consultations</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">System Health</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>API Response Time</span>
              <span className="font-medium text-green-600">128ms</span>
            </div>
            <div className="flex justify-between">
              <span>Database Uptime</span>
              <span className="font-medium text-green-600">99.98%</span>
            </div>
            <div className="flex justify-between">
              <span>Active Sync Sessions</span>
              <span className="font-medium">247</span>
            </div>
            <div className="flex justify-between">
              <span>Security Status</span>
              <span className="font-medium text-green-600">All Systems Normal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {userRole === 'patient' && renderPatientDashboard()}
      {userRole === 'doctor' && renderDoctorDashboard()}
      {userRole === 'pharmacy' && renderPharmacyDashboard()}
      {userRole === 'admin' && renderAdminDashboard()}
    </div>
  );
};

const DashboardCard = ({ 
  title, 
  description, 
  icon, 
  action, 
  count,
  value 
}: { 
  title: string, 
  description: string, 
  icon: React.ReactNode,
  action?: string,
  count?: number,
  value?: string
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-blue-100">
      <div className="flex justify-between items-start mb-4">
        <div className="text-blue-600">{icon}</div>
        {count !== undefined && (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {count} new
          </span>
        )}
        {value !== undefined && (
          <span className="text-2xl font-bold text-blue-800">{value}</span>
        )}
      </div>
      <h3 className="font-semibold text-lg text-blue-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      {action && (
        <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
          {action} →
        </button>
      )}
    </div>
  );
};

export default RuralTelemedicineApp;


