import cloudinary from "../config/cloudinary.js";
import getDataUri from "../config/datauri.js";
import Company from "../models/companyModel.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        success: false,
        message: "Company name is required",
      });
    }

    const normalizedName = companyName.toLowerCase();

    let company = await Company.findOne({ name: normalizedName });
    if (company) {
      return res.status(400).json({
        success: false,
        message: "Company already exists",
      });
    }

    company = await Company.create({
      name: normalizedName,
      userId: req.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Company registered successfully",
      company,
    });
  } catch (error) {
    console.error("Register Company Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error registering company",
    });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.userId;

    const companies = await Company.find({ userId });

    if (!companies || companies.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No companies found",
      });
    }

    return res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    console.error("Get Company Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching companies",
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    console.error("Get Company By ID Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching company",
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const companyId = req.params.id;
const file=req.file
const fileUri=getDataUri(file)
const imageUpload = await cloudinary.uploader.upload(fileUri.content)
  const logoUrl =imageUpload.secure_url
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (website) updateData.website = website;
    if (location) updateData.location = location;
if(file) updateData.logo = logoUrl
    const company = await Company.findByIdAndUpdate(
      companyId,
      updateData,
      { returnDocument: 'after' }
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company,
    });
  } catch (error) {
    console.error("Update Company Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating company",
    });
  }
};