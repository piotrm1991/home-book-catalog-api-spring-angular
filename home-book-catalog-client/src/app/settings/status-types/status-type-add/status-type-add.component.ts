import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusType } from 'src/app/models/status-type';
import { StatusTypesService } from '../status-types.service';

@Component({
  selector: 'hb-status-type-add',
  templateUrl: './status-type-add.component.html',
  styleUrls: ['./status-type-add.component.less']
})
export class StatusTypeAddComponent implements OnInit {

  statusType! : StatusType;
  
  statusTypeForm! : FormGroup;

  name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]);

  constructor(private statusTypeService : StatusTypesService,
              private route : ActivatedRoute,
              private router : Router,
              private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.statusTypeForm = this.buildStatusTypeForm();
  }

  buildStatusTypeForm() {
    return this.formBuilder.group({
      name: this.name,
    });
  }

  addStatusType() {
    this.statusTypeService.addStatusType(this.statusTypeForm.value).subscribe(() => {
      this.router.navigate(['/settings']);  
    });
  }

  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a name';
    }

    return (this.name.hasError('minlength') || this.name.hasError('maxlenght')) ? 'Name needs more than 3 characters and less than 100!' : '';
  }
}
