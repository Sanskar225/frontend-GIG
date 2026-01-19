import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchMyBids } from '../store/slices/bidSlice';
import { Card, CardBody } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Loader, SkeletonList } from '../components/ui/Loader';
import { 
  FileText, Filter, DollarSign, Clock, Calendar, 
  Briefcase, User, Target, Award, TrendingUp 
} from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/validators';

export const MyBids = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { myBids, loading } = useSelector((state) => state.bids);

  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');

  useEffect(() => {
    dispatch(fetchMyBids());
  }, [dispatch]);

  const filteredBids =
    statusFilter === 'all'
      ? myBids
      : myBids.filter((bid) => bid.status === statusFilter);

  const statusCounts = {
    all: myBids.length,
    pending: myBids.filter((b) => b.status === 'pending').length,
    hired: myBids.filter((b) => b.status === 'hired').length,
    rejected: myBids.filter((b) => b.status === 'rejected').length,
  };

  // Helper function to safely get gig data
  const getGigInfo = (bid) => {
    // If gigId is populated as an object (from backend)
    if (bid.gigId && typeof bid.gigId === 'object') {
      return {
        id: bid.gigId._id,
        title: bid.gigId.title,
        budget: bid.gigId.budget,
        status: bid.gigId.status,
        client: bid.gigId.client,
        description: bid.gigId.description,
        category: bid.gigId.category
      };
    }
    
    // If there's a separate gig property (fallback)
    if (bid.gig && typeof bid.gig === 'object') {
      return {
        id: bid.gig._id,
        title: bid.gig.title,
        budget: bid.gig.budget,
        status: bid.gig.status,
        client: bid.gig.client,
        description: bid.gig.description,
        category: bid.gig.category
      };
    }
    
    // Default/fallback
    return {
      id: typeof bid.gigId === 'string' ? bid.gigId : '',
      title: 'Unknown Gig',
      budget: 0,
      status: 'unknown',
      client: null,
      description: '',
      category: 'General'
    };
  };

  // Helper to get client name safely
  const getClientName = (client) => {
    if (client && typeof client === 'object') {
      return client.username || 'Unknown Client';
    }
    return 'Unknown Client';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bids</h1>
            <p className="text-gray-600">Track all your submitted proposals</p>
          </div>
          <Button onClick={() => navigate('/gigs')}>Browse Gigs</Button>
        </div>

        {/* Status Filters */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={20} className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700 mr-2">Filter by status:</span>
            {[
              { value: 'all', label: 'All Bids', color: 'bg-gray-100 text-gray-700 hover:bg-gray-200' },
              { value: 'pending', label: 'Pending', color: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200' },
              { value: 'hired', label: 'Hired', color: 'bg-green-100 text-green-700 hover:bg-green-200' },
              { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-700 hover:bg-red-200' },
            ].map((status) => (
              <button
                key={status.value}
                onClick={() => setStatusFilter(status.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  statusFilter === status.value
                    ? status.value === 'all' ? 'bg-gray-800 text-white' :
                      status.value === 'pending' ? 'bg-cyan-600 text-white' :
                      status.value === 'hired' ? 'bg-green-600 text-white' :
                      'bg-red-600 text-white'
                    : status.color
                }`}
              >
                {status.label} 
                <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                  statusFilter === status.value ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {statusCounts[status.value]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        {!loading && myBids.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Bids</p>
                  <p className="text-2xl font-bold text-gray-900">{statusCounts.all}</p>
                </div>
                <Target size={24} className="text-cyan-600" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{statusCounts.pending}</p>
                </div>
                <Clock size={24} className="text-amber-600" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Hired</p>
                  <p className="text-2xl font-bold text-gray-900">{statusCounts.hired}</p>
                </div>
                <Award size={24} className="text-green-600" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {myBids.length > 0 ? Math.round((statusCounts.hired / myBids.length) * 100) : 0}%
                  </p>
                </div>
                <TrendingUp size={24} className="text-purple-600" />
              </div>
            </div>
          </div>
        )}

        {/* Bids List */}
        {loading ? (
          <SkeletonList count={5} />
        ) : filteredBids.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 text-center">
            <FileText className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {statusFilter === 'all'
                ? 'No bids yet'
                : `No ${statusFilter} bids`}
            </h3>
            <p className="text-gray-600 mb-6">
              {statusFilter === 'all'
                ? 'Start bidding on gigs to showcase your skills and win projects'
                : `You don't have any ${statusFilter} bids at the moment`}
            </p>
            <Button 
              onClick={() => navigate('/gigs')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              Browse Available Gigs
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBids.map((bid) => {
              const gigInfo = getGigInfo(bid);
              const clientName = getClientName(gigInfo.client);
              
              return (
                <Card
                  key={bid._id}
                  hover
                  onClick={() => gigInfo.id && navigate(`/gigs/${gigInfo.id}`)}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300"
                >
                  <CardBody className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        {/* Gig Title & Client */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl flex items-center justify-center">
                            <Briefcase size={20} className="text-cyan-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">
                              {gigInfo.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <User size={14} className="text-gray-500" />
                              <span className="text-sm text-gray-600">Client: {clientName}</span>
                              {gigInfo.budget > 0 && (
                                <>
                                  <span className="text-gray-300">•</span>
                                  <span className="text-sm font-medium text-green-600">
                                    Budget: {formatCurrency(gigInfo.budget)}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Bid Message Preview */}
                        <div className="mb-4">
                          <p className="text-gray-700 line-clamp-2 text-sm bg-gray-50 p-3 rounded-lg">
                            {bid.message}
                          </p>
                        </div>
                      </div>
                      
                      {/* Status Badge & Date */}
                      <div className="flex flex-col items-end gap-3 ml-4">
                        <StatusBadge status={bid.status} />
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar size={12} className="mr-1" />
                          <span>{formatDate(bid.createdAt || bid.submittedAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bid Details */}
                    <div className="flex items-center justify-between pt-5 border-t border-gray-200">
                      <div className="flex items-center gap-6">
                        {/* Bid Price */}
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 mb-1">Your Bid</span>
                          <div className="flex items-center text-lg font-bold text-primary-600">
                            <DollarSign size={18} className="mr-1" />
                            <span>{formatCurrency(bid.price)}</span>
                          </div>
                        </div>

                        {/* Estimated Time */}
                        {bid.estimatedTime && (
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500 mb-1">Delivery Time</span>
                            <div className="flex items-center text-gray-700">
                              <Clock size={16} className="mr-1" />
                              <span className="font-medium">{bid.estimatedTime} days</span>
                            </div>
                          </div>
                        )}

                        {/* Gig Category */}
                        {gigInfo.category && (
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500 mb-1">Category</span>
                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                              {gigInfo.category}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Status-specific UI */}
                      <div className="flex items-center gap-3">
                        {bid.status === 'hired' && (
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                            <Award size={16} className="text-green-600" />
                            <span className="text-sm font-medium text-green-700">Hired! 🎉</span>
                          </div>
                        )}
                        
                        {bid.status === 'pending' && (
                          <div className="flex items-center gap-2 text-sm text-cyan-600">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                            <span>Awaiting response</span>
                          </div>
                        )}
                        
                        {bid.status === 'rejected' && (
                          <div className="text-sm text-gray-500">
                            Bid not selected
                          </div>
                        )}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
