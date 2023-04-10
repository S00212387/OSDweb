import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';

interface Manga {
  id: number;
  title: string;
  author: string;
  year_written: number;
  NumberOfVolumes: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Manga App';
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService, private http: HttpClient) {}
  isAuthenticated$ = this.auth.isAuthenticated$

  mangas: Manga[] = [];
  filteredMangas: Manga[] = [];
  searchTerm: string = '';

  ngOnInit() {
    this.http.get<Manga[]>('/api/mangas').subscribe((data: Manga[]) => {
      this.mangas = data;
      this.filteredMangas = data;
    });
  }
}
