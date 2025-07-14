// server-side-validation.js - For your Cloudflare Workers API

// Shared restricted terms configuration (keep in sync with frontend)
const RESTRICTED_TERMS = [
  // Business startup related
  'start up capital', 'startup capital', 'business start up', 'business startup',
  'start-up capital', 'need money to start a business', 'money to start business',
  'starting a business', 'new business funding',
  
  // Small business related
  'small business', 'small business loan', 'small business financing',
  'small business grant', 'small business funding',
  
  // Grants related
  'grants', 'business grant', 'business grants', 'government grants',
  'free grants', 'grant money', 'grant funding', 'any grants available',
  'grants for small businesses', 'grants available for small businesses',
  
  // Loan apps and quick funding
  'business loan app', 'best business loan app', 'loan app', 'quick loan',
  'instant loan', 'fast loan', 'emergency loan', 'payday loan', 'cash advance',
  
  // Personal/consumer loans
  'personal loan', 'consumer loan', 'individual loan', 'private loan', 'unsecured loan',
  
  // Microfinance related
  'microfinance', 'microcredit', 'micro loan', 'small loan', 'mini loan',
  
  // Other restricted terms
  'free money', 'easy money', 'quick cash', 'instant cash', 'bad credit',
  'no credit check', 'guaranteed approval', 'side hustle', 'passive income',
  'get rich quick'
];

// Advanced validation patterns
const SUSPICIOUS_PATTERNS = [
  /\b(loan|funding|grant|money|capital|finance|financing)\s*(for|to)\s*(start|begin|launch|open)\b/gi,
  /\b(quick|fast|instant|immediate|emergency)\s*(loan|money|cash|funding)\b/gi,
  /\b(free|easy|guaranteed)\s*(money|loan|grant|funding)\b/gi,
  /\b(bad|poor|no)\s*credit\b/gi,
  /\bmicro\s*(loan|finance|credit)\b/gi,
  /\b(need|want|looking for)\s*(money|cash|funding|loan)\b/gi,
  /\b(individual|personal|private)\s*(loan|funding|finance)\b/gi
];

// Server-side validation function
function validateSubmission(formData) {
  const errors = [];
  const warnings = [];
  
  // Combine text fields for validation
  const textFields = [
    formData.message || '',
    formData.subject || '',
    formData.service || '',
    formData.firstName || '',
    formData.lastName || ''
  ];
  
  const combinedText = textFields.join(' ').toLowerCase();
  
  // Check for restricted terms
  const foundTerms = RESTRICTED_TERMS.filter(term => 
    combinedText.includes(term.toLowerCase())
  );
  
  if (foundTerms.length > 0) {
    errors.push({
      type: 'restricted_content',
      message: 'Submission contains restricted terms',
      foundTerms: foundTerms,
      severity: 'high'
    });
  }
  
  // Check for suspicious patterns
  let suspiciousMatches = [];
  SUSPICIOUS_PATTERNS.forEach((pattern, index) => {
    const matches = combinedText.match(pattern);
    if (matches) {
      suspiciousMatches.push({
        pattern: index,
        matches: matches,
        description: getSuspiciousPatternDescription(index)
      });
    }
  });
  
  if (suspiciousMatches.length > 0) {
    errors.push({
      type: 'suspicious_pattern',
      message: 'Submission contains suspicious patterns',
      matches: suspiciousMatches,
      severity: 'medium'
    });
  }
  
  // Additional checks for service alignment
  if (formData.service) {
    const serviceValidation = validateServiceAlignment(formData.service, combinedText);
    if (!serviceValidation.valid) {
      warnings.push({
        type: 'service_mismatch',
        message: 'Service selection may not align with message content',
        details: serviceValidation.details
      });
    }
  }
  
  return {
    valid: errors.length === 0,
    errors: errors,
    warnings: warnings,
    score: calculateRiskScore(errors, warnings)
  };
}

// Helper function to get pattern descriptions
function getSuspiciousPatternDescription(patternIndex) {
  const descriptions = [
    'Startup/new business funding pattern',
    'Quick/instant funding pattern',
    'Free/easy money pattern',
    'Bad credit pattern',
    'Microfinance pattern',
    'Generic funding request pattern',
    'Personal loan pattern'
  ];
  return descriptions[patternIndex] || 'Unknown pattern';
}

// Service alignment validation
function validateServiceAlignment(service, messageContent) {
  const commercialServices = [
    'commercial real estate financing',
    'large project financing',
    'business expansion capital',
    'working capital (established business)',
    'equity financing',
    'agri-business financing',
    'non-recourse financing'
  ];
  
  const problematicKeywords = [
    'startup', 'start up', 'new business', 'small business',
    'personal', 'individual', 'grant', 'free money'
  ];
  
  const hasProblematicKeywords = problematicKeywords.some(keyword => 
    messageContent.includes(keyword)
  );
  
  const isCommercialService = commercialServices.some(cs => 
    service.toLowerCase().includes(cs.toLowerCase())
  );
  
  return {
    valid: isCommercialService && !hasProblematicKeywords,
    details: {
      isCommercialService,
      hasProblematicKeywords,
      foundKeywords: problematicKeywords.filter(keyword => 
        messageContent.includes(keyword)
      )
    }
  };
}

// Risk score calculation
function calculateRiskScore(errors, warnings) {
  let score = 0;
  
  errors.forEach(error => {
    switch (error.severity) {
      case 'high': score += 10; break;
      case 'medium': score += 5; break;
      case 'low': score += 2; break;
      default: break;
    }
  });
  
  warnings.forEach(warning => {
    score += 1;
  });
  
  return score;
}

// Logging function for monitoring
function logValidationResult(formData, validation, clientIP) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    clientIP: clientIP,
    userAgent: formData.userAgent,
    validation: {
      valid: validation.valid,
      score: validation.score,
      errorCount: validation.errors.length,
      warningCount: validation.warnings.length
    },
    formData: {
      email: formData.email,
      service: formData.service,
      country: formData.country,
      messageLength: formData.message?.length || 0
    },
    errors: validation.errors,
    warnings: validation.warnings
  };
  
  // In production, send to logging service
  console.log('Validation Log:', JSON.stringify(logEntry, null, 2));
  
  return logEntry;
}

// Main handler for Cloudflare Workers
const handler = {
  async fetch(request, env, ctx) {
    // Only handle POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }
    
    try {
      const formData = await request.json();
      const clientIP = request.headers.get('CF-Connecting-IP');
      
      // Validate the submission
      const validation = validateSubmission(formData);
      
      // Log the validation result
      logValidationResult(formData, validation, clientIP);
      
      // Block if validation fails
      if (!validation.valid) {
        return new Response(JSON.stringify({
          success: false,
          message: 'Your submission contains content that doesn\'t align with our commercial financing services.',
          errors: validation.errors.map(e => e.message),
          code: 'VALIDATION_FAILED'
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
      
      // If validation passes, proceed with sending email
      // ... your existing email sending logic here ...
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Message sent successfully'
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
      
    } catch (error) {
      console.error('Server error:', error);
      return new Response(JSON.stringify({
        success: false,
        message: 'Server error occurred'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  }
};

export default handler;