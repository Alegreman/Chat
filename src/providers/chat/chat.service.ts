import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Channel } from "../../models/channel/channel.interface";

@Injectable()

export class ChatService{
    constructor(private database: AngularFireDatabase){

    }

    addChannel(channelName: string){
       this.database.list(`/channel-names`).push({name: channelName}); 
    }

    getChannelListReference(): AngularFireList<Channel>{
        return this.database.list(`channel-names`);
    }

    getChannelChatReference(channelKey: string){
        return this.database.list(`channels/${channelKey}`);
    }

}