import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from 'src/app/models/author';
import { AuthorsService } from '../authors.service';

@Component({
  selector: 'hb-author-add',
  templateUrl: './author-add.component.html',
  styleUrls: ['./author-add.component.less']
})
export class AuthorAddComponent implements OnInit {

  author! : Author;
  
  authorForm! : FormGroup;

  name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]);

  constructor(private authorService : AuthorsService,
              private route : ActivatedRoute,
              private router : Router,
              private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.authorForm = this.buildAuthorForm();
  }

  buildAuthorForm() {
    return this.formBuilder.group({
      name: this.name,
    });
  }

  addAuthor() {
    this.authorService.addAuthor(this.authorForm.value).subscribe(() => {
      this.router.navigate(['/authors']);  
    });
  }

  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a name';
    }

    return (this.name.hasError('minlength') || this.name.hasError('maxlenght')) ? 'Name needs more than 3 characters and less than 100!' : '';
  }
}
