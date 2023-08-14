import db from "../models";

const getDataDoctorHome = (paramLimit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allData = await db.User.findAll({
        limit: paramLimit,
        where: {
          roleid: "R2",
        },
        attributes: { exclude: ["password", "image"] },
        include: [
          {
            model: db.allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve(allData);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getDataDoctorHome,
};
