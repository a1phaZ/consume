import { Component, OnInit } from '@angular/core';
import { TListItem }                     from '../../components/list/list.component';
import { SettingsService, TSettingItem } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  settingsList: TSettingItem[];

  constructor(
    private settingsService: SettingsService,
  ) { }

  ngOnInit() {
    this.settingsList = this.settingsService.list;
  }

}
