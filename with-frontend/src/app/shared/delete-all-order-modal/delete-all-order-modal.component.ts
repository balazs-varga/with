import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-all-order-modal',
  templateUrl: './delete-all-order-modal.component.html',
  styleUrls: ['./delete-all-order-modal.component.scss']
})
export class DeleteAllOrderModalComponent {

  @Output() closeModal = new EventEmitter<void>();
  @Output() deleteCart = new EventEmitter<void>();

  constructor() { }

  closeModalEmitter(): void {
    this.closeModal.emit();
  }

  deleteCartEmitter(): void {
    this.deleteCart.emit();
  }
}
