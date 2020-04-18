import {Pet} from './pet';
import {Owner} from './owner';


export class Visit {
	id: any;
	visit_date: Date;
	visit_goal: string;
	pet: any;
	owner: any;

	constructor() {
		this.pet = new Pet();
		this.owner = new Owner();
	}
}
