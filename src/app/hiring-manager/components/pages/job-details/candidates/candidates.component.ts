import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CandidateInfoComponent } from '../candidate-info/candidate-info.component';
import { HiringManagerService } from '../../../../service/hiring-manager.service';

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [CommonModule, CandidateInfoComponent],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss',
})
export class CandidatesComponent {
  @ViewChild(CandidateInfoComponent)
  candidateInfoComponent!: CandidateInfoComponent;

  activeTab: string = 'Shortlisted'; // Default active tab
  // shortlistedCandidates = [
  //   {
  //     name: 'John Doe',
  //     rating: 4.5,
  //     status: 'Interview Scheduled',
  //     experience: '5 years of experience',
  //     skills: ['Angular', 'TypeScript', 'SCSS'],
  //   },
  //   {
  //     name: 'Jane Smith',
  //     rating: 4.8,
  //     status: 'Interview Complited',
  //     experience: '3 years of experience',
  //     skills: ['React', 'JavaScript', 'CSS'],
  //   },
  //   {
  //     name: 'John Doe',
  //     rating: 4.5,
  //     status: 'AI Based Screening Pending',
  //     experience: '5 years of experience',
  //     skills: ['Angular', 'TypeScript', 'SCSS'],
  //   },
  //   {
  //     name: 'Jane Smith',
  //     rating: 4.8,
  //     status: 'Selected',
  //     experience: '3 years of experience',
  //     skills: ['React', 'JavaScript', 'CSS'],
  //   },
  // ];
  shortlistedCandidates: any = [];
  showHiddenSkills: boolean = false;

  appliedCandidates: any = [];
  jobSucribe: any;
  constructor(
    private hiringManagerService: HiringManagerService,
    private cdRef: ChangeDetectorRef
  ) {
    this.getShortlisted();
  }
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  getStatusClass(status: string): string {
    switch (status) {
      case 'Interview Scheduled':
        return 'status-interview-scheduled';
      case 'Interview Complited':
        return 'status-interview-completed';
      case 'AI Based Screening Pending':
        return 'status-ai-screening-pending';
      case 'Selected':
        return 'status-selected';
      default:
        return '';
    }
  }
  ngOnInit() {
    // this.hiringManagerService.trigerApproved.subscribe((res:any)=>{
    //   if(res){
    //     this.getShortlisted()
    //   }
    // })
  }

  getShortlisted() {
    this.jobSucribe = this.hiringManagerService.jobSubscribe.subscribe(
      (res: any) => {
        this.hiringManagerService
          .getShortlistedJobs(res.id)
          .subscribe((result: any) => {
            if (result.isSuccess) {
              this.shortlistedCandidates = result.result.map(
                (candidate: any) => ({
                  ...candidate,
                  showHiddenSkills: false, // Add hover state for each candidate
                })
              );
            }
          });
        this.hiringManagerService
          .getAppliedJobs(res.id)
          .subscribe((result: any) => {
            if (result.isSuccess) {
              this.appliedCandidates = result.result;
            }
          });
      }
    );
  }
  selectedCandidate: any = null;

  openModal(candidate: any) {
    console.log('dtaa', candidate);
    this.selectedCandidate = candidate;
  }

  closeModal() {
    this.selectedCandidate = null;
  }

  onClose() {
    this.selectedCandidate = null;
  }

  isCandidateSelected(candidate: any): boolean {
    return this.selectedCandidate === candidate;
  }

  closeModall(event: Event): void {
    this.selectedCandidate = null; // Closes the modal
  }

  ngOnDestroy() {
    if (this.jobSucribe) {
      this.jobSucribe.unsubscribe();
    }
  }

  @Input() skills: string = ''; // Assuming `skills` is a comma-separated string
  displayedSkills: string[] = [];
  remainingSkills: string[] = [];
  showRemaining = false;

  ngOnChanges(changes: SimpleChanges): void {
    const skillsArray = this.skills ? this.skills.split(',') : [];
    this.displayedSkills = skillsArray.slice(0, 3); // Show the first three
    this.remainingSkills = skillsArray.slice(3); // Rest of the skills
  }
}
