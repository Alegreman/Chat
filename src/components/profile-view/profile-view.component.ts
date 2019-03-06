import { Component, OnInit,Output, EventEmitter } from "@angular/core";
import { DataService } from "../../providers/data/data.service";
import { AuthService } from "../../providers/auth/auth.service";
import { User } from "firebase";
import { Profile } from "../../models/profile/profile.interface";
import { ProfilePageModule } from "../../pages/profile/profile.module";
import { LoadingController, Loading } from "ionic-angular";

@Component({
    selector: 'app-profile-view',
    templateUrl: 'profile-view.component.html'
})
export class ProfileViewComponent implements OnInit{

    private authUser: User;
    public userProfile: Profile;
    private loader: Loading;

    @Output() existingProfile: EventEmitter<Profile>;

    constructor(private loading: LoadingController, private data: DataService, 
        private auth: AuthService){
        
        this.existingProfile = new EventEmitter<Profile>();
        this.loader = this.loading.create({
            content: 'Loading Profile...'
        });
    
    }

    ngOnInit(){
        this.loader.present();
        
        this.data.getAuthenticatedUserProfile().subscribe( profile => {
            this.userProfile = <Profile>profile;
            this.existingProfile.emit(this.userProfile);
                this.loader.dismiss();
        })
        
       
    }

}