import React, { useState } from 'react';
import RecordList from '../components/RecordList';
import RecordForm from '../components/RecordForm';
import { useRecordContext } from '../context/RecordContext';
import { Record } from '../types/record';

const RecordsPage: React.FC = () => {
  const { records } = useRecordContext();
  const [editingRecord, setEditingRecord] = useState<Record | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  const handleEdit = (record: Record) => {
    setEditingRecord(record);
    setShowForm(true);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleCancel = () => {
    setEditingRecord(null);
    setShowForm(false);
  };
  
  const handleAddNew = () => {
    setEditingRecord(null);
    setShowForm(true);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Clinic Records</h1>
        <button 
          onClick={handleAddNew}
          className="btn btn-primary flex items-center"
        >
          <span>Add New Record</span>
        </button>
      </div>
      
      {showForm && (
        <div className="card slide-in">
          <h2 className="text-xl font-semibold mb-4">
            {editingRecord ? 'Edit Record' : 'Add New Record'}
          </h2>
          <RecordForm 
            initialData={editingRecord}
            onCancel={handleCancel}
          />
        </div>
      )}
      
      {records.length > 0 ? (
        <RecordList onEdit={handleEdit} />
      ) : (
        <div className="card text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No records found</p>
          <button 
            onClick={handleAddNew}
            className="btn btn-primary inline-flex items-center"
          >
            <span>Add Your First Record</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default RecordsPage;