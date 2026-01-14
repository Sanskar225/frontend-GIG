import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { GIG_CATEGORIES } from '../../utils/constants';
import { validateGigForm, formatDateForInput } from '../../utils/validators';
import { Calendar, Clock, AlertCircle, DollarSign, Briefcase } from 'lucide-react';

export const GigForm = ({ initialData, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    category: '',
    deadline: '',
    skillsRequired: '', // ✅ Changed from 'requirements' to 'skillsRequired'
    ...initialData,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      // Format deadline for input field (YYYY-MM-DD)
      const formattedData = { ...initialData };
      if (initialData.deadline) {
        formattedData.deadline = formatDateForInput(initialData.deadline);
      }
      // Convert skillsRequired array to comma-separated string for the input
      if (initialData.skillsRequired && Array.isArray(initialData.skillsRequired)) {
        formattedData.skillsRequired = initialData.skillsRequired.join(', ');
      }
      // If old data has 'skills' field, use it for 'skillsRequired'
      if (initialData.skills && !initialData.skillsRequired) {
        formattedData.skillsRequired = Array.isArray(initialData.skills) 
          ? initialData.skills.join(', ')
          : initialData.skills;
      }
      setFormData(formattedData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateGigForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Transform data to match backend schema
    const dataToSubmit = {
      title: formData.title,
      description: formData.description,
      budget: parseFloat(formData.budget),
      category: formData.category,
      deadline: new Date(formData.deadline).toISOString(),
      skillsRequired: formData.skillsRequired 
        ? formData.skillsRequired.split(',').map(skill => skill.trim()).filter(skill => skill)
        : []
    };

    onSubmit(dataToSubmit);
  };

  // Calculate minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Calculate maximum date (1 year from now)
  const getMaxDate = () => {
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    return nextYear.toISOString().split('T')[0];
  };

  // Calculate days remaining if deadline is set
  const getDaysRemaining = () => {
    if (!formData.deadline) return null;
    const now = new Date();
    const deadline = new Date(formData.deadline);
    const diffTime = deadline - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysRemaining = getDaysRemaining();
  const isUrgent = daysRemaining && daysRemaining <= 3;
  const isExpired = daysRemaining && daysRemaining < 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200/50 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {initialData ? 'Edit Gig Details' : 'Create New Gig'}
        </h2>
        <p className="text-gray-600">
          Fill in the details below to post your gig. All fields marked with * are required.
        </p>
      </div>

      {/* Title */}
      <div className="bg-white border border-gray-200/50 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Briefcase size={18} className="text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Basic Information</h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
              Gig Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400 transition-all text-gray-700 placeholder-gray-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Build a responsive e-commerce website with React"
            />
            {errors.title && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                <AlertCircle size={14} />
                <span>{errors.title}</span>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400 transition-all text-gray-700 placeholder-gray-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Describe what you need in detail. Be specific about requirements, deliverables, and expectations..."
            />
            {errors.description && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                <AlertCircle size={14} />
                <span>{errors.description}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Budget, Category, and Deadline */}
      <div className="bg-white border border-gray-200/50 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <DollarSign size={18} className="text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Project Details</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Budget */}
          <div>
            <label htmlFor="budget" className="block text-sm font-semibold text-gray-900 mb-2">
              Budget ($) *
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</div>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                min="1"
                step="0.01"
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400 text-gray-700 ${
                  errors.budget ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="500.00"
              />
            </div>
            {errors.budget && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                <AlertCircle size={14} />
                <span>{errors.budget}</span>
              </div>
            )}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400 text-gray-700 ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a category</option>
              {GIG_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                <AlertCircle size={14} />
                <span>{errors.category}</span>
              </div>
            )}
          </div>

          {/* Deadline */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="deadline" className="block text-sm font-semibold text-gray-900">
                Deadline *
              </label>
              {daysRemaining !== null && formData.deadline && (
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  isExpired 
                    ? 'bg-red-100 text-red-700' 
                    : isUrgent 
                      ? 'bg-red-100 text-red-700 animate-pulse'
                      : daysRemaining <= 7 
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-green-100 text-green-700'
                }`}>
                  {isExpired ? 'EXPIRED' : isUrgent ? 'URGENT' : `${daysRemaining} days`}
                </span>
              )}
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Calendar size={18} />
              </div>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                min={getMinDate()}
                max={getMaxDate()}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400 text-gray-700 ${
                  errors.deadline ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.deadline ? (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                <AlertCircle size={14} />
                <span>{errors.deadline}</span>
              </div>
            ) : (
              <p className="mt-2 text-xs text-gray-500">
                {formData.deadline 
                  ? `Due: ${new Date(formData.deadline).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}`
                  : 'Select a deadline date (must be in the future)'
                }
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Timeline Warning */}
      {isUrgent && !isExpired && (
        <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle size={20} className="text-white" />
            </div>
            <div>
              <h4 className="font-bold text-red-800 text-lg mb-2">⚠️ Urgent Deadline Warning</h4>
              <p className="text-red-700 mb-3">
                Setting a deadline less than 3 days may limit the number of qualified freelancers who can apply. 
                Consider extending the deadline for better proposals.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-2">
                  <Clock size={14} className="text-red-600" />
                  <span className="font-medium">Only {daysRemaining} days remaining</span>
                </span>
                <span className="text-red-600 font-bold">●</span>
                <span className="text-red-600">Fewer applicants expected</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Required Skills (skillsRequired) */}
      <div className="bg-white border border-gray-200/50 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
            <AlertCircle size={18} className="text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Required Skills</h3>
        </div>
        
        <div>
          <label htmlFor="skillsRequired" className="block text-sm font-semibold text-gray-900 mb-2">
            Skills Required (Optional)
          </label>
          <textarea
            id="skillsRequired"
            name="skillsRequired"
            value={formData.skillsRequired}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400 transition-all text-gray-700 placeholder-gray-500"
            placeholder="List the skills or technologies needed for this project, separated by commas.
Example: React.js, Node.js, MongoDB, Express, REST APIs, UI/UX Design"
          />
          <p className="mt-2 text-xs text-gray-500">
            Enter skills separated by commas. This helps freelancers understand what skills are needed.
          </p>
        </div>
      </div>

      {/* Submit Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200/50 rounded-2xl">
        <div>
          <h4 className="font-bold text-gray-900 text-lg">Ready to {initialData ? 'Update' : 'Post'} Your Gig?</h4>
          <p className="text-sm text-gray-600">
            Review all details before submitting. Your gig will be visible to freelancers immediately.
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="px-6 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl font-medium"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 px-8 py-2.5 rounded-xl border-0"
          >
            {loading ? (
              'Processing...'
            ) : initialData ? (
              'Update Gig'
            ) : (
              <>
                <span className="flex items-center gap-2">
                  <Briefcase className="mr-2" size={18} />
                  Create Gig
                </span>
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};