import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ChatService } from '../../providers/chat/chat.service';
import { Observable } from 'rxjs';
import { Channel } from '../../models/channel/channel.interface';
import { AngularFireList } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-channels',
  templateUrl: 'channels.html',
})
export class ChannelsPage {

  channelAFList: AngularFireList<Channel>;
  channelList: Observable<Channel[]>;

  constructor(private chat: ChatService,private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.getChannels();
  }

  selectChannel(channel:Channel){
    this.navCtrl.push('ChannelChatPage',{channel})
  }


  showAddChannelDialog(){
    this.alertCtrl.create({
      title: 'Channel Name',
      inputs: [{
        name: 'channelName'
      }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            this.chat.addChannel(data.channelName);
          }
        }
      ]
    }).present();
  }

  getChannels(){
    this.channelAFList = this.chat.getChannelListReference();
    this.channelList = this.channelAFList.snapshotChanges().map(
      changes => {
        return changes.map( c => ({ $key: c.payload.key, ... c.payload.val()}));
      });
  }
}
