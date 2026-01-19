import React from 'react';
import { Card, CardBody } from '../ui/Card';
import { StatusBadge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { User, DollarSign, Clock, Calendar, CheckCircle, Award, Zap, TrendingUp, MessageSquare, Star, Shield, Users, Target, Briefcase, Building } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/validators';

export const BidCard = ({ bid, onHire, isOwner, loading }) => {
  // Helper function to safely get freelancer information
  const getFreelancerInfo = () => {
    // If freelancerId is populated as object
    if (bid.freelancerId && typeof bid.freelancerId === 'object') {
      return {
        id: bid.freelancerId._id,
        name: bid.freelancerId.username || 'Unknown Freelancer',
        email: bid.freelancerId.email || '',
        profileImage: bid.freelancerId.profileImage,
        rating: bid.freelancerId.rating || 4.7,
        skills: bid.freelancerId.skills || [],
        bio: bid.freelancerId.bio,
        verified: bid.freelancerId.verified || false,
        premium: bid.freelancerId.premium || false,
        completedGigs: bid.freelancerId.completedGigs || 0,
        responseRate: bid.freelancerId.responseRate || 98,
        joinedDate: bid.freelancerId.createdAt
      };
    }
    
    // If freelancer property exists
    if (bid.freelancer && typeof bid.freelancer === 'object') {
      return {
        id: bid.freelancer._id,
        name: bid.freelancer.name || bid.freelancer.username || 'Unknown Freelancer',
        email: bid.freelancer.email || '',
        profileImage: bid.freelancer.profileImage,
        rating: bid.freelancer.rating || 4.7,
        skills: bid.freelancer.skills || [],
        bio: bid.freelancer.bio,
        verified: bid.freelancer.verified || false,
        premium: bid.freelancer.premium || false,
        completedGigs: bid.freelancer.completedGigs || 0,
        responseRate: bid.freelancer.responseRate || 98,
        joinedDate: bid.freelancer.createdAt
      };
    }
    
    // Default/fallback
    return {
      id: '',
      name: 'Unknown Freelancer',
      email: '',
      profileImage: null,
      rating: 4.7,
      skills: [],
      bio: '',
      verified: false,
      premium: false,
      completedGigs: 42,
      responseRate: 98,
      joinedDate: new Date()
    };
  };

  // Helper function to get gig information (if available)
  const getGigInfo = () => {
    // If gigId is populated as object
    if (bid.gigId && typeof bid.gigId === 'object') {
      return {
        id: bid.gigId._id,
        title: bid.gigId.title,
        description: bid.gigId.description,
        budget: bid.gigId.budget,
        status: bid.gigId.status,
        category: bid.gigId.category,
        client: bid.gigId.client
      };
    }
    
    // If gig property exists
    if (bid.gig && typeof bid.gig === 'object') {
      return {
        id: bid.gig._id,
        title: bid.gig.title,
        description: bid.gig.description,
        budget: bid.gig.budget,
        status: bid.gig.status,
        category: bid.gig.category,
        client: bid.gig.client
      };
    }
    
    return null;
  };

  const freelancer = getFreelancerInfo();
  const gig = getGigInfo();
  
  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'from-green-500 to-emerald-500';
    if (rating >= 4.0) return 'from-cyan-500 to-blue-500';
    if (rating >= 3.5) return 'from-yellow-500 to-amber-500';
    return 'from-gray-400 to-gray-500';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'hired': 
      case 'accepted': 
        return 'bg-gradient-to-r from-green-500 to-emerald-500';
      case 'rejected': return 'bg-gradient-to-r from-red-500 to-rose-500';
      case 'pending': return 'bg-gradient-to-r from-cyan-500 to-blue-500';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  // Calculate projects completed from completedGigs
  const projectsCompleted = freelancer.completedGigs || 42;
  const responseRate = freelancer.responseRate || 98;

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:border-cyan-200/50 group overflow-hidden">
      <div className={`absolute top-0 left-0 w-1 h-full ${getStatusColor(bid.status)}`}></div>
      
      <CardBody className="p-6">
        {/* Header with Freelancer Info */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              {freelancer.profileImage ? (
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-cyan-200/50 group-hover:border-cyan-300 transition-all">
                  <img 
                    src={freelancer.profileImage} 
                    alt={freelancer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center border-2 border-cyan-200/50 group-hover:border-cyan-300 transition-all">
                  <User size={26} className="text-cyan-700" />
                </div>
              )}
              
              {freelancer.verified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                  <Shield size={10} className="text-white" />
                </div>
              )}
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-gray-900">
                  {freelancer.name}
                </h3>
                {freelancer.premium && (
                  <span className="text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-0.5 rounded-full">
                    PRO
                  </span>
                )}
              </div>
              
              {/* Email or Bio preview */}
              {freelancer.email ? (
                <p className="text-sm text-gray-600 mb-2">{freelancer.email}</p>
              ) : freelancer.bio ? (
                <p className="text-sm text-gray-600 mb-2 line-clamp-1">{freelancer.bio}</p>
              ) : null}
              
              {/* Rating & Stats */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className={`text-xs font-bold bg-gradient-to-r ${getRatingColor(freelancer.rating)} text-white px-2 py-0.5 rounded-full flex items-center gap-1`}>
                    <Star size={10} fill="white" />
                    {freelancer.rating.toFixed(1)}
                  </div>
                  <span className="text-xs text-gray-500">rating</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Award size={12} className="text-cyan-600" />
                  <span className="text-xs text-gray-700 font-medium">{projectsCompleted}</span>
                  <span className="text-xs text-gray-500">projects</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Zap size={12} className="text-green-600" />
                  <span className="text-xs text-gray-700 font-medium">{responseRate}%</span>
                  <span className="text-xs text-gray-500">response</span>
                </div>
              </div>

              {/* Skills (if available) */}
              {freelancer.skills && freelancer.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {freelancer.skills.slice(0, 3).map((skill, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                  {freelancer.skills.length > 3 && (
                    <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                      +{freelancer.skills.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <StatusBadge status={bid.status} />
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <Calendar size={12} />
              <span>{formatDate(bid.createdAt || bid.submittedAt)}</span>
            </div>
          </div>
        </div>

        {/* Gig Information (if available) */}
        {gig && (
          <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-white border border-gray-200/50 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center">
                <Briefcase size={18} className="text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-sm">{gig.title}</h4>
                <p className="text-xs text-gray-600 line-clamp-1">{gig.description}</p>
              </div>
              {gig.budget && (
                <div className="text-sm font-bold text-green-600">
                  {formatCurrency(gig.budget)}
                </div>
              )}
            </div>
            
            {/* Gig Status */}
            {gig.status && gig.status !== 'open' && (
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200/50">
                <div className="flex items-center gap-2">
                  <Target size={12} className="text-gray-500" />
                  <span className="text-xs text-gray-600">Gig Status:</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                    gig.status === 'assigned' ? 'bg-green-100 text-green-800' :
                    gig.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    gig.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {gig.status.charAt(0).toUpperCase() + gig.status.slice(1)}
                  </span>
                </div>
                {gig.category && (
                  <span className="text-xs text-gray-500">{gig.category}</span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Bid Message */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare size={16} className="text-cyan-600" />
            <h4 className="text-sm font-semibold text-gray-900">Proposal Message</h4>
          </div>
          <p className="text-gray-700 bg-gray-50/50 p-4 rounded-xl border border-gray-200/50 whitespace-pre-wrap text-sm leading-relaxed">
            {bid.message}
          </p>
        </div>

        {/* Price & Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Price Card */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200/50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-cyan-700 font-medium mb-1">Total Price</p>
                <div className="flex items-center text-2xl font-bold text-gray-900">
                  <DollarSign size={24} className="text-cyan-600" />
                  <span>{formatCurrency(bid.price)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">All inclusive • No hidden fees</p>
                
                {/* Budget comparison if gig info is available */}
                {gig && gig.budget && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Gig budget: {formatCurrency(gig.budget)}</span>
                      <span>{((bid.price / gig.budget) * 100).toFixed(0)}% of budget</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        style={{ width: `${Math.min((bid.price / gig.budget) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                <DollarSign size={24} className="text-cyan-600" />
              </div>
            </div>
          </div>

          {/* Timeline Card */}
          {bid.estimatedTime && (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200/50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-700 font-medium mb-1">Delivery Time</p>
                  <div className="flex items-center text-2xl font-bold text-gray-900">
                    <Clock size={24} className="text-gray-600" />
                    <span>{bid.estimatedTime} days</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Estimated completion</p>
                  
                  {/* Calculate completion date */}
                  {bid.createdAt && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-600">
                        Expected by: {formatDate(new Date(bid.createdAt).setDate(new Date(bid.createdAt).getDate() + bid.estimatedTime))}
                      </p>
                    </div>
                  )}
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-gray-400/20 to-gray-600/20 rounded-lg flex items-center justify-center">
                  <Clock size={24} className="text-gray-600" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Additional Information */}
        {bid.additionalInfo && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={16} className="text-cyan-600" />
              <h4 className="text-sm font-semibold text-gray-900">Additional Information</h4>
            </div>
            <div className="bg-white border border-gray-200/50 rounded-xl p-4">
              <p className="text-gray-700 text-sm">{bid.additionalInfo}</p>
            </div>
          </div>
        )}

        {/* Action Section */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200/50">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
              <span>Available for immediate start</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-green-500" />
              <span>Money-back guarantee</span>
            </div>
          </div>

          {isOwner && bid.status === 'pending' && (
            <Button
              size="md"
              variant="success"
              onClick={() => onHire(bid._id)}
              loading={loading}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 px-6 py-2.5 rounded-xl border-0 transition-all duration-300 group"
              icon={Award}
            >
              <span className="flex items-center gap-2">
                Hire This Freelancer
                <TrendingUp size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          )}

          {(bid.status === 'hired' || bid.status === 'accepted') && (
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
              <CheckCircle size={18} className="text-green-600" />
              <span className="font-semibold text-green-700">
                {bid.status === 'hired' ? 'Hired Successfully' : 'Bid Accepted'}
              </span>
              {bid.hiredAt && (
                <span className="text-xs text-green-600 ml-2">
                  {formatDate(bid.hiredAt)}
                </span>
              )}
            </div>
          )}

          {bid.status === 'rejected' && (
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="font-semibold text-red-700">Bid Rejected</span>
              {bid.rejectedAt && (
                <span className="text-xs text-red-600 ml-2">
                  {formatDate(bid.rejectedAt)}
                </span>
              )}
            </div>
          )}

          {/* Freelancer View Actions */}
          {!isOwner && bid.status === 'pending' && (
            <div className="text-sm text-amber-600 font-medium flex items-center gap-2">
              <Clock size={14} />
              <span>Awaiting client response</span>
            </div>
          )}
        </div>

        {/* Bid Metadata Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200/50 text-xs text-gray-500 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Building size={12} />
              <span>Bid ID: {bid._id?.substring(0, 8)}...</span>
            </div>
            {bid.attachments && bid.attachments.length > 0 && (
              <div className="flex items-center gap-1">
                <span className="text-cyan-600">{bid.attachments.length} attachment(s)</span>
              </div>
            )}
          </div>
          
          {freelancer.joinedDate && (
            <div className="flex items-center gap-1">
              <Users size={12} />
              <span>Member since {formatDate(freelancer.joinedDate, true)}</span>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
