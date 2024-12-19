let ProfileServicesUrl =
  'https://adani-hiring.southindia.cloudapp.azure.com/adani-hiring-profile-service/api/';
let JobServiceUrl =
  'https://adani-hiring.southindia.cloudapp.azure.com/adani-hiring-job-service/api/JobsServices/';
let SmartServiceUrl =
  'https://adani-hiring.southindia.cloudapp.azure.com/adani-hiring-smart/api/';
let AssessmentServicesUrl =
  'https://adani-hiring.southindia.cloudapp.azure.com/adani-hiring-assessment-service/';

export const GETurl = {
  jobDetails: JobServiceUrl + 'Jobs/',
  appliedjobsByCandidate: JobServiceUrl + 'jobs/appliedjobsByCandidate/',
  jobShortListed: JobServiceUrl + 'jobs/ShortListed/',
  appliedJobs: JobServiceUrl + 'jobs/appliedJobs/',
  upcomingInterview: JobServiceUrl + 'jobs/upcomingInterview/',
  candidateStatus:
    AssessmentServicesUrl + 'ASSESSMENTSERVICE/JOB/CANDIDATE/ASSESSMENTSTATE/',
  getMCQ:
    AssessmentServicesUrl + 'ASSESSMENTSERVICE/ASSESSMENT/JOB/CANDIDATE/GETMCQ',
};

export const POSTurl = {
  hiringmanagerLogin: ProfileServicesUrl + 'LoginServices/login/hiringManager',
  candidateLogin: ProfileServicesUrl + 'LoginServices/login/candidate',
  candidateDetails: ProfileServicesUrl + 'LoginServices/candidate/details',
  createdJob: SmartServiceUrl + 'SmartServices/CreatedJob',
  getJobDescription: SmartServiceUrl + 'SmartServices/GetJobDescription',
  evaluateMCQ: AssessmentServicesUrl + 'ASSESSMENTSERVICE/EvaluateMCQ',
  callProfileUpdateJurney:
    AssessmentServicesUrl + 'ASSESSMENTSERVICE/CallUpdateProfileJourneyStatus',
};
