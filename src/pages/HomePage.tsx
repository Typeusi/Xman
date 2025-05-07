import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, UserPlus, Activity, Calendar } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-8">
      <section className="card text-center py-16 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg shadow-xl">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Welcome to Clinic Management  System
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            A comprehensive solution for managing your clinic's records, appointments, and patients.
          </p>
          <Link 
            to="/records" 
            className="btn bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg shadow-md"
          >
            Manage Records
          </Link>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card hover:shadow-lg transition-shadow duration-300 text-center p-8 slide-in">
              <div className="flex justify-center mb-4">
                <UserPlus className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Patient Management</h3>
              <p className="text-gray-600">
                Easily add, update, and manage patient information.
              </p>
            </div>
            
            <div className="card hover:shadow-lg transition-shadow duration-300 text-center p-8 slide-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex justify-center mb-4">
                <Calendar className="h-12 w-12 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Appointment Scheduling</h3>
              <p className="text-gray-600">
                Schedule and track appointments efficiently.
              </p>
            </div>
            
            <div className="card hover:shadow-lg transition-shadow duration-300 text-center p-8 slide-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex justify-center mb-4">
                <ClipboardList className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Record Management</h3>
              <p className="text-gray-600">
                Keep track of medical records and patient history.
              </p>
            </div>
            
            <div className="card hover:shadow-lg transition-shadow duration-300 text-center p-8 slide-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex justify-center mb-4">
                <Activity className="h-12 w-12 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Treatment Tracking</h3>
              <p className="text-gray-600">
                Monitor treatment plans and patient progress.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-gray-50 py-12 rounded-lg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Access your clinic management system now and streamline your operations.
          </p>
          <Link 
            to="/records" 
            className="btn btn-primary px-8 py-3 text-lg shadow-md pulse"
          >
            Go to Records
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;