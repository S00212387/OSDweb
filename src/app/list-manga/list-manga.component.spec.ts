import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMangaComponent } from './list-manga.component';

describe('ListMangaComponent', () => {
  let component: ListMangaComponent;
  let fixture: ComponentFixture<ListMangaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMangaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
