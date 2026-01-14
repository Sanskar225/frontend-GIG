import React from 'react';
import { Card, CardBody } from '../ui/Card';
import { StatusBadge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { User, DollarSign, Clock, Calendar, CheckCircle, Award, Zap, TrendingUp, MessageSquare, Star, Shield } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/validators';

export const BidCard = ({ bid, onHire, isOwner, loading }) => {
  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'from-green-500 to-emerald-500';
    if (rating >= 4.0) return 'from-cyan-500 to-blue-500';
    if (rating >= 3.5) return 'from-yellow-500 to-amber-500';
    return 'from-gray-400 to-gray-500';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'bg-gradient-to-r from-green-500 to-emerald-500';
      case 'rejected': return 'bg-gradient-to-r from-red-500 to-rose-500';
      case 'pending': return 'bg-gradient-to-r from-cyan-500 to-blue-500';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const freelancerRating = bid.freelancer?.rating || 4.7;
  const projectsCompleted = bid.freelancer?.projectsCompleted || 42;
  const responseRate = bid.freelancer?.responseRate || 98;

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:border-cyan-200/50 group overflow-hidden">
      <div className={`absolute top-0 left-0 w-1 h-full ${getStatusColor(bid.status)}`}></div>
      
      <CardBody className="p-6">
        {/* Header with Freelancer Info */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center border-2 border-cyan-200/50 group-hover:border-cyan-300 transition-all">
                <User size={26} className="text-cyan-700" />
              </div>
              {bid.freelancer?.verified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                  <Shield size={10} className="text-white" />
                </div>
              )}
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-gray-900">
                  {bid.freelancer?.name || 'Unknown Freelancer'}
                </h3>
                {bid.freelancer?.premium && (
                  <span className="text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-0.5 rounded-full">
                    PRO
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">{bid.freelancer?.email}</p>
              
              {/* Rating & Stats */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className={`text-xs font-bold bg-gradient-to-r ${getRatingColor(freelancerRating)} text-white px-2 py-0.5 rounded-full flex items-center gap-1`}>
                    <Star size={10} fill="white" />
                    {freelancerRating.toFixed(1)}
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
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <StatusBadge status={bid.status} />
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <Calendar size={12} />
              <span>{formatDate(bid.createdAt)}</span>
            </div>
          </div>
        </div>

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

          {bid.status === 'accepted' && (
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
              <CheckCircle size={18} className="text-green-600" />
              <span className="font-semibold text-green-700">Hired Successfully</span>
            </div>
          )}

          {bid.status === 'rejected' && (
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="font-semibold text-red-700">Bid Rejected</span>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};