import {Component, OnInit, ViewChild} from '@angular/core';
import {OwnerService} from '../service/owner.service';
import {Owner} from '../model/owner';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {NgForm} from "@angular/forms";
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatPaginator} from "@angular/material/paginator";


@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {

  displayedColumns = ['id', 'surname', 'firstname', 'patronymic', 'address', 'phone_number' , 'actions' ];
  @ViewChild(MatSort, {static: true}) sort: MatSort;

	owners: any;
	ownerToUpdate: Owner;
	owner: Owner = new Owner();
	id: any;
  private dataSource: any;


  constructor(private ownerService: OwnerService) { }


  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.load();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  load() {
    // tslint:disable-next-line:indent
  	this.ownerService.getOwners().subscribe((data: {}) => {
  	  this.dataSource.data = data;
  	  this.owners = data;
  	});
  }
  loadOwners() {
    this.ownerService.getOwners().subscribe(data => {
      this.owners = data;
    });
  }

  create(f: NgForm){
    this.ownerService.add(this.owner).subscribe(() => {
      this.load();
    });
  }

  update(owner: Owner){
    this.ownerToUpdate = owner;
  }
  save() {
    if(this.ownerToUpdate.id !== '' && this.ownerToUpdate.surname !== '' && this.ownerToUpdate.firstname !== ''
    && this.ownerToUpdate.patronymic !== '' && this.ownerToUpdate.homeAddress !== '' && this.ownerToUpdate.phoneNumber !== '') {
      this.ownerService.update(this.ownerToUpdate , this.id).subscribe(() => {
        this.load();
        this.ownerToUpdate = null;
      });
    }
  }

  delete(id: any) {
    this.ownerService.delete(id).subscribe(() => {
      this.load();
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
