import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CongratulationComponent } from '../interview-steps/congratulation/congratulation.component';
import { CandidateService } from '../../../service/candidate.service';

@Component({
  standalone: true,
  imports: [CommonModule, CongratulationComponent],
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss'],
})
export class AssessmentComponent {
  constructor(
    private router: Router,
    private questionsService: CandidateService
  ) {}
  // State variables
  testStarted: boolean = false;
  currentQuestionIndex: number = 0;
  selectedAnswers: number[] = [];
  questions: any;
  ngOnInit() {
    this.fetchQuestions(1, 1, 1);
  }
  // Sample Questions Array
  // questions = [
  //   {
  //     question:
  //       'Guy Bailey, Roy Hackett and Paul Stephenson made history in 1963, as part of a protest against a bus company that refused to employ black and Asian drivers in which UK city?',
  //     options: ['London', 'Edinburgh', 'Liverpool', 'Canary Wharf'],
  //   },
  //   {
  //     question:
  //       'The Dandi March, led by Mahatma Gandhi in 1930, was an act of civil disobedience against the British-imposed salt tax. This 24-day journey began in Sabarmati Ashram and ended in which coastal village where Gandhi symbolically broke the salt law?',
  //     options: ['Dandi', 'Porbandar', 'Surat', 'Bhavnagar'],
  //   },
  //   {
  //     question:
  //       'The Jallianwala Bagh Massacre took place on April 13, 1919, when General Dyer ordered British troops to fire on a peaceful gathering of Indians in Amritsar. What was the occasion for this large public gathering in the park?',
  //     options: [
  //       'Baisakhi Festival',
  //       'Quit India Meeting',
  //       'Non-Cooperation Movement Rally',
  //       "Gandhi's Speech on Civil Disobedience",
  //     ],
  //   },
  //   {
  //     question:
  //       'Subhas Chandra Bose formed the Azad Hind Fauj (Indian National Army) to fight against British rule during World War II. From which country did Bose famously give the slogan "Give me blood, and I will give you freedom"?',
  //     options: ['Japan', 'Germany', 'Singapore', 'Burma'],
  //   },
  //   {
  //     question:
  //       'The Simon Commission, appointed by the British Government in 1927 to review constitutional reforms in India, faced strong opposition from Indians because of a particular reason. Why did Indian leaders oppose the Simon Commission?',
  //     options: [
  //       'It included no Indian members',
  //       'It proposed partitioning provinces',
  //       'It increased land taxes',
  //       'It banned Indian political parties',
  //     ],
  //   },
  // ];

  fetchQuestions(aid: number, jobId: number, cid: number) {
    this.questionsService.getJobQuestions(aid, jobId, cid).subscribe(
      (questions: any) => {
        this.questions = questions.result;
        console.log(this.questions);
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
  selectOption(optionIndex: number): void {
    this.selectedAnswers[this.currentQuestionIndex] = optionIndex;
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
    this.isPopupVisible = true;
    // Add submission logic here
  }

  isPopupVisible: boolean = false;

  // Function to hide popup
  closePopup(): void {
    this.isPopupVisible = false;
    this.router.navigate(['/candidate/profile']);
  }
}
