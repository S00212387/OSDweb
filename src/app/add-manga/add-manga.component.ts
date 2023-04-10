import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MangasService } from '../mangas.service';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs';

@Component({
  selector: 'app-add-manga',
  templateUrl: './add-manga.component.html',
  styleUrls: ['./add-manga.component.css']
})
export class AddMangaComponent implements OnInit {
  addForm: FormGroup;
  isNotAdmin: boolean = false;
  loginMsg: string = "Please login to enable adding new manga titles to the game list";

  constructor(
    private mangaservice: MangasService,
    private router: Router,
    public auth: AuthService
  ) {
    this.addForm = new FormGroup({
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      year_written: new FormControl('', Validators.required),
      NumberOfVolumes: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  isAdmin() {
    return this.auth.user$.pipe(
      map((user) => {
        return user && user.email === 's00212387@atu.ie';
      })
    );
  }

  addManga() {
    this.isAdmin().subscribe(isAdmin => {
      if (isAdmin) {
        this.mangaservice.addManga(this.addForm.value).subscribe(() => {
          console.log('Data added successfully!');
          this.router.navigateByUrl('/list-manga');
        });
      } else {
        console.log('You are not authorized to add new manga titles!');
        this.isNotAdmin = true;
      }
    });
  }
}
