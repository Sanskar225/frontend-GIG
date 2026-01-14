import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchMyBids } from '../store/slices/bidSlice';
import { Card, CardBody } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Loader, SkeletonList } from '../components/ui/Loader';
import { FileText, Filter, DollarSign, Clock, Calendar } from 'lucide-react';
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
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={20} className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700 mr-2">Filter by status:</span>
            {[
              { value: 'all', label: 'All Bids' },
              { value: 'pending', label: 'Pending' },
              { value: 'hired', label: 'Hired' },
              { value: 'rejected', label: 'Rejected' },
            ].map((status) => (
              <button
                key={status.value}
                onClick={() => setStatusFilter(status.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  statusFilter === status.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.label} ({statusCounts[status.value]})
              </button>
            ))}
          </div>
        </div>

        {/* Bids List */}
        {loading ? (
          <SkeletonList count={5} />
        ) : filteredBids.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center">
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
            <Button onClick={() => navigate('/gigs')}>Browse Available Gigs</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBids.map((bid) => (
              <Card
                key={bid._id}
                hover
                onClick={() => navigate(`/gigs/${bid.gigId}`)}
              >
                <CardBody>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {bid.gig?.title || 'Gig Title Unavailable'}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                        {bid.message}
                      </p>
                    </div>
                    <StatusBadge status={bid.status} />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center text-primary-600 font-semibold">
                        <DollarSign size={18} />
                        <span>{formatCurrency(bid.price)}</span>
                      </div>
                      {bid.estimatedTime && (
                        <div className="flex items-center text-gray-600">
                          <Clock size={16} className="mr-1" />
                          <span>{bid.estimatedTime} days</span>
                        </div>
                      )}
                      <div className="flex items-center text-gray-500">
                        <Calendar size={16} className="mr-1" />
                        <span>{formatDate(bid.createdAt)}</span>
                      </div>
                    </div>

                    {bid.status === 'hired' && (
                      <div className="text-sm text-green-600 font-medium">
                        🎉 Congratulations!
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};