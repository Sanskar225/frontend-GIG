import React from 'react';
import { Card, CardBody, CardHeader } from '../ui/Card';
import { Badge, StatusBadge } from '../ui/Badge';
import { User, Clock, DollarSign, Calendar, Target, TrendingUp, BarChart3, Users, Award, Shield, Zap, FileText, Globe, Layers, CheckCircle, MessageSquare, MapPin, Briefcase } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/validators';

export const GigDetails = ({ gig }) => {
  // Helper function to safely extract text from objects
  const getText = (value) => {
    if (!value) return 'Unknown';
    if (typeof value === 'string') return value;
    if (typeof value === 'object') {
      // Try to extract name, username, or email
      if (value.name) return value.name;
      if (value.username) return value.username;
      if (value.email) return value.email;
      // If it's an array of skills
      if (Array.isArray(value)) return value.join(', ');
      // Fallback to string representation
      return JSON.stringify(value);
    }
    return String(value);
  };

  const getTimelineColor = (days) => {
    if (!days || days <= 3) return 'bg-gradient-to-r from-red-500 to-rose-500';
    if (days <= 7) return 'bg-gradient-to-r from-amber-500 to-orange-500';
    if (days <= 14) return 'bg-gradient-to-r from-cyan-500 to-blue-500';
    return 'bg-gradient-to-r from-green-500 to-emerald-500';
  };

  const getBudgetSize = (budget) => {
    const budgetNum = parseFloat(budget) || 0;
    if (budgetNum > 10000) return 'Large Project';
    if (budgetNum > 5000) return 'Medium Project';
    if (budgetNum > 1000) return 'Small Project';
    return 'Micro Project';
  };

  const calculateTimeline = () => {
    if (!gig?.deadline) return null;
    try {
      const now = new Date();
      const deadline = new Date(gig.deadline);
      const diffTime = deadline - now;
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } catch (error) {
      console.error('Error calculating timeline:', error);
      return null;
    }
  };

  const daysRemaining = calculateTimeline();
  const budgetSize = getBudgetSize(gig?.budget);
  const isUrgent = daysRemaining && daysRemaining <= 3;

  // Safely check if data exists
  if (!gig) {
    return (
      <Card className="overflow-hidden border border-gray-200/70 shadow-sm">
        <CardBody className="p-8">
          <div className="text-center py-12">
            <p className="text-gray-500">Loading gig details...</p>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border border-gray-200/70 shadow-sm">
      {/* Top Gradient Accent */}
      <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>

      <CardHeader className="p-8 pb-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {/* Title and Status */}
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900 leading-tight pr-8">
                {getText(gig.title)}
              </h1>
              <StatusBadge status={gig.status} size="lg" />
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-4">
              {/* Owner - SAFELY RENDERED */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg flex items-center justify-center">
                  <User size={14} className="text-cyan-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{getText(gig.client)}</p>
                  <p className="text-xs text-gray-500">Project Owner</p>
                </div>
              </div>

              {/* Posted Date */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Calendar size={14} className="text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {gig.createdAt ? formatDate(gig.createdAt) : 'Not specified'}
                  </p>
                  <p className="text-xs text-gray-500">Posted Date</p>
                </div>
              </div>

              {/* Location - SAFELY CHECKED */}
              {gig.location && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Globe size={14} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{getText(gig.location)}</p>
                    <p className="text-xs text-gray-500">Location</p>
                  </div>
                </div>
              )}

              {/* Category - SAFELY CHECKED */}
              {gig.category && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Briefcase size={14} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{getText(gig.category)}</p>
                    <p className="text-xs text-gray-500">Category</p>
                  </div>
                </div>
              )}
            </div>

            {/* Urgent Badge */}
            {isUrgent && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl">
                <Zap size={16} className="text-red-600 animate-pulse" />
                <span className="font-bold text-red-700">URGENT • {daysRemaining} DAYS LEFT</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardBody className="p-8 pt-0 space-y-8">
        {/* Key Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Budget Card */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <DollarSign size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-cyan-800">Total Budget</h3>
                  <p className="text-xs text-cyan-700">{budgetSize}</p>
                </div>
              </div>
              <Award size={20} className="text-cyan-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {gig.budget ? formatCurrency(gig.budget) : 'Not specified'}
            </div>
            <div className="text-sm text-cyan-700">
              Flexible payment options available
            </div>
          </div>

          {/* Timeline Card */}
          {gig.deadline && (
            <div className={`bg-gradient-to-br ${daysRemaining <= 7 ? 'from-amber-50 to-orange-50 border-amber-200/50' : 'from-gray-50 to-gray-100 border-gray-200/50'} rounded-2xl p-6`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${getTimelineColor(daysRemaining)} rounded-xl flex items-center justify-center`}>
                    <Clock size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800">Timeline</h3>
                    <p className="text-xs text-gray-700">Deadline: {formatDate(gig.deadline)}</p>
                  </div>
                </div>
                <Target size={20} className={daysRemaining <= 7 ? 'text-amber-600' : 'text-gray-600'} />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-gray-900">
                  {daysRemaining} days
                </div>
                <div className="text-sm font-medium px-3 py-1 rounded-full bg-white border">
                  Remaining
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getTimelineColor(daysRemaining)} transition-all duration-1000`}
                    style={{ width: `${Math.min((100 - (daysRemaining / 30 * 100)), 90)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Stats Card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
                  <BarChart3 size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">Project Stats</h3>
                  <p className="text-xs text-gray-700">Live metrics</p>
                </div>
              </div>
              <TrendingUp size={20} className="text-purple-600" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Bids</p>
                <p className="text-xl font-bold text-gray-900">{gig.bidsCount || 0}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Views</p>
                <p className="text-xl font-bold text-gray-900">{gig.views || 0}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Duration</p>
                <p className="text-xl font-bold text-gray-900">{gig.duration || 'Flexible'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">AI Match</p>
                <p className="text-xl font-bold text-cyan-700">85%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
              <FileText size={18} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Project Description</h2>
          </div>
          
          <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200/50 rounded-2xl p-6">
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {getText(gig.description)}
              </p>
            </div>
            
            {/* Skills/Tags */}
            {gig.skills && gig.skills.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200/50">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Layers size={16} />
                  Required Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {gig.skills.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="outline"
                      className="bg-white border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg"
                    >
                      {getText(skill)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Requirements Section */}
        {gig.requirements && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Target size={18} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Requirements & Expectations</h2>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/30 border border-amber-200/50 rounded-2xl p-6">
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {getText(gig.requirements)}
                </p>
              </div>
              
              {/* Checklist */}
              <div className="mt-6 pt-6 border-t border-amber-200/50">
                <h4 className="text-sm font-semibold text-amber-900 mb-3 flex items-center gap-2">
                  <CheckCircle size={16} className="text-amber-600" />
                  Key Deliverables
                </h4>
                <div className="space-y-2">
                  {getText(gig.requirements).split('\n').filter(line => line.trim()).slice(0, 5).map((req, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-amber-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle size={12} className="text-amber-600" />
                      </div>
                      <span className="text-sm text-gray-700">{req.trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trust & Security Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-green-900 text-lg mb-2">Secure Project Environment</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <DollarSign size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-800">Escrow Payments</p>
                    <p className="text-xs text-green-700">Secure release system</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <MessageSquare size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-800">24/7 Support</p>
                    <p className="text-xs text-green-700">Dedicated help center</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <Users size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-800">Verified Talent</p>
                    <p className="text-xs text-green-700">Quality professionals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Freelancer Info (if assigned) */}
        {gig.status === 'assigned' && gig.freelancer && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Users size={18} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Assigned Professional</h2>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 rounded-2xl p-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center border-2 border-cyan-200">
                    <User size={28} className="text-cyan-700" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                    <CheckCircle size={10} className="text-white" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{getText(gig.freelancer.name)}</h3>
                    <Badge variant="success" className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                      <Award size={12} className="mr-1" />
                      Rating: 4.8
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-4">{getText(gig.freelancer.email)}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Experience</p>
                      <p className="font-bold text-gray-900">5+ years</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Success Rate</p>
                      <p className="font-bold text-gray-900">98%</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Response Time</p>
                      <p className="font-bold text-gray-900">2 hours</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Projects</p>
                      <p className="font-bold text-gray-900">42+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};