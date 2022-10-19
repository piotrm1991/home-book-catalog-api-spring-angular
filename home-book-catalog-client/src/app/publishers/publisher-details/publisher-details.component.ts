import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Publisher } from 'src/app/models/publisher';
import { PublishersService } from '../publishers.service';

@Component({
  selector: 'hb-publisher-details',
  templateUrl: './publisher-details.component.html',
  styleUrls: ['./publisher-details.component.less']
})
export class PublisherDetailsComponent implements OnInit {

  publisher! : Publisher;

  publisherForm! : FormGroup;

  name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]);

  constructor(private publisherService : PublishersService,
              private route : ActivatedRoute,
              private router : Router,
              private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.loadPublisher();
    this.publisherForm = this.buildPublisherForm();
  }

  loadPublisher() {
    this.publisher = this.route.snapshot.data['publisher'];
  }

  buildPublisherForm() {
    this.name.patchValue(this.publisher.name);
    return this.formBuilder.group({
      name: this.name
    });
  }

  updatePublisher() {
    this.publisherService.updatePublisher(this.publisher.id, this.publisherForm.value).subscribe(() => {
      this.router.navigate(['/publishers']);  
    });
  }

  deletePublisher() {
    this.publisherService.deletePublisher(this.publisher.id).subscribe(() => {
      this.router.navigate(['/publishers']);
    })
  }

  resetToOriginal() {
    this.name.patchValue(this.publisher.name);
  }
  
  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a name';
    }

    return (this.name.hasError('minlength') || this.name.hasError('maxlenght')) ? 'Name needs more than 3 characters and less than 100!' : '';
  }
}
