import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from 'src/app/models/author';
import { AuthorsService } from '../authors.service';

@Component({
  selector: 'hb-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.less']
})
export class AuthorDetailsComponent implements OnInit {

  author! : Author;

  authorForm! : FormGroup;

  name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]);

  constructor(private authorService : AuthorsService,
              private route : ActivatedRoute,
              private router : Router,
              private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.loadAuthor();
    this.authorForm = this.buildAuthorForm();
  }

  loadAuthor() {
    this.author = this.route.snapshot.data['author'];
  }

  buildAuthorForm() {
    this.name.patchValue(this.author.name);
    return this.formBuilder.group({
      name: this.name
    });
  }

  updateAuthor() {
    this.authorService.updateAuthor(this.author.id, this.authorForm.value).subscribe(() => {
      this.router.navigate(['/authors']);  
    });
  }

  deleteAuthor() {
    this.authorService.deleteAuthor(this.author.id).subscribe(() => {
      this.router.navigate(['/authors']);
    })
  }

  resetToOriginal() {
    this.name.patchValue(this.author.name);
  }
  
  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a name';
    }

    return (this.name.hasError('minlength') || this.name.hasError('maxlenght')) ? 'Name needs more than 3 characters and less than 100!' : '';
  }
}
