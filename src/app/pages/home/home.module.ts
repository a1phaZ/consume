import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage }    from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MainHeaderComponent }   from '../../components/main-header/main-header.component';
import { ButtonComponent }       from '../../components/button/button.component';
import { ListComponent }         from '../../components/list/list.component';
import { ListItemComponent }     from '../../components/list-item/list-item.component';
import { ListHeaderComponent }   from '../../components/list-header/list-header.component';
import { MainContentComponent }  from '../../components/main-content/main-content.component';
import { PipesModule }           from '../../pipes/pipes.module';
import { FormModalPageModule }   from '../../modals/form-modal/form-modal.module';
import { TuiMoneyModule }        from '@taiga-ui/addon-commerce';
import { TuiButtonModule }       from '@taiga-ui/core';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		HomePageRoutingModule,
		PipesModule,
		FormModalPageModule,
		TuiMoneyModule,
		TuiButtonModule,
	],
  exports: [
    ListComponent,
    ListHeaderComponent,
    MainContentComponent
  ],
  declarations: [
    HomePage,
    MainHeaderComponent,
    ButtonComponent,
    ListComponent,
    ListItemComponent,
    ListHeaderComponent,
    MainContentComponent,
  ],
  providers: []
})
export class HomePageModule {}
