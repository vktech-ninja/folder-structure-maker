import { Component, OnInit } from '@angular/core';
import { NodeModel } from '../models/node.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  nodes: NodeModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Add a root node when user clicks on 'Add folder to root' button
   */
  addNode(): void {
    this.nodes.push({
      id: new Date().getTime().toString(),
      type: 'folder'
    })
  }

  /**
   * Remove root node
   * @param id Id of node
   */
  removeChildNode(id: string): void {
    this.nodes = this.nodes.filter((node) => node.id !== id);
  }

}
