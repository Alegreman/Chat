import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from "angularfire2/database";
import { User } from "firebase/app";
import { Profile } from "../../models/profile/profile.interface";
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'


import { LoginResponse } from '../../models/login/login-response.interface';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataService {
 // >>>>>>>>using AngularFireObject instead of FirebaseObjectObservable <<<<<<<<<<<<<<<<<<<<<<
  
  profileObject: AngularFireObject<Profile>
  profileListObs: AngularFireList<Profile>
  profileList: AngularFireList<Profile>
  constructor(private authService: AuthService,private database: AngularFireDatabase) {

  }

  getProfile(user: User) {
    this.profileObject = this.database.object(`/profiles/${user.uid}`);

    
    return this.profileObject;
    }
    
    searchUser(firstName:string) {
      this.profileList = this.database.list('/profiles/', query => { 
       let q = query.orderByChild('firstName').equalTo(firstName).limitToFirst(1);
       return q;
       });
      return this.profileList.valueChanges().take(1);
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

    getAuthenticatedUserProfile(){
      return this.authService.getAuthenticatedUser().map(user => user.uid)
      .mergeMap(authId => this.database.object(`/profiles/${authId}`).valueChanges())
      .take(1);
    }
    
}