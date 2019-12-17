import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { ISlimScrollOptions } from 'ngx-slimscroll';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

declare const $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  private isLoggedIn$: Observable<boolean>;
  private username$: Observable<string>;
  private opts: ISlimScrollOptions;
  private url = '';
  private url2 = '';

  constructor(private router: Router, private authService: AuthService) {
    router.events.subscribe((event: Event) => {
    if (event instanceof NavigationStart) {
        $('.modal').modal('hide');
      }

      if (event instanceof NavigationEnd) {
        this.url = event.url.split('/')[1];
        this.url2 = event.url.split('/')[2];

        $('.page-wrapper').css('min-height', $(window).height());
        $('.slimscroll-wrapper').height($(window).height() - 60);

        $('.main-wrapper').removeClass('slide-nav-toggle');
        $('.sidebar-overlay').removeClass('opened');
        $('.task-overlay').removeClass('opened');
      }
    });
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.username$ = this.authService.getUserName;
    this.opts = {
      barBackground: '#ccc',
      gridBackground: 'transparent',
      barOpacity: '0.4',
      barBorderRadius: '6',
      barWidth: '6',
      gridWidth: '0',
      alwaysVisible: true,
    };
    $(window).resize(function() {
      $('.slimscroll-wrapper').height($(window).height() - 60);
    });
  }
}
