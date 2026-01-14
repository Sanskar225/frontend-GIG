export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateGigForm = (formData) => {
  const errors = {};

  // Backend requires min 10 characters for title
  if (!formData.title || formData.title.trim().length < 10) {
    errors.title = 'Title must be at least 10 characters';
  }

  // Backend requires min 100 characters for description
  if (!formData.description || formData.description.trim().length < 100) {
    errors.description = 'Description must be at least 100 characters';
  }

  if (!formData.budget || formData.budget < 1) {
    errors.budget = 'Budget must be greater than 0';
  }

  if (!formData.category) {
    errors.category = 'Please select a category';
  }

  // Deadline validation
  if (!formData.deadline) {
    errors.deadline = 'Deadline is required';
  } else {
    const deadlineDate = new Date(formData.deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (deadlineDate <= today) {
      errors.deadline = 'Deadline must be in the future';
    }
    
    // Optional: Check if deadline is too far in the future
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    if (deadlineDate > maxDate) {
      errors.deadline = 'Deadline cannot be more than 1 year from now';
    }
  }

  return errors;
};

export const validateBidForm = (formData) => {
  const errors = {};

  if (!formData.message || formData.message.trim().length < 50) {
    errors.message = 'Message must be at least 50 characters';
  }

  if (!formData.price || formData.price < 1) {
    errors.price = 'Price must be greater than 0';
  }

  if (!formData.estimatedTime || formData.estimatedTime < 1) {
    errors.estimatedTime = 'Estimated time must be at least 1 day';
  }

  return errors;
};

export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (date) => {
  if (!date) return 'Not specified';
  try {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return 'Invalid date';
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (error) {
    return 'Invalid date';
  }
};

export const formatRelativeTime = (date) => {
  if (!date) return 'Recently';
  try {
    const now = new Date();
    const past = new Date(date);
    if (isNaN(past.getTime())) return 'Invalid date';
    
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    }
    if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }
    if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
    
    return formatDate(date);
  } catch (error) {
    return 'Invalid date';
  }
};

export const formatDeadline = (dateString) => {
  if (!dateString) return 'Not specified';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  } catch (error) {
    return 'Invalid date';
  }
};

export const getDaysRemaining = (deadline) => {
  if (!deadline) return null;
  try {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    if (isNaN(deadlineDate.getTime())) return null;
    
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays; // Can be negative if deadline passed
  } catch (error) {
    return null;
  }
};

export const getDeadlineStatus = (deadline) => {
  if (!deadline) return { status: 'no-deadline', color: 'text-gray-500', text: 'No deadline' };
  
  const daysRemaining = getDaysRemaining(deadline);
  
  if (daysRemaining === null) return { status: 'invalid', color: 'text-gray-500', text: 'Invalid deadline' };
  
  if (daysRemaining < 0) return { status: 'expired', color: 'text-red-700', text: 'Expired' };
  if (daysRemaining === 0) return { status: 'today', color: 'text-red-600', text: 'Due today!' };
  if (daysRemaining <= 3) return { status: 'urgent', color: 'text-red-600', text: `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} left` };
  if (daysRemaining <= 7) return { status: 'warning', color: 'text-amber-600', text: `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} left` };
  
  return { status: 'normal', color: 'text-green-600', text: `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} left` };
};

export const getTimelineColor = (days) => {
  if (days === null || days === undefined) return 'bg-gradient-to-r from-gray-500 to-gray-600';
  if (days < 0) return 'bg-gradient-to-r from-red-700 to-rose-700';
  if (days <= 3) return 'bg-gradient-to-r from-red-500 to-rose-500';
  if (days <= 7) return 'bg-gradient-to-r from-amber-500 to-orange-500';
  if (days <= 14) return 'bg-gradient-to-r from-cyan-500 to-blue-500';
  return 'bg-gradient-to-r from-green-500 to-emerald-500';
};

export const formatDateForInput = (date) => {
  if (!date) return '';
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0];
  } catch (error) {
    return '';
  }
};

// Helper to parse skills from string to array
export const parseSkillsString = (skillsString) => {
  if (!skillsString || !skillsString.trim()) return [];
  return skillsString
    .split(',')
    .map(skill => skill.trim())
    .filter(skill => skill.length > 0);
};

// Helper to format skills array to string
export const formatSkillsString = (skillsArray) => {
  if (!skillsArray || !Array.isArray(skillsArray) || skillsArray.length === 0) return '';
  return skillsArray.join(', ');
};

// Validate skills (optional)
export const validateSkills = (skills) => {
  if (!skills) return true; // Optional field
  const skillsArray = Array.isArray(skills) ? skills : parseSkillsString(skills);
  return skillsArray.every(skill => typeof skill === 'string' && skill.trim().length > 0);
};