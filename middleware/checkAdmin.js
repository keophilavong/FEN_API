module.exports.isAdmin = (req, res, next) => {
    const { role } = req.user;
  
    if (role === 'admin') {
      next();
    } else {
      return res.status(403).json({
        error: {
          message: 'ທ່ານບໍ່ມີສິດເຂົ້າໜ້ານີ້ ສະເພາະຜູ້ດູແລລະບົບເທົ່ານັ້ນ',
        },
      });
    }
};
  