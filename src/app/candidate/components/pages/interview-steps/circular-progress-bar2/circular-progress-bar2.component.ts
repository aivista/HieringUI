import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circular-progress-bar2',
  standalone: true,
  imports: [],
  templateUrl: './circular-progress-bar2.component.html',
  styleUrl: './circular-progress-bar2.component.scss',
})
export class CircularProgressBar2Component implements OnInit {
  constructor() {}
  @Input() totalTime: number = 10; // Now in minutes
  @Input() remainingTime: number = 10; // Now in minutes

  circumference = 2 * Math.PI * 16;
  dashOffset = 0;

  ngOnInit() {
    this.totalTime = this.totalTime * 60;
    this.remainingTime = this.remainingTime * 60;
    this.updateProgress();
    this.startCountdown();
  }

  updateProgress() {
    const progress = this.remainingTime / this.totalTime;
    this.dashOffset = this.circumference * progress;
  }

  startCountdown() {
    const interval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
        this.updateProgress();
      } else {
        clearInterval(interval);
        // this.timerService.notifyTimerEnd();
      }
    }, 1000);
  }

  get formattedRemainingTime(): string {
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.remainingTime % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
