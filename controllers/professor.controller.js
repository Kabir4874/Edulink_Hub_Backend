import Professor from "../models/professor.model.js";

export const createProfessor = async (req, res) => {
  try {
    const {
      name,
      university,
      department,
      researchInterests,
      contactInfo,
      availability,
      profileLink,
    } = req.body;

    const newProfessor = new Professor({
      name,
      university,
      department,
      researchInterests,
      contactInfo,
      availability,
      profileLink,
    });

    await newProfessor.save();
    res.status(201).json(newProfessor);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating professor", error: error.message });
  }
};

export const getAllProfessors = async (req, res) => {
  try {
    const professors = await Professor.find();
    res.status(200).json(professors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching professors", error: error.message });
  }
};

export const getProfessorById = async (req, res) => {
  try {
    const professor = await Professor.findById(req.params.id);
    if (!professor) {
      return res.status(404).json({ message: "Professor not found" });
    }
    res.status(200).json(professor);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching professor", error: error.message });
  }
};

export const updateProfessorById = async (req, res) => {
  try {
    const {
      name,
      university,
      department,
      researchInterests,
      contactInfo,
      availability,
      profileLink,
    } = req.body;

    const updatedProfessor = await Professor.findByIdAndUpdate(
      req.params.id,
      {
        name,
        university,
        department,
        researchInterests,
        contactInfo,
        availability,
        profileLink,
      },
      { new: true }
    );

    if (!updatedProfessor) {
      return res.status(404).json({ message: "Professor not found" });
    }

    res.status(200).json(updatedProfessor);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating professor", error: error.message });
  }
};

export const deleteProfessorById = async (req, res) => {
  try {
    const professor = await Professor.findByIdAndDelete(req.params.id);
    if (!professor) {
      return res.status(404).json({ message: "Professor not found" });
    }
    res.status(200).json({ message: "Professor deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting professor", error: error.message });
  }
};
