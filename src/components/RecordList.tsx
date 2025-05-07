import React, { useState } from 'react';
import { useRecordContext } from '../context/RecordContext';
import { Record } from '../types/record';
import { Trash2, Edit, Loader } from 'lucide-react';

interface RecordListProps {
  onEdit: (record: Record) => void;
}

const RecordList: React.FC<RecordListProps> = ({ onEdit }) => {
  const { records, deleteRecord } = useRecordContext();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [deletingAnimation, setDeletingAnimation] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    setDeletingAnimation(id);
    
    // Wait for animation
    setTimeout(async () => {
      await deleteRecord(id);
      setIsDeleting(null);
      setTimeout(() => {
        setDeletingAnimation(null);
      }, 500);
    }, 500);
  };

  return (
    <div className="card table-container">
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="table-header-cell">Title</th>
            <th className="table-header-cell">Body</th>
            <th className="table-header-cell w-40">Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {records.map(record => (
            <tr 
              key={record.id} 
              className={`table-row animated-row ${deletingAnimation === record.id ? 'fade-out' : 'fade-in'}`}
            >
              <td className="table-cell font-medium text-gray-900">{record.title}</td>
              <td className="table-cell">{record.body}</td>
              <td className="table-action-cell">
                <button
                  onClick={() => onEdit(record)}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Update
                </button>
                <button
                  onClick={() => handleDelete(record.id)}
                  disabled={isDeleting === record.id}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting === record.id ? (
                    <Loader className="h-4 w-4 mr-1 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4 mr-1" />
                  )}
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordList;