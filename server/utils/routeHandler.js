const routeHandler = (fun) => {
  return (req, res, next) => {
    return Promise.resolve(fun(req,res,next)).catch(next);
  };
};
module.exports= routeHandler;
