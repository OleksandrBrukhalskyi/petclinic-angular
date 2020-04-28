import {Owner} from './owner';

export class Pet {
	id: any;
	name: string;
	dateOfBirth: Date;
	breed: string;
	owner: any;

	constructor(){
		this.owner = new Owner();
	}

}
