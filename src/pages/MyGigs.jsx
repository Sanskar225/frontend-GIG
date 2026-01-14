import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchMyGigs } from '../store/slices/gigSlice';
import { GigCard } from '../components/gigs/GigCard';
import { Button } from '../components/ui/Button';
import { Loader, SkeletonList } from '../components/ui/Loader';
import { Briefcase, Plus, Filter } from 'lucide-react';

export const MyGigs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { myGigs, loading } = useSelector((state) => state.gigs);

  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');

  useEffect(() => {
    dispatch(fetchMyGigs());
  }, [dispatch]);

  const filteredGigs =
    statusFilter === 'all'
      ? myGigs
      : myGigs.filter((gig) => gig.status === statusFilter);

  const statusCounts = {
    all: myGigs.length,
    open: myGigs.filter((g) => g.status === 'open').length,
    assigned: myGigs.filter((g) => g.status === 'assigned').length,
    completed: myGigs.filter((g) => g.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Gigs</h1>
            <p className="text-gray-600">Manage all your posted gigs</p>
          </div>
          <Button icon={Plus} onClick={() => navigate('/gigs/create')}>
            Post New Gig
          </Button>
        </div>

        {/* Status Filters */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={20} className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700 mr-2">Filter by status:</span>
            {[
              { value: 'all', label: 'All Gigs' },
              { value: 'open', label: 'Open' },
              { value: 'assigned', label: 'In Progress' },
              { value: 'completed', label: 'Completed' },
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

        {/* Gigs Grid */}
        {loading ? (
          <SkeletonList count={6} />
        ) : filteredGigs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center">
            <Briefcase className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {statusFilter === 'all'
                ? 'No gigs yet'
                : `No ${statusFilter} gigs`}
            </h3>
            <p className="text-gray-600 mb-6">
              {statusFilter === 'all'
                ? "Start by posting your first gig and connecting with talented freelancers"
                : `You don't have any ${statusFilter} gigs at the moment`}
            </p>
            <Button icon={Plus} onClick={() => navigate('/gigs/create')}>
              Post Your First Gig
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGigs.map((gig) => (
              <GigCard key={gig._id} gig={gig} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};