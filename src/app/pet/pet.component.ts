import {Component, OnInit, ViewChild} from '@angular/core';
import {Pet} from '../model/pet';
import {PetService} from '../service/pet.service';
import {OwnerService} from '../service/owner.service';
import {NgForm} from '@angular/forms';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {
  displayedColumns = ['id', 'name', 'breed', 'dateOfBirth', 'owner', 'actions'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  private owners: any;
  private pets: any;
  private petToUpdate: Pet;
  private pet: Pet = new Pet();
  private dataSource: any;

  constructor(private petService: PetService, private ownerService: OwnerService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.getPets();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  getPets() {
    this.petService.getPets().subscribe((data: {}) => {
      this.dataSource.data = data;
      this.pets = data;
    });
  }
  getOwners() {
    this.ownerService.getOwners().subscribe(data => {
      this.owners = data;
    });
  }
  create(pet: Pet) {
    this.petService.add(this.pet).subscribe(() => {
      this.getPets();
    });
  }
  update(pet: Pet) {
    this.petToUpdate = pet;
    this.petToUpdate.owner = pet.owner.id;
  }
  save() {
    if(this.petToUpdate.id !== '' && this.petToUpdate.name !== '' && this.petToUpdate.breed !== ''
    && this.petToUpdate.date_of_birth !== '' && this.petToUpdate.owner !== '') {
      this.petService.update(this.petToUpdate, this.petToUpdate.id).subscribe(() => {
        this.getPets();
        this.petToUpdate = null;
      });
    }
  }
  delete(id: any) {
    this.petService.delete(id).subscribe(() => {
      this.getPets();
    });
  }
  resetForm(form: NgForm) {
    form.resetForm();
  }


}
