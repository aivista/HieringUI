let apiBaseUrl = 'http://122.163.121.176:3013/api/';
let jobService = 'http://122.163.121.176:3015/api/JobsServices/';
let jobDetails = 'http://122.163.121.176:3014/api/';
let assessment = 'http://122.163.121.176:3011/';

export const GETurl = {
  jobDetails: jobService + 'Jobs/',
  appliedjobsByCandidate: jobService + 'jobs/appliedjobsByCandidate/',
  jobShortListed: jobService + 'jobs/ShortListed/',
  appliedJobs: jobService + 'jobs/appliedJobs/',
  getJobDescription: jobDetails + 'Job/GetJobDescription',
  upcomingInterview: jobService + 'jobs/upcomingInterview/',
  createdJob: jobDetails + 'Job/CreatedJob',
  candidateStatus:
    assessment + 'ASSESSMENTSERVICE/JOB/CANDIDATE/ASSESSMENTSTATE/',
};

export const POSTurl = {
  hiringmanagerLogin: apiBaseUrl + 'LoginServices/login/hiringManager',
  candidateLogin: apiBaseUrl + 'LoginServices/login/candidate',
  candidateDetails: apiBaseUrl + 'LoginServices/candidate/details',
  CreateJob: apiBaseUrl + 'Job/CreatedJob',
  evaluateMCQ: assessment + 'ASSESSMENTSERVICE/EvaluateMCQ',
};
