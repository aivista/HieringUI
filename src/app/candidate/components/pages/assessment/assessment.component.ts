import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CongratulationComponent } from '../interview-steps/congratulation/congratulation.component';
import { CandidateService } from '../../../service/candidate.service';
import {
  ApiResponse,
  Question,
  QuestionResponse,
} from '../../../../interfaces/interface';

@Component({
  standalone: true,
  imports: [CommonModule, CongratulationComponent],
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss'],
})
export class AssessmentComponent {
  button_value: any;
  constructor(
    private router: Router,
    private questionsService: CandidateService,
    private route: ActivatedRoute
  ) {}
  // State variables
  testStarted: boolean = false;
  currentQuestionIndex: number = 0;
  candidateId: number = 0;
  jobId: number = 0;
  selectedAnswers: any[] = [];
  questions: Question[] = [];

  ngOnInit() {
    this.button_value = localStorage.getItem('button_value');
    this.route.queryParams.subscribe((params) => {
      this.candidateId = params['candidateId'];
      this.jobId = params['jobId'];
      const assid = 1;

      // const assid = this.questionsService.getData('assessmentId');
      this.fetchQuestions(assid, this.jobId, this.candidateId);
    });
  }
  // Sample Questions Array

  fetchQuestions(aid: number, jobId: number, cid: number) {
    this.questionsService.getJobQuestions(aid, jobId, cid).subscribe(
      (questions) => {
        // this.questions = questions.result;

        this.questions = questions.result.map((item: QuestionResponse) => ({
          question: item.question,
          id: item.id,
          // correctOption:item.correctOption,
          options: [item.option1, item.option2, item.option3, item.option4],
        }));

        this.selectedAnswers = this.questions.map((q: any) => ({
          id: q.id,
          selectedOption: null,
        }));
        console.log(' this.questions', this.questions);
      },
      (error) => {
        // Handle errors
        console.error('Error fetching questions:', error);
      }
    );
  }
  // Start the Test
  startTest(): void {
    this.testStarted = true;
  }

  // Handle Option Selection
  selectOption(questionIndex: number, option: string): void {
    this.selectedAnswers[questionIndex].selectedOption = option;
    console.log('Selected Answers:', this.selectedAnswers);
  }

  // Go to Next Question
  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  // Go to Previous Question
  prevQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  // Submit Test
  submitTest(): void {
    console.log('Selected Answers:', this.selectedAnswers);
    const jsonBody = {
      jobId: this.jobId,
      candidateId: this.candidateId,
      assessmentId: 1,
      data: this.selectedAnswers,
    };
    this.questionsService.evaluateMcq(jsonBody).subscribe((res: any) => {
      if (res.isSuccess) {
        this.isPopupVisible = true;
      }
    });

    // Add submission logic here
  }

  isPopupVisible: boolean = false;

  // Function to hide popup
  closePopup(): void {
    this.isPopupVisible = false;
    this.router.navigate(['/candidate/profile']);
  }
}
