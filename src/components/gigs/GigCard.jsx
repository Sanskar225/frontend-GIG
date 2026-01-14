import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardFooter } from '../ui/Card';
import { Badge, StatusBadge } from '../ui/Badge';
import { Clock, DollarSign, User, TrendingUp, Zap, Target, MessageSquare, BarChart3, Users, Calendar, Award, Briefcase, Eye } from 'lucide-react';
import { formatCurrency, formatRelativeTime } from '../../utils/validators';

export const GigCard = ({ gig, showOwner = false, showStats = true }) => {
  const navigate = useNavigate();

  // Helper function to safely extract text from objects
  const getText = (value, defaultValue = '') => {
    if (!value) return defaultValue;
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return String(value);
    if (typeof value === 'object') {
      // Handle populated objects (like owner)
      if (value.name) return value.name;
      if (value.username) return value.username;
      if (value.title) return value.title;
      // For location objects with type property
      if (value.type) return value.type;
      // Handle arrays
      if (Array.isArray(value)) {
        return value.map(item => getText(item)).join(', ');
      }
      // Return empty string for unknown objects
      return defaultValue;
    }
    return defaultValue;
  };

  const handleClick = () => {
    navigate(`/gigs/${gig._id}`);
  };

  const getBudgetColor = (budget) => {
    const budgetNum = parseFloat(budget) || 0;
    if (budgetNum > 5000) return 'from-green-500 to-emerald-500';
    if (budgetNum > 2000) return 'from-cyan-500 to-blue-500';
    if (budgetNum > 500) return 'from-yellow-500 to-amber-500';
    return 'from-gray-500 to-gray-600';
  };

  const getPriorityBadge = () => {
    const budgetNum = parseFloat(gig.budget) || 0;
    if (budgetNum > 5000) return { text: 'HIGH BUDGET', color: 'from-green-500 to-emerald-500' };
    if (gig.bidsCount > 10) return { text: 'HOT', color: 'from-orange-500 to-red-500' };
    if (gig.urgent) return { text: 'URGENT', color: 'from-red-500 to-rose-500' };
    return null;
  };

  const getDifficultyBadge = () => {
    const budgetNum = parseFloat(gig.budget) || 0;
    if (budgetNum > 5000) return 'Expert';
    if (budgetNum > 2000) return 'Advanced';
    if (budgetNum > 500) return 'Intermediate';
    return 'Beginner';
  };

  const getTimeRemaining = (deadline) => {
    if (!deadline) return null;
    try {
      const now = new Date();
      const deadlineDate = new Date(deadline);
      const diffTime = deadlineDate - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 0) return { text: 'Expired', color: 'text-red-600 bg-red-50' };
      if (diffDays <= 3) return { text: `${diffDays} days left`, color: 'text-red-600 bg-red-50' };
      if (diffDays <= 7) return { text: `${diffDays} days left`, color: 'text-amber-600 bg-amber-50' };
      return { text: `${diffDays} days left`, color: 'text-green-600 bg-green-50' };
    } catch (error) {
      return null;
    }
  };

  const priorityBadge = getPriorityBadge();
  const timeRemaining = getTimeRemaining(gig.deadline);
  const difficulty = getDifficultyBadge();

  return (
    <Card 
      hover 
      onClick={handleClick}
      className="group relative overflow-hidden border border-gray-200/70 hover:border-cyan-300/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer"
    >
      {/* Priority Ribbon */}
      {priorityBadge && (
        <div className={`absolute -top-3 -right-3 z-10 px-4 py-1 text-xs font-bold text-white rounded-bl-xl rounded-tr-xl bg-gradient-to-r ${priorityBadge.color} rotate-45 translate-x-8 -translate-y-8`}>
          {priorityBadge.text}
        </div>
      )}

      {/* Time Remaining Badge */}
      {timeRemaining && (
        <div className={`absolute top-4 left-4 z-10 px-3 py-1.5 text-xs font-semibold ${timeRemaining.color} rounded-full border border-current/20 flex items-center gap-1`}>
          <Clock size={12} />
          <span>{timeRemaining.text}</span>
        </div>
      )}

      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-500 pointer-events-none"></div>

      <CardBody className="p-6 pt-8">
        {/* Header with Status */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 pr-4">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-cyan-700 transition-colors">
              {getText(gig.title, 'Untitled Gig')}
            </h3>
            {showOwner && gig.client && (
              <div className="flex items-center gap-2 mt-2">
                <div className="w-6 h-6 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg flex items-center justify-center">
                  <User size={12} className="text-cyan-700" />
                </div>
                <span className="text-sm text-gray-600">{getText(gig.client)}</span>
                {gig.client?.verified && (
                  <Badge variant="success" size="xs" className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                    Verified
                  </Badge>
                )}
              </div>
            )}
          </div>
          <StatusBadge status={gig.status} className="relative z-20" />
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed group-hover:text-gray-700 transition-colors">
            {getText(gig.description, 'No description available')}
          </p>
        </div>

        {/* Tags and Category */}
        <div className="flex flex-wrap gap-2 mb-6">
          {gig.category && (
            <Badge variant="info" className="bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 border-0">
              <Briefcase size={12} className="mr-1" />
              {getText(gig.category)}
            </Badge>
          )}
          
          <Badge variant="outline" className="bg-white border-gray-300 text-gray-700">
            <Target size={12} className="mr-1" />
            {difficulty}
          </Badge>

          {gig.skills && gig.skills.slice(0, 2).map((skill, index) => (
            <Badge key={index} variant="outline" className="bg-gray-50 border-gray-200 text-gray-600">
              {getText(skill)}
            </Badge>
          ))}
        </div>

        {/* Stats Grid */}
        {showStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {/* Budget */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200/50 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <DollarSign size={14} className="text-cyan-600" />
                <span className="text-xs text-cyan-700 font-medium">Budget</span>
              </div>
              <div className={`text-lg font-bold bg-gradient-to-r ${getBudgetColor(gig.budget)} bg-clip-text text-transparent`}>
                {formatCurrency(gig.budget)}
              </div>
            </div>

            {/* Bids */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200/50 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <BarChart3 size={14} className="text-gray-600" />
                <span className="text-xs text-gray-700 font-medium">Bids</span>
              </div>
              <div className="text-lg font-bold text-gray-900">
                {gig.bidsCount || 0}
              </div>
            </div>

            {/* Views */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200/50 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <Eye size={14} className="text-purple-600" />
                <span className="text-xs text-purple-700 font-medium">Views</span>
              </div>
              <div className="text-lg font-bold text-gray-900">
                {gig.views || 0}
              </div>
            </div>

            {/* Posted */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200/50 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <Calendar size={14} className="text-gray-600" />
                <span className="text-xs text-gray-700 font-medium">Posted</span>
              </div>
              <div className="text-lg font-bold text-gray-900">
                {gig.createdAt ? formatRelativeTime(gig.createdAt) : 'Recently'}
              </div>
            </div>
          </div>
        )}
      </CardBody>

      <CardFooter className="p-6 pt-0">
        {/* Footer Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* AI Match Score */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Zap size={14} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">AI Match Score</p>
                <div className="flex items-center gap-1">
                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full" 
                      style={{ width: `${Math.min((gig.bidsCount || 0) * 10, 85)}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-cyan-700">85%</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white text-sm font-semibold rounded-xl shadow-sm shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 group/btn"
          >
            <span className="flex items-center gap-2">
              View Details
              <TrendingUp size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>

        {/* Quick Info */}
        {gig.location && (
          <div className="flex items-center gap-4 text-sm text-gray-500 mt-4 pt-4 border-t border-gray-200/50">
            <div className="flex items-center gap-2">
              <Users size={14} />
              <span>{getText(gig.location)}</span>
            </div>
            {gig.duration && (
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>{getText(gig.duration)} weeks</span>
              </div>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};