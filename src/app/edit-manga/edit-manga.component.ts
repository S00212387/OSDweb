import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MangasService } from '../mangas.service';

@Component({
  selector: 'app-edit-manga',
  templateUrl: './edit-manga.component.html',
  styleUrls: ['./edit-manga.component.css']
})
export class EditMangaComponent implements OnInit {

  addManga:any;
  id: any;
  constructor(private fb:FormBuilder,
    private routes:Router,
    private mangaservice:MangasService,
    private url:ActivatedRoute
    ) {
    this.addManga = fb.group(
      {
        title:['',Validators.required],
        author:['',Validators.required],
        year_written:['',Validators.required],
        NumberOfVolumes:['',Validators.required]

      }
    )

     }

  ngOnInit(): void {
    this.id = this.url.snapshot.params['id'];
    console.log(this.id)
    this.mangaservice.singleManga(this.id).subscribe(data=>{
      this.addManga.patchValue(data);
    })
  }


  onSubmit() {
    console.log(this.addManga.value);
    this.mangaservice.updateManga(this.id,this.addManga.value).subscribe((data:any)=>{
      console.log(data);
      this.routes.navigate(['/list-manga']);
    })
    
  }

}
