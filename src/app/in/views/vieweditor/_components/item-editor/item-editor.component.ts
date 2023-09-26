import { Component, Input, OnInit } from '@angular/core';
import { ViewItem } from '../../_objects/View';

@Component({
  selector: 'app-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.scss']
})
export class ItemEditorComponent implements OnInit {

  @Input() item:ViewItem
  @Input() entity:string
  @Input() fields:string[]
  @Input() types:string[]


  constructor() { }

  ngOnInit(): void {
  }

}