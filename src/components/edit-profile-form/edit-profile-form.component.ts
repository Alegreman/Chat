import { Component, OnDestroy, Output, EventEmitter,OnInit, Input } from '@angular/core';
import { Profile } from "../../models/profile/profile.interface";
import { DataService } from "../../providers/data/data.service";
import { AuthService } from '../../providers/auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'firebase/app';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: 'edit-profile-form.component.html'
})
export class EditProfileFormComponent implements OnInit,OnDestroy{

  private authenticatedUser$: Subscription;
  private authenticadedUser: User;
  @Output() saveProfileResult: EventEmitter<Boolean>

 @Input() profile : Profile;

  constructor(private auth: AuthService, private data: DataService) {
    this.saveProfileResult = new EventEmitter<Boolean>();
    this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe((user:User) => {
      this.authenticadedUser = user;
    })
  }

  ngOnInit(): void {
    if(!this.profile){
      this.profile = {} as Profile;
    }
  }

  async saveProfile(){
    if(this.authenticadedUser){
      this.profile.email = this.authenticadedUser.email;
      const result = await this.data.saveProfile(this.authenticadedUser, this.profile);
      this.saveProfileResult.emit(result);
    }
  }
  ngOnDestroy(): void {
    this.authenticatedUser$.unsubscribe();
  }

}
