import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeServiceService {

   isOwnerCheck(ownerId: string, currentId: string | undefined | null): boolean {
    if (ownerId === currentId) {
      return true;
    }
    return false;
  }

}
 