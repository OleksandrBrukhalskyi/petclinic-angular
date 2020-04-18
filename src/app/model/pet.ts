import {Owner} from './owner';

export class Pet {
	id: any;
	name: string;
	date_of_birth: any;
	breed: string;
	owner: any;

	constructor(){
		this.owner = new Owner();
		this.date_of_birth = new Date();
	}

}
