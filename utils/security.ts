import DOMPurify from 'dompurify';
import * as yup from 'yup';

// XSS Protection
export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote'],
    ALLOWED_ATTR: [],
  });
};

export const sanitizeText = (text: string): string => {
  return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
};

// Input Validation Schemas
export const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const registerSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
    .required('Password is required'),
  name: yup.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters').required('Name is required'),
  age: yup.number().integer().min(18, 'Must be at least 18 years old').max(100, 'Invalid age').required('Age is required'),
  gender: yup.string().oneOf(['male', 'female', 'other'], 'Invalid gender').required('Gender is required'),
});

export const profileUpdateSchema = yup.object().shape({
  bio: yup.string().max(500, 'Bio must be less than 500 characters'),
  hobbies: yup.array().of(yup.string().max(50, 'Hobby name too long')),
  photos: yup.array().of(yup.string().url('Invalid photo URL')),
});

export const messageSchema = yup.object().shape({
  content: yup.string().max(1000, 'Message too long').required('Message content is required'),
  type: yup.string().oneOf(['text', 'image', 'emoji'], 'Invalid message type'),
});

// CSRF Protection (for forms)
export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Secure API calls
export const secureApiCall = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const secureOptions: RequestInit = {
    ...options,
    credentials: 'include', // Include cookies for authentication
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest', // Helps prevent CSRF
      ...options.headers,
    },
  };

  // Add CSRF token if it's a state-changing request
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(options.method || 'GET')) {
    const csrfToken = localStorage.getItem('csrfToken') || generateCSRFToken();
    localStorage.setItem('csrfToken', csrfToken);
    secureOptions.headers = {
      ...secureOptions.headers,
      'X-CSRF-Token': csrfToken,
    };
  }

  return fetch(url, secureOptions);
};

// Content Security Policy helper
export const getCSPDirectives = () => ({
  'default-src': "'self'",
  'script-src': "'self' 'unsafe-inline' 'unsafe-eval'",
  'style-src': "'self' 'unsafe-inline'",
  'img-src': "'self' data: https:",
  'font-src': "'self'",
  'connect-src': "'self'",
  'media-src': "'self'",
  'object-src': "'none'",
  'frame-src': "'none'",
});

// Password strength checker
export const checkPasswordStrength = (password: string): {
  score: number;
  feedback: string[];
} => {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) score++;
  else feedback.push('Use at least 8 characters');

  if (/[a-z]/.test(password)) score++;
  else feedback.push('Include lowercase letters');

  if (/[A-Z]/.test(password)) score++;
  else feedback.push('Include uppercase letters');

  if (/\d/.test(password)) score++;
  else feedback.push('Include numbers');

  if (/[@$!%*?&]/.test(password)) score++;
  else feedback.push('Include special characters');

  return { score, feedback };
};