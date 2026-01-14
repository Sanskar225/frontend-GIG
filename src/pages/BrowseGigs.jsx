import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGigs } from '../store/slices/gigSlice';
import { GigCard } from '../components/gigs/GigCard';
import { GigFilters } from '../components/gigs/GigFilters';
import { Loader, SkeletonList } from '../components/ui/Loader';
import { Button } from '../components/ui/Button';
import { Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';

export const BrowseGigs = () => {
  const dispatch = useDispatch();
  const { allGigs, loading, totalPages, currentPage } = useSelector((state) => state.gigs);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minBudget: '',
    maxBudget: '',
    status: 'open',
  });

  const [page, setPage] = useState(1);

  useEffect(() => {
    loadGigs();
  }, [page]);

  const loadGigs = () => {
    const params = {
      page,
      limit: 12,
      ...filters,
    };
    dispatch(fetchGigs(params));
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
    const params = {
      page: 1,
      limit: 12,
      ...newFilters,
    };
    dispatch(fetchGigs(params));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Gigs</h1>
          <p className="text-gray-600">
            Find the perfect freelance opportunity for your skills
          </p>
        </div>

        {/* Filters */}
        <GigFilters onFilter={handleFilter} />

        {/* Gigs Grid */}
        {loading && page === 1 ? (
          <SkeletonList count={6} />
        ) : allGigs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center">
            <Briefcase className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No gigs found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or check back later for new opportunities
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {allGigs.map((gig) => (
                <GigCard key={gig._id} gig={gig} showOwner />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  icon={ChevronLeft}
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <Button
                      key={pageNum}
                      variant={pageNum === page ? 'primary' : 'outline'}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                  <ChevronRight className="ml-2" size={16} />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};