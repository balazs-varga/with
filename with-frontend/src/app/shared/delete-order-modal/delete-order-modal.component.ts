import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-order-modal',
  templateUrl: './delete-order-modal.component.html',
  styleUrls: ['./delete-order-modal.component.scss']
})
export class DeleteOrderModalComponent {

  @Input() selectedOrderItem: any;

  @Output() closeModal = new EventEmitter<void>();
  @Output() deleteSelectedOrderItem = new EventEmitter<any>();

  closeModalEmitter(): void {
    this.closeModal.emit();
  }

  deleteSelectedOrderItemEmitter(): void {
    this.deleteSelectedOrderItem.emit(this.selectedOrderItem);
  }
}
