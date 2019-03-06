import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { Profile } from '../../models/profile/profile.interface';
import { AuthService } from '../../providers/auth/auth.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  existingProfile = {} as Profile;

  constructor(private auth: AuthService, private navCtrl: NavController, private navParams: NavParams, private appCtrl: App) {
  }

  

  getExistingProfile(profile: Profile){
    this.existingProfile = profile;
  }

  navigateToEditProfilePage(){
    this.navCtrl.push('EditProfilePage', { existingProfile: this.existingProfile});
  }

  signOut(){
   
    this.appCtrl.getRootNav().setRoot('LoginPage');
  }



}
