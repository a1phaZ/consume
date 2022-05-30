import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule }  from '@ionic/angular';
import { FormsModule }  from '@angular/forms';
import { HomePage }     from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MainHeaderComponent }   from '../../components/main-header/main-header.component';
import { ButtonComponent }       from '../../components/button/button.component';
import { ListComponent }         from '../../components/list/list.component';
import { ListHeaderComponent }   from '../../components/list-header/list-header.component';
import { MainContentComponent }  from '../../components/main-content/main-content.component';
import { PipesModule }           from '../../pipes/pipes.module';
import { FormModalPageModule }   from '../../modals/form-modal/form-modal.module';
import { TuiMoneyModule }        from '@taiga-ui/addon-commerce';
import { TuiButtonModule }       from '@taiga-ui/core';
import { ComponentsModule }      from '../../components/components.module';


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
		ComponentsModule,
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
		ListHeaderComponent,
		MainContentComponent,
	],
	providers: []
})
export class HomePageModule {
}
