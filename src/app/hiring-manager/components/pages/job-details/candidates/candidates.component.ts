import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CandidateInfoComponent } from '../candidate-info/candidate-info.component';
import { HiringManagerService } from '../../../../service/hiring-manager.service';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [
    CommonModule,
    CandidateInfoComponent,
    ProgressSpinner,
    Toast,
    TooltipModule,
  ],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss',
  providers: [MessageService],
})
export class CandidatesComponent {
  @ViewChild(CandidateInfoComponent)
  candidateInfoComponent!: CandidateInfoComponent;
  activeTab: string = 'Shortlisted'; // Default active tab
  shortlistedCandidates: any = [];
  showHiddenSkills: boolean = false;
  appliedCandidates: any = [];
  jobSucribe: any;
  loaderflag: boolean = true;
  header: any;
  status: any;
  selectedCandidate: any = null;
  jobId: any;
  limitedSkills: string[] = [];
  constructor(
    private hiringManagerService: HiringManagerService,
    private messageService: MessageService,
    private cdRef: ChangeDetectorRef
  ) {
    // this.getShortlisted();
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
    this.getShortlisted();
  }

  getShortlisted() {
    this.loaderflag = true;
    this.jobSucribe = this.hiringManagerService.jobSubscribe.subscribe(
      (res: any) => {
        this.jobId = res.id;
        this.hiringManagerService.getShortlistedJobs(res.id).subscribe(
          (result: any) => {
            if (result.isSuccess) {
              this.shortlistedCandidates = result.result.map(
                (candidate: any) => ({
                  ...candidate,
                  showHiddenSkills: false, // Add hover state for each candidate
                })
              );
            }
          },
          () => {},
          () => {
            this.loaderflag = false;
          }
        );
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

  refreshData() {
    this.loaderflag = true;
    this.hiringManagerService.reloadUpcomeingInterview.next(this.jobId);
    this.hiringManagerService.getShortlistedJobs(this.jobId).subscribe(
      (result: any) => {
        if (result.isSuccess) {
          this.shortlistedCandidates = result.result.map((candidate: any) => ({
            ...candidate,
            showHiddenSkills: false, // Add hover state for each candidate
          }));
        }
      },
      () => {},
      () => {
        this.loaderflag = false;
      }
    );
    this.hiringManagerService
      .getAppliedJobs(this.jobId)
      .subscribe((result: any) => {
        if (result.isSuccess) {
          this.appliedCandidates = result.result;
        }
      });
  }
  openModal(candidate: any) {
    //console.log('dtaa', candidate);
    this.selectedCandidate = candidate;
  }

  closeModal() {
    this.selectedCandidate = null;
  }

  onClose(data: string) {
    this.selectedCandidate = null;
    if (data != '') {
      this.header = data.split('_')[0];
      this.status = parseInt(data.split('_')[1]);
      if (this.status == 1)
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.header,
        });
      else if (this.status == 0)
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.header,
        });
    }
    //console.log(data);
    //if (data != '') this.Modalopen.emit(data);
  }

  isCandidateSelected(candidate: any): boolean {
    this.limitedSkills = candidate.skills.split(',').slice(0, 2);
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
  getHiddenSkillsTooltip(candidate: any): string {
    if (candidate?.skills) {
      return candidate.skills.split(',').slice(2).join(', ');
    }
    return '';
  }
}
