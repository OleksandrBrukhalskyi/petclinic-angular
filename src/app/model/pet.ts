export class Pet {
	id: any;
	name: string;
	date_of_birth: Date = new Date();
	breed: string;
	owner: any;

	constructor(){
		this.owner = new Owner();
	}

}