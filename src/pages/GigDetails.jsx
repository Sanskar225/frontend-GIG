import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGigById, deleteGig } from '../store/slices/gigSlice';
import { fetchBidsForGig, submitBid, hireBid } from '../store/slices/bidSlice';
import { GigDetails } from '../components/gigs/GigDetails'; // This is the component
import { BidCard } from '../components/bids/BidCard';
import { BidForm } from '../components/bids/BidForm';
import { HireConfirmation } from '../components/bids/HireConfirmation';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Loader } from '../components/ui/Loader';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { ArrowLeft, Edit, Trash2, Plus, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

export const GigDetailPage = () => { // CHANGED: from GigDetailPage to GigDetails
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { currentGig, loading: gigLoading } = useSelector((state) => state.gigs);
  const { gigBids, loading: bidsLoading } = useSelector((state) => state.bids);

  const [showBidForm, setShowBidForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showHireConfirm, setShowHireConfirm] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);
  const [submittingBid, setSubmittingBid] = useState(false);
  const [hiringBid, setHiringBid] = useState(false);

  const isOwner = currentGig?.client?._id === user?._id;
  const currentBids = gigBids[id] || [];
  const hasUserBid = currentBids.some((bid) => bid.freelancer?._id === user?._id);

  useEffect(() => {
    dispatch(fetchGigById(id));
    if (user) {
      dispatch(fetchBidsForGig(id));
    }
  }, [id, dispatch, user]);

  const handleSubmitBid = async (bidData) => {
    setSubmittingBid(true);
    try {
      await dispatch(submitBid(bidData)).unwrap();
      setShowBidForm(false);
      dispatch(fetchBidsForGig(id));
    } catch (error) {
      // Error handled by toast in slice
    } finally {
      setSubmittingBid(false);
    }
  };

  const handleHireClick = (bid) => {
    setSelectedBid(bid);
    setShowHireConfirm(true);
  };

  const handleConfirmHire = async (bidId) => {
    setHiringBid(true);
    try {
      await dispatch(hireBid(bidId)).unwrap();
      setShowHireConfirm(false);
      dispatch(fetchGigById(id));
      dispatch(fetchBidsForGig(id));
    } catch (error) {
      // Error handled by toast in slice
    } finally {
      setHiringBid(false);
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteGig(id)).unwrap();
      navigate('/my-gigs');
    } catch (error) {
      // Error handled by toast in slice
    }
  };

  if (gigLoading && !currentGig) {
    return <Loader fullScreen />;
  }

  if (!currentGig) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Gig not found</h2>
          <Button onClick={() => navigate('/gigs')}>Browse Gigs</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          icon={ArrowLeft}
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gig Details */}
            <GigDetails gig={currentGig} />

            {/* Owner Actions */}
            {isOwner && (
              <Card>
                <CardBody>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Manage Gig</h3>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      icon={Edit}
                      onClick={() => navigate(`/gigs/${id}/edit`)}
                      disabled={currentGig.status !== 'open'}
                    >
                      Edit Gig
                    </Button>
                    <Button
                      variant="danger"
                      icon={Trash2}
                      onClick={() => setShowDeleteConfirm(true)}
                    >
                      Delete Gig
                    </Button>
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Bids Section */}
            {isOwner && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-bold text-gray-900">
                    Bids ({currentBids.length})
                  </h2>
                </CardHeader>
                <CardBody>
                  {bidsLoading ? (
                    <Loader />
                  ) : currentBids.length === 0 ? (
                    <div className="text-center py-8 text-gray-600">
                      No bids yet. Share your gig to get more visibility!
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {currentBids.map((bid) => (
                        <BidCard
                          key={bid._id}
                          bid={bid}
                          isOwner={isOwner}
                          onHire={handleHireClick}
                          loading={hiringBid}
                        />
                      ))}
                    </div>
                  )}
                </CardBody>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Bid Action Card */}
            {!isOwner && currentGig.status === 'open' && (
              <Card>
                <CardBody>
                  {hasUserBid ? (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus className="text-green-600" size={32} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Bid Submitted!
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        You've already submitted a bid for this gig. The client will review it soon.
                      </p>
                      <Button
                        variant="outline"
                        fullWidth
                        onClick={() => navigate('/my-bids')}
                      >
                        View My Bids
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Interested in this gig?
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Submit a proposal to let the client know you're interested and explain why
                        you're the best fit.
                      </p>
                      <Button
                        fullWidth
                        icon={Plus}
                        onClick={() => setShowBidForm(true)}
                      >
                        Submit a Bid
                      </Button>
                    </div>
                  )}
                </CardBody>
              </Card>
            )}

            {/* Gig Status Info */}
            {currentGig.status !== 'open' && (
              <Card>
                <CardBody>
                  <div className="text-center">
                    <AlertTriangle className="mx-auto text-yellow-500 mb-3" size={48} />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Gig {currentGig.status === 'assigned' ? 'In Progress' : 'Completed'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {currentGig.status === 'assigned'
                        ? 'This gig has been assigned to a freelancer'
                        : 'This gig has been completed'}
                    </p>
                  </div>
                </CardBody>
              </Card>
            )}
          </div>
        </div>

        {/* Modals */}
        <Modal
          isOpen={showBidForm}
          onClose={() => setShowBidForm(false)}
          title="Submit Your Bid"
          size="lg"
        >
          <BidForm
            gig={currentGig}
            onSubmit={handleSubmitBid}
            loading={submittingBid}
          />
        </Modal>

        <HireConfirmation
          isOpen={showHireConfirm}
          onClose={() => setShowHireConfirm(false)}
          bid={selectedBid}
          onConfirm={handleConfirmHire}
          loading={hiringBid}
        />

        <Modal
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          title="Delete Gig"
          size="md"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-sm font-medium text-red-800">
                  This action cannot be undone
                </p>
                <p className="text-sm text-red-700 mt-1">
                  All bids associated with this gig will also be deleted.
                </p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="ghost" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete Gig
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};