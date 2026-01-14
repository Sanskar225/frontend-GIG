import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { AlertTriangle, User, DollarSign, Clock, Shield, CheckCircle, Target, TrendingUp, Award, Zap, Users } from 'lucide-react';
import { formatCurrency } from '../../utils/validators';

export const HireConfirmation = ({ isOpen, onClose, bid, onConfirm, loading }) => {
  if (!bid) return null;

  const freelancerRating = bid.freelancer?.rating || 4.8;
  const projectsCompleted = bid.freelancer?.projectsCompleted || 42;
  const responseRate = bid.freelancer?.responseRate || 96;

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

        {/* Warning Section - Enhanced */}
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
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center border-2 border-cyan-200">
                  <User size={28} className="text-cyan-700" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                  <CheckCircle size={10} className="text-white" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-xl font-bold text-gray-900">{bid.freelancer?.name}</h4>
                  <div className={`text-sm font-bold bg-gradient-to-r ${getRatingColor(freelancerRating)} text-white px-2 py-0.5 rounded-full flex items-center gap-1`}>
                    <Award size={10} />
                    {freelancerRating.toFixed(1)}
                  </div>
                </div>
                <p className="text-gray-600 mb-3">{bid.freelancer?.email}</p>
                
                {/* Stats */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Users size={14} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Projects</p>
                      <p className="font-bold text-gray-900">{projectsCompleted}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Zap size={14} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Response Rate</p>
                      <p className="font-bold text-gray-900">{responseRate}%</p>
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
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200/50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-cyan-800">Total Amount</span>
                  <DollarSign size={18} className="text-cyan-600" />
                </div>
                <div className="flex items-center text-3xl font-bold text-gray-900 mb-2">
                  <DollarSign size={28} className="text-cyan-600 mr-2" />
                  <span>{formatCurrency(bid.price)}</span>
                </div>
                <p className="text-sm text-cyan-700">Secured via escrow protection</p>
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
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-2xl p-5">
          <h4 className="font-bold text-green-900 mb-4 flex items-center gap-2">
            <Shield size={18} className="text-green-600" />
            What's Included
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Shield, text: 'Escrow Payment Protection', color: 'text-green-600' },
              { icon: CheckCircle, text: 'Money-Back Guarantee', color: 'text-green-600' },
              { icon: Users, text: '24/7 Support', color: 'text-green-600' },
              { icon: Zap, text: 'Fast Response Time', color: 'text-green-600' },
              { icon: Award, text: 'Quality Assurance', color: 'text-green-600' },
              { icon: Target, text: 'Project Management', color: 'text-green-600' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <item.icon size={16} className={item.color} />
                </div>
                <span className="text-sm font-medium text-green-900">{item.text}</span>
              </div>
            ))}
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
              Review Later
            </Button>
            <Button
              variant="success"
              onClick={() => onConfirm(bid._id)}
              loading={loading}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 px-8 py-2.5 rounded-xl border-0"
            >
              <div className="flex items-center gap-2">
                <Award size={18} />
                <span>Confirm & Hire Professional</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};