const NetAnalysis = require("../models/netAnalysis");

const completeTest = async (req, res) => {
  try {
    const { pregunta1, pregunta2 } = req.body;
    const netAnalysis = new NetAnalysis({ pregunta1, pregunta2 });
    const createdAnswers = await netAnalysis.save();
    return res.status(200).json({
      msg: "Datos almacenados en MongoDB",
      answer: createdAnswers._id,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error al almacenar datos",
      success: false,
    });
  }
};

module.exports = {
  completeTest: completeTest,
};
