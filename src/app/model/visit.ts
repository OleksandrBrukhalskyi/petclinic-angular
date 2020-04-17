export class Visit {
	id: any;
	visit_date: any;
	visit_goal: string;
	pet: any;
	owner: any;

	constructor() {
		this.visit_date = new Date();
		this.pet = new Pet();
		this.owner = new Owner();
	}
}