import { Component, Inject, Injector, Input }  from '@angular/core';
import { FormControl, FormGroup }              from '@angular/forms';
import { TFormField }                          from '../../models/TFormField';
import { PolymorpheusComponent }               from '@tinkoff/ng-polymorpheus';
import { TUI_CALENDAR_DATA_STREAM }            from '@taiga-ui/kit';
import { TuiDay, tuiReplayedValueChangesFrom } from '@taiga-ui/cdk';
import { Observable }                          from 'rxjs';
import { TUI_MONTHS, TuiDialogService }        from '@taiga-ui/core';
import { map, startWith, withLatestFrom }      from 'rxjs/operators';
import { TuiMobileCalendarDialogComponent }    from '@taiga-ui/addon-mobile';

@Component({
	selector: 'app-date-field',
	templateUrl: './date-field.component.html',
	styleUrls: ['./date-field.component.scss'],
})
export class DateFieldComponent {

	@Input() formGroup: FormGroup;
	@Input() field: TFormField;

	private readonly control = new FormControl(new TuiDay(2020, 9, 3));

	private readonly dialog$: Observable<TuiDay>;

	readonly date$ = this.control.valueChanges.pipe(
		startWith(this.control.value),
		withLatestFrom(this.months),
		map(([value, months]) => this.getParsed(value, months)),
	);

	constructor(
		@Inject(TuiDialogService) dialogService: TuiDialogService,
		@Inject(Injector) injector: Injector,
		@Inject(TUI_MONTHS) private readonly months: Observable<string[]>,
	) {
		const dataStream = tuiReplayedValueChangesFrom(this.control);
		const computedInjector = Injector.create({
			providers: [
				{
					provide: TUI_CALENDAR_DATA_STREAM,
					useValue: dataStream,
				},
			],
			parent: injector,
		});
		const content = new PolymorpheusComponent(
			TuiMobileCalendarDialogComponent,
			computedInjector,
		);

		this.dialog$ = dialogService.open(content, {
			size: 'fullscreen',
			closeable: false,
			data: {
				min: TuiDay.currentLocal(),
			},
		});
	}

	get empty(): boolean {
		return !this.control.value;
	}

	getParsed(value: TuiDay, months: string[]): string {
		if (!value) {
			return 'Choose a date';
		}

		const {month, day, year} = value as TuiDay;

		return `${months[month]} ${day}, ${year}`;
	}

	onClick(): void {
		this.dialog$.subscribe(value => {
			this.control.setValue(value);
			this.formGroup.patchValue({[this.field.name]: this.formattedDate(value)});
		});
	}

	formattedDate(value: TuiDay) {
		return +new Date(value.year, value.month, value.day);
	}
}
