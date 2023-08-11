import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
import { UserService } from '../user.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  messagesRef: AngularFireList<any>;
  messagesSentRef: AngularFireList<any> | undefined;
  messages: Observable<any[]>;
  messagesSent: Observable<any[]>;
  newMessage: string = '';
  userId: string;
  currentId:any;
  currentUser:any;
  ourConvers:any;
  user:any;
  currentUser1:any

  constructor(private userService:UserService,private afDb: AngularFireDatabase,private route:ActivatedRoute) {
    this.currentId = this.userService.getUserId();
    this.userId = this.route.snapshot.params['id']; //other id
    
    this.userService.getProfileById(this.currentId).subscribe(res => {
      this.currentUser = res
    })

    this.messagesSentRef = this.afDb.list(`/users/${this.userId}/sent`);
    this.messagesSent = this.messagesSentRef.valueChanges();

    this.messagesRef = this.afDb.list(`/messages`);
    this.messages = this.messagesRef.valueChanges();
  }
  ngOnInit(): void {
    this.currentId = this.userService.getUserId(); // our id
    this.userService.getProfileById(this.userId).subscribe((res) => {
      this.user = res;
  
      const currentUserToSelectedUserMessages = this.afDb
        .list('/messages', (ref) =>
          ref
            .orderByChild('sendTo')
            .equalTo(this.user.email)
            .equalTo('senderId', this.currentId)
            .limitToLast(50)
        ).valueChanges();
  
      const selectedUserToCurrentUserMessages = this.afDb
        .list('/messages', (ref) =>
          ref
            .orderByChild('sendTo')
            .equalTo(this.user.email)
            .equalTo('senderId', this.currentId)
            .limitToLast(50)
        ).valueChanges();
  
      this.messages = combineLatest([currentUserToSelectedUserMessages, selectedUserToCurrentUserMessages])
        .pipe(
          map(([messages1, messages2]) => [...messages1, ...messages2])
        );
    });
  this.messages.subscribe(res => {  
    this.ourConvers = res     
    })
    
  }
  currentMessages(allMessages:any):any{
    let messagesToShow = [];
    for (const message of allMessages) {
      if(this.currentUser?.email === message.sender && this.user?.email === message.sendTo){ 
        messagesToShow.push(message) 
     }
    }
    
    return messagesToShow
    
  }
  sendMessage() {
    this.currentId = this.userService.getUserId();
    this.userService.getProfileById(this.currentId).subscribe((res) => {
      if (this.newMessage.trim() !== '') {
        const newMessage = {
          sendTo: this.user.email,
          senderId: this.currentId,
          sender: res.email,
          content: this.newMessage,
          timestamp: Date.now(),
        };
        this.messagesRef.push(newMessage); 
        this.messagesSentRef?.push(newMessage);
  
        // Update the message to be sent to the selected user's sent messages
        const selectedUserMessagesSentRef = this.afDb.list(`/users/${this.userId}/sent`);
        selectedUserMessagesSentRef?.push({
          sendTo: res.email,
          senderId: this.currentId,
          sender: res.email,
          content: this.newMessage,
          timestamp: Date.now(),
        });
  
        this.newMessage = '';
      }
    });
  }
}