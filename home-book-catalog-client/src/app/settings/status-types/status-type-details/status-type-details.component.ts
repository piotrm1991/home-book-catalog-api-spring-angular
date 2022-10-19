import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusType } from 'src/app/models/status-type';
import { StatusTypesService } from '../status-types.service';

@Component({
  selector: 'hb-status-type-details',
  templateUrl: './status-type-details.component.html',
  styleUrls: ['./status-type-details.component.less']
})
export class StatusTypeDetailsComponent implements OnInit {

  statusType! : StatusType;

  statusTypeForm! : FormGroup;

  name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]);

  constructor(private statusTypeService : StatusTypesService,
              private route : ActivatedRoute,
              private router : Router,
              private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.loadStatusType();
    this.statusTypeForm = this.buildStatusTypeForm();
  }

  loadStatusType() {
    this.statusType = this.route.snapshot.data['statusType'];
  }

  buildStatusTypeForm() {
    this.name.patchValue(this.statusType.name);
    return this.formBuilder.group({
      name: this.name
    });
  }

  updateStatusType() {
    this.statusTypeService.updateStatusType(this.statusType.id, this.statusTypeForm.value).subscribe(() => {
      this.router.navigate(['/settings']);  
    });
  }

  deleteStatusType() {
    this.statusTypeService.deleteStatusType(this.statusType.id).subscribe(() => {
      this.router.navigate(['/settings']);
    })
  }

  resetToOriginal() {
    this.name.patchValue(this.statusType.name);
  }
  
  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a name';
    }

    return (this.name.hasError('minlength') || this.name.hasError('maxlenght')) ? 'Name needs more than 3 characters and less than 100!' : '';
  }
}
