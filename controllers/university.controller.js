import University from "../models/university.model.js";

export const createUniversity = async (req, res) => {
  try {
    const {
      name,
      location,
      programType,
      discipline,
      admissionLink,
      applicationDate,
      applicationDeadline,
      admitCardDownloadDate,
      examUnits,
      imageUrl,
    } = req.body;

    const existingUniversity = await University.findOne({ name });

    if (existingUniversity) {
      return res.status(400).json({
        success: false,
        message: "A university with this name already exists.",
      });
    }

    const newUniversity = new University({
      name,
      location,
      programType,
      discipline,
      admissionLink,
      applicationDate,
      applicationDeadline,
      admitCardDownloadDate,
      examUnits,
      imageUrl,
    });

    await newUniversity.save();

    return res.status(201).json({
      success: true,
      message: "University created successfully.",
      university: newUniversity,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

export const getUniversityById = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);

    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found.",
      });
    }

    return res.status(200).json({
      success: true,
      university,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

export const getAllUniversities = async (req, res) => {
  try {
    const universities = await University.find();

    return res.status(200).json({
      success: true,
      universities,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

export const updateUniversity = async (req, res) => {
  try {
    const university = await University.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "University updated successfully.",
      university,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

export const deleteUniversity = async (req, res) => {
  try {
    const university = await University.findByIdAndDelete(req.params.id);

    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "University deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};
