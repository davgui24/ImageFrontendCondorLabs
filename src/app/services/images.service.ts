import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  routeServe = 'http://localhost:3000/';
  listImages = `${this.routeServe}listImages`;
  createImage = `${this.routeServe}upLoadImage`;
  deleteImage = `${this.routeServe}deleteImage/`;
  transferImage = `${this.routeServe}transferImage/`;

  constructor(public http: HttpClient) { }

    imageList(){
    return this.http.get(this.listImages).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // ---------

  imageCreate(data: any){
    return this.http.post(this.createImage, data)
    .pipe(map((res: any) =>{
      return res;
    }))
   }

    // ---------------------------------

  imageDelete(id: string){
    return this.http.delete(this.deleteImage+id, { responseType: 'json' })
    .pipe(map((res: any) =>{
      return res;
    }))
   }

      // ---------------------------------

  imageTransfer(id: string, data: any){
    return this.http.put(this.transferImage+id, data)
    .pipe(map((res: any) =>{
      return res;
    }))
   }
}
