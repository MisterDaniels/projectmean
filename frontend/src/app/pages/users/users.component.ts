import { UserService } from './../../users/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  public pageUsers: Observable<any>;

  constructor(private service: UserService, public router: Router) { }

  ngOnInit() {
    this.pageUsers = this.service.list();

    this.pageUsers.subscribe(response => {
      console.table(response);
    });
  }

  update(user) { this.router.navigate(['user-update', user._id]); }

  remove(user) {
    this.service.remove(user._id).subscribe(response => {
      this.pageUsers = this.service.list();
    })
  }

}
