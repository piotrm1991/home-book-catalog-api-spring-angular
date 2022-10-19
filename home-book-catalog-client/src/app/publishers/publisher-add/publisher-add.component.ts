import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Publisher } from 'src/app/models/publisher';
import { PublishersService } from '../publishers.service';

@Component({
  selector: 'hb-publisher-add',
  templateUrl: './publisher-add.component.html',
  styleUrls: ['./publisher-add.component.less']
})
export class PublisherAddComponent implements OnInit {

  publisher! : Publisher;
  
  publisherForm! : FormGroup;
  
  name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]);

  constructor(private publisherService : PublishersService,
              private route : ActivatedRoute,
              private router : Router,
              private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.publisherForm = this.buildPublisherForm();
  }

  buildPublisherForm() {
    return this.formBuilder.group({
      name: this.name
    });
  }

  addPublisher() {
    this.publisherService.addPublisher(this.publisherForm.value).subscribe(() => {
      this.router.navigate(['/publishers']);  
    });
  }

  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a name';
    }

    return (this.name.hasError('minlength') || this.name.hasError('maxlenght')) ? 'Name needs more than 3 characters and less than 100!' : '';
  }
}
