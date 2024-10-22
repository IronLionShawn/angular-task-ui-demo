import { SortColumn, SortDirection, SortEvent, rotateTableDirection } from './../../types/table';
import { Directive, EventEmitter, Input, Output } from '@angular/core';

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class SortableTableHeaderDirective {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotateTableDirection[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}
