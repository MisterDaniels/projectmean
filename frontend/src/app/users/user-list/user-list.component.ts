import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  @Input() users;
  @Output() update = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }
  edit(user) { this.update.emit(user); }
  delete(user) { this.remove.emit(user); }
}
