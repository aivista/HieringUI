import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { CandidateService } from '../../../../service/candidate.service';
import { ActivatedRoute } from '@angular/router';
import { AvatarService } from '../../../../service/avatar.service';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { QuestionSet } from '../../../../../../environments/QuestionSet';
import { config } from '../../../../../../environments/config';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CircularProgressBar2Component } from '../circular-progress-bar2/circular-progress-bar2.component';

@Component({
  selector: 'app-ai-avatar-interview',
  standalone: true,
  imports: [NgxSpinnerModule, CircularProgressBar2Component],
  templateUrl: './ai-avatar-interview.component.html',
  styleUrl: './ai-avatar-interview.component.scss',
})
export class AiAvatarInterviewComponent {
  @Output() showPopupEvent = new EventEmitter<void>();

  subscriptionKey = config.cogSvcSubKey;
  serviceRegion = config.cogSvcRegion;
  iceUrl = config.iceUrl;
  iceUsername = config.iceUsername;
  iceCredential = config.iceCredential;
  voiceName = config.voiceName;
  avatarCharacter = config.avatarCharacter;
  avatarStyle = config.avatarStyle;
  avatarBackgroundColor = config.avatarBackgroundColor;

  storedCandidateId: any;
  JobId: any;
  candidateId: any;
  summaryOfJobDescription: any;
  role: any;
  fullName: string = '';
  greetingMessage: string = '';

  recognizer!: sdk.SpeechRecognizer;
  isRecognizing = false;
  speechToText!: sdk.SpeechRecognitionResult;
  candidateSpeechToText: any;
  totalTime: number = 1;
  remainingTime: number = 1;

  log: string = '';
  time: number = 0;

  jd: any;

  @ViewChild('connectBtn') cbtn!: ElementRef;
  @ViewChild('disconnectBtn') dbtn!: ElementRef;
  @ViewChild('videoRef') videoRef!: ElementRef;
  @ViewChild('myAvatarAudioEleRef') myAvatarAudioEleRef!: ElementRef;
  @ViewChild('myAvatarVideoEleRef') myAvatarVideoEleRef!: ElementRef;
  @ViewChild('videoDiv') videoDiv!: ElementRef;
  @ViewChild('textArea') textArea!: ElementRef;
  @ViewChild('counter') counter!: ElementRef;
  @ViewChild('seconds') seconds!: ElementRef;

  mediaRecorderRef!: MediaRecorder;
  recordedChunks: Blob[] = [];

  constructor(
    private service: CandidateService,
    private route: ActivatedRoute,
    private _avatarService: AvatarService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    // this.onButtonClick();
    const speechConfigForListening = sdk.SpeechConfig.fromSubscription(
      this.subscriptionKey,
      this.serviceRegion
    );
    speechConfigForListening.speechRecognitionLanguage = 'en-US';
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    this.recognizer = new sdk.SpeechRecognizer(
      speechConfigForListening,
      audioConfig
    );

    // this.storedCandidateId = localStorage.getItem('updateByCandidateId');
    // this.JobId = localStorage.getItem('JobIdByCandidate');

    this.route.queryParamMap.subscribe((params) => {
      this.JobId = params.get('jobId');
      this.candidateId = params.get('candidateId');
    });

    this.JobDescription();
    this.roleAsPerJobDescription();
    this.candidateFullName();
    this.getJobDescription();

    console.log(this.fullName, 'fullName');
  }

  handleName(event: any) {
    console.log(event, 'event');
  }

  getJobDescription = async () => {
    try {
      const response = await this._avatarService.getJobDescription(this.JobId);
      this.jd = response;
    } catch (error) {
      console.log(error);
    }
  };

  JobDescription = async () => {
    try {
      const response = await this._avatarService.summaryOfJobDescription(
        this.JobId
      );
      // this.summaryOfJobDescription = response['res'];
      this.summaryOfJobDescription = response.result;
    } catch (error) {
      console.log(error);
    }
  };

  roleAsPerJobDescription = async () => {
    try {
      const response = await this._avatarService.getRoleFromJobDescription(
        this.JobId
      );
      // this.role = response['res'];
      this.role = response.result;
    } catch (error) {
      console.log(error);
    }
  };

  candidateFullName = async () => {
    try {
      const response = await this._avatarService.candidateProfile(
        this.candidateId
      );
      console.log(response, 'res');

      this.fullName = response.fullName;
    } catch (error) {
      console.log(error);
    }
  };

