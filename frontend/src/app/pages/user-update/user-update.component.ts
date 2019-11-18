import { UserService } from './../../users/user.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})

export class UserUpdateComponent implements OnInit {
  private id: string;
  public user$: Observable<any>;
  public message: string;

  constructor(private service: UserService, private router: Router, private route: ActivatedRoute) {
    route.params.subscribe(params => {
      console.log(params);
      this.getUser(params.id);
    });
  }

  ngOnInit() { }

  getUser(id) {
    this.id = id;
    this.user$ = this.service.get(id);

    this.user$.subscribe(user => {
      console.table(user);
    });
  }

  save(user) {
    this.service.update(this.id, user).subscribe((response: any) => {
      this.message = response.message;

      setTimeout(() => {
        this.router.navigate(['user-list']);
      }, 5000);
    });
  }
}
