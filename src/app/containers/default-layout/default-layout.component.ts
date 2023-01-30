import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { navItems } from '../../_nav';
import { AuthenticationService } from '../../_services/authentication.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  public currentUser: any = {};

  profile_image = 'assets/img/avatars/profile.png'

  constructor(
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.currentUser = this.authService.currentUserDetails.value;
    //console.log(this.currentUser)
    if(this.currentUser.image){
      this.profile_image = environment.imageURL + this.currentUser.image
    }
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  userLogout() {
    this.authService.logout(window.location.hostname);
    Cookie.delete('.BBLEAVEMS.Cookie', '/', window.location.hostname);
    this.authService.currentUserDetails.next(null);
    this.router.navigate(['/login']);
    this.toastr.success('Logout Successfully', 'Success!', { timeOut: 2000 });
    this.router.navigate(["/login"]);
  }

}