  async initSession() {
    this.isRecognizing = true;
    return new Promise((resolve, reject) => {
      this.recognizer.recognizeOnceAsync(
        (res: sdk.SpeechRecognitionResult) => {
          this.speechToText = res;
          // this.candidateSpeechToText = res.text;
          this.isRecognizing = false;
          resolve(this.speechToText.text);
        },
        (error: any) => {
          console.log(error);
          this.isRecognizing = false;
        }
      );
    });
  }

  startRecording = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      if (this.videoRef.nativeElement) {
        this.videoRef.nativeElement.srcObject = videoStream;
      }

      // Create a MediaRecorder with the video stream
      this.mediaRecorderRef = new MediaRecorder(videoStream, {
        mimeType: 'video/webm',
      });

      this.recordedChunks = [];

      // Collect video data as it becomes available
      this.mediaRecorderRef.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      // Start recording the video stream
      this.mediaRecorderRef.start();
    } catch (err) {
      console.log('Error accessing camera: ', err);
      alert(err);
    }
  };

  stopRecording = (stamp: number) => {
    if (this.mediaRecorderRef) {
      this.mediaRecorderRef.stop();

      this.mediaRecorderRef.onstop = async () => {
        const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
        await this.uploadVideo(blob, stamp);
        const stream = this.videoRef.nativeElement?.srcObject;
        if (stream)
          stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      };
    }
  };

  uploadVideo = async (videoBlob: Blob, stamp: number) => {
    const formData = new FormData();
    formData.append('video', videoBlob, `${stamp}_Recording.webm`);

    this._avatarService.saveVideo(formData).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  };

  stringModification = (sourceText: string, stringToEliminate: string) => {
    if (sourceText !== null && stringToEliminate !== null) {
      const regex = new RegExp(stringToEliminate, 'g');
      const resultText = sourceText.replace(regex, '');
      return resultText;
    }
    return '';
  };

  createWebRTCConnection = (
    iceServerUrl: string,
    iceServerUsername: string,
    iceServerCredential: string
  ) => {
    var peerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: [iceServerUrl],
          username: iceServerUsername,
          credential: iceServerCredential,
        },
      ],
    });

    return peerConnection;
  };

  createAvatarSynthesizer = () => {
    const speechSynthesisConfig = sdk.SpeechConfig.fromSubscription(
      this.subscriptionKey,
      this.serviceRegion
    );

    speechSynthesisConfig.speechSynthesisVoiceName = this.voiceName;

    const videoFormat = new sdk.AvatarVideoFormat();

    let videoCropTopLeftX = 600;
    let videoCropBottomRightX = 1320;
    videoFormat.setCropRange(
      new sdk.Coordinate(videoCropTopLeftX, 50),
      new sdk.Coordinate(videoCropBottomRightX, 1080)
    );

    const talkingAvatarCharacter = this.avatarCharacter;
    const talkingAvatarStyle = this.avatarStyle;

    const avatarConfig = new sdk.AvatarConfig(
      talkingAvatarCharacter,
      talkingAvatarStyle,
      videoFormat
    );
    avatarConfig.backgroundColor = this.avatarBackgroundColor;
    let avatarSynthesizer = new sdk.AvatarSynthesizer(
      speechSynthesisConfig,
      avatarConfig
    );

    avatarSynthesizer.avatarEventReceived = function (s, e) {
      var offsetMessage =
        ', offset from session start: ' + e.offset / 10000 + 'ms.';
      if (e.offset === 0) {
        offsetMessage = '';
      }
      console.log(
        '[' +
          new Date().toISOString() +
          '] Event received: ' +
          e.description +
          offsetMessage
      );
    };

    return avatarSynthesizer;
  };

  avatarSynthesizer: any;

  handleOnTrack = (event: any) => {
    console.log(event.track.kind);
    if (event.track.kind === 'video') {
      const mediaPlayer = this.myAvatarVideoEleRef.nativeElement;
      mediaPlayer.id = event.track.kind;
      mediaPlayer.srcObject = event.streams[0];
      mediaPlayer.autoplay = true;
      mediaPlayer.playsInline = true;
      mediaPlayer.addEventListener('play', () => {
        window.requestAnimationFrame(() => {});
      });
    } else {
      const audioPlayer = this.myAvatarAudioEleRef.nativeElement;
      audioPlayer.srcObject = event.streams[0];
      audioPlayer.autoplay = true;
      audioPlayer.playsInline = true;
      audioPlayer.muted = true;
    }
  };

  stopSession = (): void => {
    //Stop speaking
    try {
      this.avatarSynthesizer.stopSpeakingAsync().then(() => {
        this.avatarSynthesizer.close();
        this.onButtonClick();
        // window.location.reload();
      });
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  startSession(): void {
    this.cbtn.nativeElement.style.display = 'none';
    this.dbtn.nativeElement.style.display = 'block';
    this.dbtn.nativeElement.disabled = 'true';

    const now = new Date();
    const hours = now.getHours();
    const isAmPm = hours >= 12 ? 'PM' : 'AM';

    if (isAmPm === 'PM') {
      this.greetingMessage = 'Good Afternoon ' + this.fullName;
    } else {
      this.greetingMessage = 'Good Morning ' + this.fullName;
    }

    this.log = '';
    // this.spinner.show();

    let peerConnection = this.createWebRTCConnection(
      this.iceUrl,
      this.iceUsername,
      this.iceCredential
    );
    console.log('Peer connection ', peerConnection);
    peerConnection.ontrack = this.handleOnTrack;
    peerConnection.addTransceiver('video', { direction: 'sendrecv' });
    peerConnection.addTransceiver('audio', { direction: 'sendrecv' });

    let avatarSynthesizer = this.createAvatarSynthesizer();
    this.avatarSynthesizer = avatarSynthesizer;

    peerConnection.oniceconnectionstatechange = async (e) => {
      console.log('WebRTC status: ' + peerConnection.iceConnectionState);

      if (peerConnection.iceConnectionState === 'connected') {
        const audioPlayer = this.myAvatarAudioEleRef.nativeElement;
        audioPlayer.muted = false;
        let cars = QuestionSet['DE']['questions'];
        const time = QuestionSet['DE']['time'];
        const contextual = QuestionSet['DE']['contextual'];
        const contextType = QuestionSet['DE']['contextType'];

        let name = '';
        let count = 0;
        let answers = [];
        let cheatingCount = 0;
        let qStart = 0;

        // this.spinner.hide();

        await this.startRecording();

        await avatarSynthesizer.speakTextAsync(this.greetingMessage);

        this.log = this.greetingMessage;

        await avatarSynthesizer.speakTextAsync(this.summaryOfJobDescription);

        this.log = this.summaryOfJobDescription;

        let firstTime = 20;

        this.seconds.nativeElement.innerHTML = `${firstTime}`;
        this.counter.nativeElement.style.visibility = 'visible';

        let firstInterval = setInterval(() => {
          firstTime = Math.max(0, firstTime - 1);
          this.seconds.nativeElement.innerHTML = `${firstTime}`;
        }, 1000);

        await avatarSynthesizer.speakTextAsync(
          `What aspect of this ${this.role} are most intriguing to you?`
        );

        this.log = `Avatar : What aspect of this ${this.role} are most intriguing to you?`;

        const speech = await this.initSession();

        const response = await this._avatarService.speak(
          speech,
          false,
          false,
          this.jd,
          false
        );

        this.log = `you: ${response.result['key']}`;

        clearInterval(firstInterval);

        console.log('Media Recorder Started');
        for (let i = 0; i < cars.length; ) {
          this.videoDiv.nativeElement.style.backgroundImage = 'none';

          qStart = Date.now();
          await avatarSynthesizer.speakTextAsync(cars[i]);
          answers.push({
            user: 'avatar',
            text: cars[i],
            start_timestamp: qStart,
            type: 'question',
          });

          // this.log = `${this.log}Question :- ${cars[i]}\n`;
          this.log = `Avatar : ${cars[i]}`;

          // this.textArea.nativeElement.value = this.log;

          let text = this.textArea.nativeElement;
          if (text.selectionStart == text.selectionEnd) {
            text.scrollTop = text.scrollHeight;
          }

          this.time = time[i];
          this.seconds.nativeElement.innerHTML = `${this.time}`;
          qStart = Date.now();
          this.counter.nativeElement.style.visibility = 'visible';

          let interval = setInterval(() => {
            this.time = Math.max(0, this.time - 1);
            this.seconds.nativeElement.innerHTML = `${this.time}`;
          }, 1000);

          let json: any;
          let coreSkillQuestion: boolean = false;
          let isItCandidateQuestion: boolean = false;

          cars[i] === 'Can you please tell me some of core skills?'
            ? (coreSkillQuestion = true)
            : (coreSkillQuestion = false);
          cars[i] === 'Do you have any questions for me?'
            ? (isItCandidateQuestion = true)
            : (isItCandidateQuestion = false);

          const speech = await this.initSession();

          const response = await this._avatarService.speak(
            speech,
            contextual[i],
            coreSkillQuestion,
            this.jd,
            isItCandidateQuestion
          );

          json = response.result;
          console.log('r:', response);

          console.log(json);

          clearInterval(interval);

          json['key'] &&
            answers.push({
              user: 'candidate',
              text: json['key'],
              start_timestamp: qStart,
              type: 'answer',
            });

          // if (json['notification'] === 'cheating') {

          //     qStart=Date.now();
          //     await avatarSynthesizer.speakTextAsync('You are doing cheating! Please do not do that otherwise I have to cancel this meeting');
          //     answers.push({
          //         "user":"avatar",
          //         "text": "You are doing cheating! Please do not do that otherwise I have to cancel this meeting",
          //         "start_timestamp": qStart,
          //         "type":"warning"
          //     });

          //     cheatingCount++;
          // }

          if (i == 0 && json['key'] === '') {
            qStart = Date.now();
            await avatarSynthesizer.speakTextAsync(
              `Sorry! I didn't get your name, Please Repeat`
            );
            answers.push({
              user: 'avatar',
              text: "Sorry! I didn't get your name, Please Repeat",
              start_timestamp: qStart,
              type: 'repeat',
            });

            this.log = `Avatar : ${`Sorry! I didn't get your name, Please Repeat`}`;

            i = 0;

            count++;

            if (count === 3) {
              break;
            }
          } else if (json['notification'] === 'mistake') {
            let prevAnswer: any = answers.pop();
            prevAnswer['type'] = 'mistake';
            answers.push(prevAnswer);

            this.counter.nativeElement.style.visibility = 'hidden';
            this.log = `You mistakenly said : ${json['key']}`;

            qStart = Date.now();
            await avatarSynthesizer.speakTextAsync(
              'Okay, let me ask the same question again!'
            );
            answers.push({
              user: 'avatar',
              text: 'Okay, let me ask the same question again!',
              start_timestamp: qStart,
              type: 'repeat',
            });
            this.log = `Avatar : Okay, let me ask the same question again!`;
          } else {
            if (json['key']?.includes('Yeah! I have understood')) {
              json['key'] = this.stringModification(
                json['key'],
                'Yeah! I have understood'
              );
            }

            if (i == 0) {
              name = json['key'];
            }

            this.log = `You : ${json['key']}`;
            this.counter.nativeElement.style.visibility = 'hidden';

            if (contextual[i]) {
              if (contextType[i] === 'A') {
                await avatarSynthesizer.speakTextAsync(json['res']);
                this.log = `Avatar : ${json['res']}`;
              } else {
                cars.splice(i + 1, 0, json['res']);
                time.splice(i + 1, 0, time[i]);
                contextual.splice(i + 1, 0, false);
                contextType.splice(i + 1, 0, 'NA');
              }
            }

            i++;
          }

          if (cheatingCount >= 3) {
            qStart = Date.now();
            await avatarSynthesizer.speakTextAsync(
              'You are doing cheating! We have to cancel this meeting'
            );
            answers.push({
              user: 'avatar',
              text: 'You are doing cheating! We have to cancel this meeting',
              start_timestamp: qStart,
              type: 'cancel',
            });
            break;
          }
        }

        qStart = Date.now();

        this.time = 0;
        this.stopRecording(qStart);

        this.dbtn.nativeElement.disabled = false;
        this.dbtn.nativeElement.onclick = this.stopSession;

        const results: any = {
          DE: answers,
        };

        const payload = {
          filename: `${qStart}_Result.json`,
          content: JSON.stringify(results),
        };

        this._avatarService.saveFile(payload).subscribe({
          next: (response: any) => {
            console.log(response);
          },
          error: (err: any) => {
            console.log(err);
          },
        });

        console.log('Connected to Azure Avatar service');
      }

      if (
        peerConnection.iceConnectionState === 'disconnected' ||
        peerConnection.iceConnectionState === 'failed'
      ) {
        console.log('Azure Avatar service Disconnected');
      }
    };

    avatarSynthesizer
      .startAvatarAsync(peerConnection)
      .then((r) => {
        console.log('[' + new Date().toISOString() + '] Avatar started.');
        console.log('WebRTC status: ' + peerConnection.iceConnectionState);
        console.log(r['privErrorDetails']);
      })
      .catch((error) => {
        console.log(
          '[' +
            new Date().toISOString() +
            '] Avatar failed to start. Error: ' +
            error
        );
        console.log(avatarSynthesizer.properties);
        // this.spinner.hide();
        this.cbtn.nativeElement.style.display = 'block';
        this.dbtn.nativeElement.style.display = 'none';
        alert('Avatar Failed to Start. Try Again!');
      });
  }

  // Emit event to show popup
  onButtonClick(): void {
    var josnObject = {
      jobId: this.JobId,
      candidateId: this.candidateId,
      profileJourney: 'AI_SCREENING',
      status: 'COMPLETED',
    };
    this.service
      .UpdateProfileUpdateStatus(josnObject)
      .subscribe((data: any) => {
        console.log('1st interview done');
      });

    this.showPopupEvent.emit();
  }
}
