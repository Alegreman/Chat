import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Channel } from '../../models/channel/channel.interface';
import { ChatService } from '../../providers/chat/chat.service';
import { AngularFireList } from 'angularfire2/database';
import { ChannelMessage } from '../../models/channel/channel-message.interface';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-channel-chat',
  templateUrl: 'channel-chat.html',
})
export class ChannelChatPage {

  channel: Channel;
  channelMessages: AngularFireList <ChannelMessage[]>;
  

  constructor(private chat: ChatService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.channel = this.navParams.get('channel');
    //this.channelMessages = <any>this.chat.getChannelChatReference(this.channel.$key);
   this.chat.getChannelChatReference(this.channel.$key).snapshotChanges().subscribe(channelMessages => {
    this.channelMessages = <any> channelMessages;
  })
}

}
