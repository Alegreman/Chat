import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from "angularfire2/database";
import { User } from "firebase/app";
import { Profile } from "../../models/profile/profile.interface";
import 'rxjs/add/operator/take'
import { LoginResponse } from '../../models/login/login-response.interface';

@Injectable()
export class DataService {
 // >>>>>>>>using AngularFireObject instead of FirebaseObjectObservable <<<<<<<<<<<<<<<<<<<<<<
  
  profileObject: AngularFireObject<Profile>
  profileListObs: AngularFireList<Profile>
  constructor(private database: AngularFireDatabase) {

  }

  getProfile(user: User) {
    this.profileObject = this.database.object(`/profiles/${user.uid}`);

    
    return this.profileObject;
    }
    
    searchUser(firstName: string) {
    const query = this.database.list('/profiles',ref => ref.orderByChild('firstName').equalTo(firstName));
    
    return query.valueChanges();
    }
    
    async saveProfile(user: User, profile: Profile){
      this.profileObject = this.database.object(`/profiles/${user.uid}`)
      try{
        await this.profileObject.set(profile);
        return true;
      }
      catch(e){
        console.log(e);
        return false;
      }
    }
    
}