export const isAdmin = (req, res, next) => {
  if (req.user.userRole !== "Admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

export const isDoctor = (req, res, next) => {
  if (req.user.userRole !== "Doctor") {
    return res.status(403).json({ message: "Doctor access only" });
  }
  next();
};

export const isPatient = (req, res, next) => {
  if (req.user.userRole !== "Patient") {
    return res.status(403).json({ message: "Patient access only" });
  }
  next();
};
