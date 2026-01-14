import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { validateBidForm, formatCurrency } from '../../utils/validators';
import { 
  MessageSquare, DollarSign, Clock, TrendingUp, 
  Target, BarChart, Shield, Zap, CheckCircle,
  AlertCircle, Calendar, Percent, Award
} from 'lucide-react';

export const BidForm = ({ gig, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    message: '',
    price: '',
    estimatedTime: '',
    additionalInfo: '',
    milestones: '',
  });

  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('basic');

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

    const validationErrors = validateBidForm(formData);
    
    // Check if price exceeds budget
    if (parseFloat(formData.price) > gig.budget) {
      validationErrors.price = `Price cannot exceed budget of ${formatCurrency(gig.budget)}`;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      ...formData,
      gigId: gig._id,
      price: parseFloat(formData.price),
      estimatedTime: parseInt(formData.estimatedTime),
    });
  };

  const calculatePercentage = () => {
    if (!formData.price || !gig.budget) return 0;
    return (parseFloat(formData.price) / gig.budget * 100).toFixed(0);
  };

  const getPriceIndicatorColor = () => {
    const percentage = calculatePercentage();
    if (percentage < 60) return 'from-green-500 to-emerald-500';
    if (percentage < 85) return 'from-yellow-500 to-amber-500';
    if (percentage < 100) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-rose-500';
  };

  return (
    <div className="space-y-6">
      {/* Form Header with Stats */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200/50 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Target size={20} className="text-cyan-600" />
              Submit Your Professional Bid
            </h3>
            <p className="text-sm text-gray-600">Stand out with a compelling proposal</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-full">
            <Award size={14} />
            <span>AI-Optimized</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-3 border border-gray-200/50">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign size={16} className="text-green-600" />
              <span className="text-sm text-gray-600">Budget</span>
            </div>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(gig.budget)}</p>
          </div>
          
          <div className="bg-white rounded-xl p-3 border border-gray-200/50">
            <div className="flex items-center gap-2 mb-1">
              <Clock size={16} className="text-cyan-600" />
              <span className="text-sm text-gray-600">Timeline</span>
            </div>
            <p className="text-xl font-bold text-gray-900">Flexible</p>
          </div>
          
          <div className="bg-white rounded-xl p-3 border border-gray-200/50">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={16} className="text-purple-600" />
              <span className="text-sm text-gray-600">Competition</span>
            </div>
            <p className="text-xl font-bold text-gray-900">Moderate</p>
          </div>
        </div>
      </div>

      {/* Form Navigation Tabs */}
      <div className="flex border-b border-gray-200">
        {['basic', 'advanced', 'preview'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium text-sm relative ${
              activeTab === tab
                ? 'text-cyan-600 border-b-2 border-cyan-500'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Proposal Message */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label htmlFor="message" className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <MessageSquare size={16} className="text-cyan-600" />
              Your Proposal *
            </label>
            <span className="text-xs text-gray-500">Recommended: 150+ characters</span>
          </div>
          <div className="relative">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400 transition-all text-gray-700 placeholder-gray-500 ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Explain why you're the best fit for this gig. Highlight your relevant experience, approach to the project, and what makes you stand out..."
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {formData.message.length} characters
            </div>
          </div>
          {errors.message ? (
            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
              <AlertCircle size={14} />
              <span>{errors.message}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 mt-2 text-cyan-600 text-sm">
              <CheckCircle size={14} />
              <span>Tip: Be specific about how you'll deliver value</span>
            </div>
          )}
        </div>

        {/* Price and Timeline Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200/50 rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart size={20} className="text-cyan-600" />
            Pricing & Timeline
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price Input */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="price" className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <DollarSign size={16} className="text-green-600" />
                  Your Bid Amount *
                </label>
                <div className="flex items-center gap-1">
                  <Percent size={12} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">{calculatePercentage()}% of budget</span>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</div>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="1"
                  max={gig.budget}
                  step="0.01"
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400 text-lg font-medium text-gray-900 ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
              </div>
              
              {/* Budget Progress Bar */}
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Your Bid</span>
                  <span>Budget: {formatCurrency(gig.budget)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${getPriceIndicatorColor()} transition-all duration-500`}
                    style={{ width: `${Math.min(calculatePercentage(), 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Competitive</span>
                  <span>Budget Max</span>
                </div>
              </div>
              
              {errors.price && (
                <div className="flex items-center gap-2 mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  <AlertCircle size={14} />
                  <span>{errors.price}</span>
                </div>
              )}
            </div>

            {/* Timeline Input */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="estimatedTime" className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <Clock size={16} className="text-cyan-600" />
                  Estimated Time *
                </label>
                <span className="text-xs text-cyan-600 font-medium">AI Recommended: 7-14 days</span>
              </div>
              
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Calendar size={16} />
                </div>
                <input
                  type="number"
                  id="estimatedTime"
                  name="estimatedTime"
                  value={formData.estimatedTime}
                  onChange={handleChange}
                  min="1"
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400 text-lg font-medium text-gray-900 ${
                    errors.estimatedTime ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="7"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2 mt-3">
                {[3, 7, 14, 30].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setFormData({...formData, estimatedTime: days.toString()})}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.estimatedTime === days.toString()
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-cyan-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-cyan-300'
                    }`}
                  >
                    {days} days
                  </button>
                ))}
              </div>
              
              {errors.estimatedTime && (
                <div className="flex items-center gap-2 mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  <AlertCircle size={14} />
                  <span>{errors.estimatedTime}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label htmlFor="additionalInfo" className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <TrendingUp size={16} className="text-purple-600" />
              Additional Information (Optional)
            </label>
            <span className="text-xs text-gray-500">Share your approach or milestones</span>
          </div>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400 transition-all text-gray-700 placeholder-gray-500"
            placeholder="Outline your proposed milestones, communication plan, or any special considerations..."
          />
        </div>

        {/* Trust & Guarantee Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <Shield size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-800 mb-1">Your Bid Includes</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-600" />
                  <span className="text-green-700">Money-back guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-green-600" />
                  <span className="text-green-700">24/7 communication</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-600" />
                  <span className="text-green-700">Professional quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200/50 rounded-2xl">
          <div>
            <h4 className="font-bold text-gray-900 text-lg">Ready to Submit?</h4>
            <p className="text-sm text-gray-600">Review your bid before submission</p>
            <div className="flex items-center gap-4 mt-2 text-sm">
              {formData.price && (
                <div className="flex items-center gap-2">
                  <DollarSign size={14} className="text-green-600" />
                  <span className="font-semibold">{formatCurrency(formData.price)}</span>
                </div>
              )}
              {formData.estimatedTime && (
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-cyan-600" />
                  <span className="font-semibold">{formData.estimatedTime} days</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button
              type="button"
              variant="ghost"
              className="px-6 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl font-medium"
            >
              Save as Draft
            </Button>
            <Button
              type="submit"
              loading={loading}
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 px-8 py-2.5 rounded-xl border-0"
            >
              Submit Professional Bid
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};