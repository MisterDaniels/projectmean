import { UserService } from './../../users/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  public message: string;

  constructor(private service: UserService) { }

  ngOnInit() { }

  save(user) {
    this.service.create(user).subscribe((response: any) => {
      this.message = response.message;
    });
  }
}
