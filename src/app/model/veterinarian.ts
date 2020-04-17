export class Veterinarian {
	id: any;
	surname: string;
	firstname: string;
	patronymic: string;
	specialty: any;

	constructor() {
		this.specialty = new Specialty();
	}
}