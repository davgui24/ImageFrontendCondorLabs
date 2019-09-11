import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  routeServe = 'http://localhost:3000/';
  listAlbums = `${this.routeServe}listAlbums`;
  createAlbum = `${this.routeServe}form-album`;
  deleteAlbum = `${this.routeServe}deleteAlbum/`;


  constructor(public http: HttpClient) { }

    albumsList(){
    return this.http.get(this.listAlbums).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // ---------------------------------

  albumCreate(data: any){
   return this.http.post(this.createAlbum, data)
   .pipe(map((res: any) =>{
     return res;
   }))
  }

  // ---------------------------------

  albumDelete(id: string){
    return this.http.delete(this.deleteAlbum+id, { responseType: 'json' })
    .pipe(map((res: any) =>{
      return res;
    }))
   }
}
