import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear = null;

  constructor() { }

  ngOnInit(): void {
    this.getCurrentYear();
  }

  private getCurrentYear(): void {
    this.currentYear = new Date().getFullYear();
  }
}
