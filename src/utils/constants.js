export const GIG_CATEGORIES = [
  { value: 'web-development', label: 'Web Development' },
  { value: 'mobile-development', label: 'Mobile Development' },
  { value: 'design', label: 'Design & Graphics' },
  { value: 'writing', label: 'Writing & Content' },
  { value: 'marketing', label: 'Digital Marketing' },
  { value: 'video', label: 'Video & Animation' },
  { value: 'music', label: 'Music & Audio' },
  { value: 'other', label: 'Other' },
];

export const GIG_STATUS = {
  OPEN: 'open',
  ASSIGNED: 'assigned',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export const BID_STATUS = {
  PENDING: 'pending',
  HIRED: 'hired',
  REJECTED: 'rejected',
};

export const USER_ROLES = {
  CLIENT: 'client',
  FREELANCER: 'freelancer',
};

export const NOTIFICATION_TYPES = {
  NEW_BID: 'new_bid',
  BID_ACCEPTED: 'bid_accepted',
  BID_REJECTED: 'bid_rejected',
  GIG_COMPLETED: 'gig_completed',
};