import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment";
import { UserService } from "../user.service";

@Component({
  selector: "app-chats",
  templateUrl: "./chats.component.html",
  styleUrls: ["./chats.component.css"],
})
export class ChatsComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = "";
  userId: any;
  currentId:any;

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase,
    private activatedRoute: ActivatedRoute,
    private userService:UserService
  ) {}
  ngOnInit(): void {
    const { appUrl } = environment;
    this.userId = this.activatedRoute.snapshot.params["id"];

    this.http
      .get(`${appUrl}/users/${this.userId}/messages.json`)
      .subscribe((res) => {
      this.messages = (Object.values(res));
      });
  }

  sendMessage() {
    const { appUrl } = environment;
    this.currentId = this.userService.getUserId()
    console.log(this.newMessage);
    const data = {
      currentUserId:this.currentId,
      message:this.newMessage
    }
    
    this.http.post(`${appUrl}/users/${this.userId}/messages.json`,data).subscribe((res) => {})
    this.newMessage = "";
  }
}
