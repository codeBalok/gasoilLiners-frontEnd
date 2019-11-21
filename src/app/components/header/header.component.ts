import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router'
import { ISlimScrollOptions } from 'ngx-slimscroll';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

declare const $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private isLoggedIn$: Observable<boolean>;
  
  private username$: Observable<string>;

  constructor(private authService: AuthService) {}

  ngOnInit() {
      this.isLoggedIn$ = this.authService.isLoggedIn;
      this.username$ = this.authService.getUserName;
      console.log(this.authService.getUserName);
      console.log(this.authService.isLoggedIn);
      this.onSidebarToggle();
      this.onMiniSidebarMouseover();
  }

  onLogout() {
    this.authService.logout();
  }

  onSidebarToggle() {
  $(document).on('click','#toggle_btn', function() {
    if($('body').hasClass('mini-sidebar')) {
      $('body').removeClass('mini-sidebar');
      $('.user-info').removeClass('hidden');
      $('.subdrop + ul').slideDown();
    } else {
      $('body').addClass('mini-sidebar');
      $('.user-info').addClass('hidden');
      $('.subdrop + ul').slideUp();
    }
    return false;
  });
  }

  onMiniSidebarMouseover () {
    $(document).on('mouseover', function(e){
      e.stopPropagation();
      if ($('body').hasClass('mini-sidebar') && $('#toggle_btn').is(':visible')) {
        if ($(e.target).closest('.sidebar').length) {
          $('body').addClass('expand-menu');
          $('.subdrop + ul').slideDown();
        } else {
          $('body').removeClass('expand-menu');
          $('.subdrop + ul').slideUp();
        }
      }
    });
  }
}
