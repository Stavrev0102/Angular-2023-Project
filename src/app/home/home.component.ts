import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Sponsor } from '../types/sponsor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
 
 constructor(private http:HttpClient) {}
  sponsors:Sponsor[] = [];

ngOnInit(): void {
  this.getSponsors().subscribe(res => {
    this.sponsors = Object.values(res) 
  });
}
getSponsors():Observable<Sponsor[]>{
  const { appUrl } = environment;

  return this.http.get<Sponsor[]>(`${appUrl}/sponsors.json`)
}


}
