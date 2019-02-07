import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/auth/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  info: any;
  constructor(private token: TokenStorageService) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      refreshToken: this.token.getRefreshToken(),
      username: this.token.getUsername(),
      // authorities: this.token.getAuthorities()
    };
  }

}
