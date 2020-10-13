import { CssSelector } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-human',
  templateUrl: './human.component.html',
  styleUrls: ['./human.component.css']
})
export class HumanComponent implements OnInit,AfterViewInit {

  @ViewChild('humanCanvas') canvas:ElementRef; 
  constructor() { }

  ngAfterViewInit(): void {
    console.log("humanCanvas",this.canvas)
  }
  
  ngOnInit(): void {
    
  }

}
