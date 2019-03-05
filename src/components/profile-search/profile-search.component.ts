import { Component } from "@angular/core";
import { DataService } from "../../providers/data/data.service";
import { Profile } from "../../models/profile/profile.interface";

@Component({
    selector: 'app-profile-search',
    templateUrl: 'profile-search.component.html'
})

export class ProfileSearchComponent{
    
    query:string;
    profileList: Profile[];

    constructor(private data:DataService){

    }

    searchUser(qyery:string){
        this.data.searchUser(this.query).
        subscribe(profiles => {
        console.log(profiles)
        this.profileList
       
        })
    }
}