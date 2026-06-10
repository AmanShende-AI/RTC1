import Application from "../models/applicationModel.js"
import Job from "../models/jobModel.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.userId;
    const { id: jobId } = req.params;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required",
      });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      success: true,
      message: "Applied successfully",
      application: newApplication,
    });
  } catch (error) {
    console.error("Apply Job Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error applying for job",
    });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.userId;

    const application = await Application.find({ applicant: userId })
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      })
      .sort({ createdAt: -1 });

    if (!application || application.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No applications found",
      });
    }

    return res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error("Get Applications Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching applications",
    });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

  const job = await Job.findById(jobId).populate({
  path: "applications",
  options: { sort: { createdAt: -1 } },
  populate: {
    path: "applicant",
    select: "fullName email phoneNumber profile",
  },
});



    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({success:true,
  applications: job.applications, 
});
  } catch (error) {
    console.error("Get Applicants Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching applicants",
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
      application,
    });
  } catch (error) {
    console.error("Update Status Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating status",
    });
  }
};