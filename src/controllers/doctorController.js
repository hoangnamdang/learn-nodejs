import doctorServices from "../services/doctorService";

const getDataDoctorHome = async (req, res) => {
  try {
    let limit = req.params.limit;
    if (limit) {
      limit = 10;
    }
    const data = await doctorServices.getDataDoctorHome(limit);
    res.status(200).json({ errCode: 0, message: "Ok", listDoctor: data || [] });
  } catch (error) {
    res.status(200).json({ errCode: 1, message: "error" });
  }
};

module.exports = {
  getDataDoctorHome,
};
