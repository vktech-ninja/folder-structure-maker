import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NodeModel } from '../models/node.model';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit, AfterViewInit {

  @Input('node') node!: NodeModel;
  @Output('remove') remove: EventEmitter<any> = new EventEmitter();
  @ViewChild('input')
  input!: ElementRef<HTMLInputElement>;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.input && this.input.nativeElement) {
      this.input.nativeElement.focus();
    }
  }

  /**
   * Add a child node
   */
  addNode(): void {
    if (!this.node.children) {
      this.node.children = [];
    }
    this.node.children.push({
      id: new Date().getTime().toString(),
      type: 'unset'
    })
  }

  /**
   * Update a node type when user clicks on folder or file button
   * @param type Folder or File
   */
  updateNodeType(type: "unset" | "folder" | "file" | null): void {
    this.node.type = type;
    setTimeout(() => {
      if (this.input && this.input.nativeElement) {
        this.input.nativeElement.focus();
      }
    }, 200);
  }

  /**
   * Update a node name provided by a user
   * @param value name
   */
  updateNodeName(value: string): void {
    if (value && value.trim()) {
      this.node.name = value.trim();
    }
  }

  /**
   * Emit an event to remove a node when user clicks on delete icon
   */
  removeNode(): void {
    this.remove.emit(this.node.id);
  }

  /**
   * To remove a node from children array
   * @param id Id of node
   */
  removeChildNode(id: string): void {
    if (!this.node.children) {
      this.node.children = [];
    }
    this.node.children = this.node.children.filter((child) => child.id !== id);
  }
}
