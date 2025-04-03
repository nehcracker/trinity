const requestStore = new Map();

const emailRateLimiter = async (c, next) => {
  const ip = c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || c.req.raw.ip;
  const data = await c.req.json();
  const { email } = data
  
  if (!email) {
    return c.json({
      success: false,
      message: 'Email is required'
    }, 400);
  }

  const key = `${ip}-${email}`;
  const now = Date.now();
  const windowMs = 30 * 60 * 1000; 
  const maxRequests = 3;

  for (const [k, entry] of requestStore.entries()) {
    if (now - entry.timestamp > windowMs) {
      requestStore.delete(k);
    }
  }

  const existingEntry = requestStore.get(key);
  if (existingEntry && existingEntry.count >= maxRequests) {
    return c.json({
      success: false,
      message: 'Too many email requests. Please try again later.'
    }, 429);
  }

  if (existingEntry) {
    existingEntry.count += 1;
    existingEntry.timestamp = now;
  } else {
    requestStore.set(key, {
      count: 1,
      timestamp: now
    });
  }

  await next();
};

module.exports = emailRateLimiter;
