import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[dnd]',
  standalone: true
})
export class DndDirective {

  @HostBinding('class.fileover')
  fileover: boolean = false;

  @Output() fileDropped = new EventEmitter<File>();

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.fileover = true; // Устанавливаем true при перетаскивании
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.fileover = false; // Устанавливаем false при выходе из зоны
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.fileover = false; // Устанавливаем false после сброса

    this.fileDropped.emit(event.dataTransfer?.files[0]);
  }
}
