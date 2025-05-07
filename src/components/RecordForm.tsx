import React, { useState, useEffect } from 'react';
import { useRecordContext } from '../context/RecordContext';
import { Record } from '../types/record';
import { Save, X, Loader } from 'lucide-react';

interface RecordFormProps {
  initialData: Record | null;
  onCancel: () => void;
}

const RecordForm: React.FC<RecordFormProps> = ({ initialData, onCancel }) => {
  const { addRecord, updateRecord } = useRecordContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Omit<Record, 'id'>>({
    title: '',
    body: ''
  });
  const [errors, setErrors] = useState({
    title: '',
    body: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        body: initialData.body
      });
    }
  }, [initialData]);

  const validate = (): boolean => {
    let isValid = true;
    const newErrors = {
      title: '',
      body: ''
    };

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    if (!formData.body.trim()) {
      newErrors.body = 'Body is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      if (initialData) {
        await updateRecord(initialData.id, formData);
      } else {
        await addRecord(formData);
      }
      
      // Reset form
      setFormData({
        title: '',
        body: ''
      });
      
      onCancel();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`form-input ${errors.title ? 'border-red-500' : ''}`}
          disabled={isSubmitting}
          placeholder="Enter title"
        />
        {errors.title && <p className="form-error">{errors.title}</p>}
      </div>
      
      <div>
        <label htmlFor="body" className="form-label">Body</label>
        <textarea
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          rows={4}
          className={`form-input ${errors.body ? 'border-red-500' : ''}`}
          disabled={isSubmitting}
          placeholder="Enter body text"
        />
        {errors.body && <p className="form-error">{errors.body}</p>}
      </div>
      
      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="btn bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-500 inline-flex items-center"
          disabled={isSubmitting}
        >
          <X className="h-4 w-4 mr-1" />
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary inline-flex items-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader className="h-4 w-4 mr-1 animate-spin" />
              {initialData ? 'Updating...' : 'Saving...'}
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-1" />
              {initialData ? 'Update Record' : 'Save Record'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default RecordForm;