const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation Error',
        details: err.errors 
      });
    }
  
    res.status(500).json({ error: 'Internal Server Error' });
  };
  
  const notFound = (req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
  };
  
  export { errorHandler, notFound };