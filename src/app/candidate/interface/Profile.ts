export interface Profile {
  name: string;
  fname: string | undefined;
  lname: string | undefined;
  mname: string | undefined;
  imageUrl: string;
  certifications: string[];
  email: string;
  phone: string;
  location: string;
  latestExperience: {
    company: string;
    employmentType: string;
    period: string;
    location: string;
    position: string;
  };
  latestEducation: {
    university: string;
    degree: string;
    major: string;
    period: string;
    activities: string;
  };
  certificationsAndTraining: string[]; // Or a more detailed structure if needed
}
