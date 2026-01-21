import React, { useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { AlertTriangle, User, DollarSign, Clock, Shield, CheckCircle, Target, TrendingUp, Award, Zap, Users, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/validators';

export const HireConfirmation = ({ isOpen, onClose, bid, onConfirm, loading }) => {
  // Log bid data for debugging
  useEffect(() => {
    if (isOpen && bid) {
      console.log('🔍 HireConfirmation - Bid data structure:', bid);
      console.log('📊 Freelancer data:', bid.freelancerId);
      console.log('💰 Bid price:', bid.price);
    }
  }, [isOpen, bid]);

  if (!bid) {
   // console.error('❌ HireConfirmation: No bid data provided');
    return null;
  }

  // Safely extract freelancer information
  const getFreelancerInfo = () => {
    // From backend: freelancerId is populated as object
    if (bid.freelancerId && typeof bid.freelancerId === 'object') {
      return {
        id: bid.freelancerId._id || '',
        username: bid.freelancerId.username || 'Unknown Freelancer',
        email: bid.freelancerId.email || '',
        rating: bid.freelancerId.rating || 4.8,
        profileImage: bid.freelancerId.profileImage || null,
        completedGigs: bid.freelancerId.completedGigs || 0,
        responseRate: 98, // Default value
        skills: bid.freelancerId.skills || []
      };
    }
    
    // Fallback for freelancer property
    if (bid.freelancer && typeof bid.freelancer === 'object') {
      return {
        id: bid.freelancer._id || '',
        username: bid.freelancer.username || bid.freelancer.name || 'Unknown Freelancer',
        email: bid.freelancer.email || '',
        rating: bid.freelancer.rating || 4.8,
        profileImage: bid.freelancer.profileImage || null,
        completedGigs: bid.freelancer.completedGigs || 0,
        responseRate: 98
      };
    }
    
    // Final fallback
    console.warn('⚠️ Using default freelancer data');
    return {
      id: bid._id || '',
      username: 'Unknown Freelancer',
      email: '',
      rating: 4.8,
      profileImage: null,
      completedGigs: 42,
      responseRate: 96
    };
  };

  // Safely get bid price
  const getBidPrice = () => {
    if (bid && bid.price !== undefined && bid.price !== null) {
      const price = parseFloat(bid.price);
      if (!isNaN(price) && price > 0) {
        return price;
      }
    }
    
    console.error('❌ Invalid bid price:', bid?.price);
    return 0;
  };

  const freelancer = getFreelancerInfo();
  const bidPrice = getBidPrice();
  
  // Validate bid data
  const isValidBid = bid._id && bidPrice > 0 && freelancer.id;
  
  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'from-green-500 to-emerald-500';
    if (rating >= 4.0) return 'from-cyan-500 to-blue-500';
    return 'from-yellow-500 to-amber-500';
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={
        <div className="flex items-center gap-2">
          <Award size={24} className="text-cyan-600" />
          <span>Confirm Professional Hiring</span>
        </div>
      }
      size="lg"
    >
      <div className="space-y-6">
        {/* Data Validation Warning */}
        {!isValidBid && (
          <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
            <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 mb-1">Incomplete Bid Data</h4>
              <p className="text-sm text-amber-800">
                Some bid information appears to be incomplete. Please verify before proceeding.
              </p>
              <div className="mt-2 text-xs text-amber-700 space-y-1">
                <p>• Bid ID: {bid._id || 'Missing'}</p>
                <p>• Freelancer ID: {freelancer.id || 'Missing'}</p>
                <p>• Bid Price: ${bidPrice === 0 ? '0.00 (Invalid)' : formatCurrency(bidPrice)}</p>
                <p>• Freelancer Name: {freelancer.username}</p>
              </div>
            </div>
          </div>
        )}

        {/* Trust Banner */}
        <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-800/30 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-cyan-400" />
              <div>
                <h4 className="font-bold text-white">TRUSTWORTHY HIRING PROCESS</h4>
                <p className="text-sm text-cyan-200">Secure escrow protection & professional guarantee</p>
              </div>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Warning Section */}
        <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/70 rounded-2xl">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-amber-900 text-lg mb-2">Important Notice</h4>
            <div className="space-y-2 text-amber-800">
              <p className="text-sm">⚠️ <strong>This action cannot be undone.</strong> Once confirmed:</p>
              <ul className="space-y-1 text-sm ml-5">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                  <span>All other bids will be automatically rejected</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                  <span>Gig status will change to "In Progress"</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                  <span>Project will be assigned to this freelancer exclusively</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                  <span>Payment escrow will be activated for protection</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Freelancer Profile Card */}
        <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200/70 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-gray-200/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Selected Professional</h3>
              <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full">
                <Target size={12} />
                <span>TOP MATCH</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                {freelancer.profileImage ? (
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-cyan-200">
                    <img 
                      src={freelancer.profileImage} 
                      alt={freelancer.username}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                          <div class="w-16 h-16 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center border-2 border-cyan-200">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0e7490" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                          </div>
                        `;
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center border-2 border-cyan-200">
                    <User size={28} className="text-cyan-700" />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                  <CheckCircle size={10} className="text-white" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-xl font-bold text-gray-900">{freelancer.username}</h4>
                  <div className={`text-sm font-bold bg-gradient-to-r ${getRatingColor(freelancer.rating)} text-white px-2 py-0.5 rounded-full flex items-center gap-1`}>
                    <Award size={10} />
                    {freelancer.rating.toFixed(1)}
                  </div>
                </div>
                {freelancer.email && (
                  <p className="text-gray-600 mb-3 text-sm">{freelancer.email}</p>
                )}
                
                {/* Skills (if available) */}
                {freelancer.skills && freelancer.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {freelancer.skills.slice(0, 3).map((skill, index) => (
                      <span 
                        key={index}
                        className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Stats */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Users size={14} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Projects</p>
                      <p className="font-bold text-gray-900">{freelancer.completedGigs}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Zap size={14} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Response Rate</p>
                      <p className="font-bold text-gray-900">{freelancer.responseRate}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Clock size={14} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Delivery Time</p>
                      <p className="font-bold text-gray-900">{bid.estimatedTime || 7} days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Agreement Details */}
          <div className="p-5 bg-gradient-to-r from-gray-50 to-gray-100/50">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-cyan-600" />
              Agreement Details
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Price Card */}
              <div className={`bg-gradient-to-br ${
                bidPrice === 0 
                  ? 'from-amber-50 to-orange-50 border-amber-200/50' 
                  : 'from-cyan-50 to-blue-50 border-cyan-200/50'
              } rounded-xl p-4`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-cyan-800">Total Amount</span>
                  <DollarSign size={18} className="text-cyan-600" />
                </div>
                <div className="flex items-center text-3xl font-bold text-gray-900 mb-2">
                  <DollarSign size={28} className="text-cyan-600 mr-2" />
                  <span>{formatCurrency(bidPrice)}</span>
                </div>
                {bidPrice === 0 ? (
                  <p className="text-sm text-amber-600">⚠️ Verify price before proceeding</p>
                ) : (
                  <p className="text-sm text-cyan-700">Secured via escrow protection</p>
                )}
              </div>

              {/* Timeline Card */}
              {bid.estimatedTime && (
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-800">Timeline</span>
                    <Clock size={18} className="text-gray-600" />
                  </div>
                  <div className="flex items-center text-3xl font-bold text-gray-900 mb-2">
                    <Clock size={28} className="text-gray-600 mr-2" />
                    <span>{bid.estimatedTime} days</span>
                  </div>
                  <p className="text-sm text-gray-700">Estimated completion</p>
                </div>
              )}
            </div>

            {/* Bid Message Preview */}
            {bid.message && (
              <div className="mt-4 p-3 bg-white border border-gray-200 rounded-lg">
                <h5 className="text-sm font-semibold text-gray-800 mb-2">Proposal Preview:</h5>
                <p className="text-sm text-gray-600 line-clamp-2">{bid.message}</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200/50 rounded-2xl">
          <div>
            <p className="text-sm text-gray-600">Ready to move forward?</p>
            <p className="text-lg font-bold text-gray-900">Confirm professional partnership</p>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl font-medium"
            >
              Cancel
            </Button>
            <Button
              variant="success"
              onClick={() => {
                if (!isValidBid) {
                  console.error('Cannot hire: Bid data is invalid');
                  alert('Cannot proceed: Bid data is incomplete. Please check the console for details.');
                  return;
                }
                console.log('Confirming hire for bid ID:', bid._id);
                onConfirm(bid._id);
              }}
              loading={loading}
              disabled={!isValidBid}
              className={`bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 px-8 py-2.5 rounded-xl border-0 ${
                !isValidBid ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <Award size={18} />
                <span>
                  {!isValidBid ? 'Check Bid Data' : 'Confirm & Hire Professional'}
                </span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
