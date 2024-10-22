import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title: string = 'Modal';

  @Input() content: string = '<p>Sample</p>';

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  /**
   * closes
   */
  protected close(): void {
    this.activeModal.dismiss();
  }

  /**
   * Submit action, when used with the ngbModal service the result property returns a promise that can be used for callbacks
   */
  protected submit(): void {
    this.activeModal.close();
  }
}
