import { Component, EventEmitter,
  Output ,Input } from '@angular/core';

import  { DoctorFilters } from '.././../../../core/models/filter.model';
@Component({
  selector: 'app-filters',
  imports: [],
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
  onFilterChange(): void {
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
