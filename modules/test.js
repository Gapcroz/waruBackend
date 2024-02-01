const NetAnalysis = require("../models/netAnalysis");

const completeTest = async (req, res) => {
  try {
    const { pregunta1, pregunta2 } = req.body;
    const netAnalysis = new NetAnalysis({ pregunta1, pregunta2 });
    const createdAnswers = await netAnalysis.save();
    return res.status(200).json({
      msg: "data stored in MongoDB",
      answer: createdAnswers._id,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error storing data",
      success: false,
    });
  }
};

const autoDiagnostic = async (req, res) => {
  try {
    const answers = await NetAnalysis.find();
    res.send(answers);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  completeTest: completeTest,
  autoDiagnostic: autoDiagnostic,
};
