import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-candidate-info',
  templateUrl: './candidate-info.component.html',
  styleUrls: ['./candidate-info.component.scss']
})
export class CandidateInfoComponent {
  @Input() candidate: any;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  ngOnInit(){
    console.log('Hello World',this.candidate);
  }
  
}
