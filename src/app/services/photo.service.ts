import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }


  public async takephoto() {

    const image = await Camera.getPhoto({
      quality: 20,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });

    let base64 = image.base64String;


    return base64;

  }
}
