import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SideBarComponent} from './side-bar/side-bar/side-bar.component';



@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent],
  styleUrl: './layout.component.scss',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {

  ngOnInit(): void {

  }

}
