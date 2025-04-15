import Funding from "../models/funding.model.js";

export const createFunding = async (req, res) => {
  try {
    const {
      type,
      title,
      description,
      link,
      eligibilityCriteria,
      applyDate,
      applicationDeadline,
      professor,
      university,
      department,
    } = req.body;

    let fundingData = {
      type,
      title,
      description,
      link,
      eligibilityCriteria,
      applyDate,
      applicationDeadline,
      university,
      department,
      professor,
    };

    const funding = new Funding(fundingData);
    await funding.save();
    res.status(201).json(funding);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error creating funding", message: error.message });
  }
};

export const getAllFunding = async (req, res) => {
  try {
    const fundingList = await Funding.find().populate("professor");
    res.status(200).json(fundingList);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching funding", message: error.message });
  }
};

export const getFundingById = async (req, res) => {
  try {
    const funding = await Funding.findById(req.params.id).populate("professor");
    if (!funding) {
      return res.status(404).json({ error: "Funding not found" });
    }
    res.status(200).json(funding);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching funding", message: error.message });
  }
};

export const updateFundingById = async (req, res) => {
  try {
    const {
      type,
      title,
      description,
      link,
      eligibilityCriteria,
      applyDate,
      applicationDeadline,
      professor,
      university,
      department,
    } = req.body;

    let fundingData = {
      type,
      title,
      description,
      link,
      eligibilityCriteria,
      applyDate,
      applicationDeadline,
    };

    if (professor) {
      fundingData.professor = professor;
    } else {
      fundingData.university = university;
      fundingData.department = department;
    }

    const updatedFunding = await Funding.findByIdAndUpdate(
      req.params.id,
      fundingData,
      { new: true }
    );
    if (!updatedFunding) {
      return res.status(404).json({ error: "Funding not found" });
    }
    res.status(200).json(updatedFunding);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error updating funding", message: error.message });
  }
};

export const deleteFundingById = async (req, res) => {
  const id = req.params.id;

  try {
    const funding = await Funding.findByIdAndDelete(id);

    if (!funding) {
      return res.status(404).json({ message: "Funding not found" });
    }

    res.status(200).json({ message: "Funding deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting funding", error: error.message });
  }
};
