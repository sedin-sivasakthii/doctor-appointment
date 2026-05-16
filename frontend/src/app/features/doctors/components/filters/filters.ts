import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorFilters } from '.././../../../core/models/filter.model';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.html',
  styleUrl: './filters.css',
})
export class Filters {
  @Output() filtersChanged = new EventEmitter<DoctorFilters>();
  filters: DoctorFilters = {
    search: '',
    speciality: '',
    location: '',
    availability: '',
    maxFee: 0
  };
  @Input() specialities: string[] = [];
  @Input() locations: string[] = [];
  
  onFiltersChange(): void {
    this.filtersChanged.emit(this.filters);
  }
  
  resetFilters(): void {
    this.filters = {
      search: '',
      speciality: '',
      location: '',
      availability: '',
      maxFee: 0
    };
    this.filtersChanged.emit(this.filters);
  }
}
