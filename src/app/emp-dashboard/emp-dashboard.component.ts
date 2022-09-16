import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { CrudMethodService } from '../shared/crud-method.service';
import { EmployeeModel } from './emp-dashboard.model';


@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.css']
})
export class EmpDashboardComponent implements OnInit {

  detailsForm!:FormGroup;

  employeeObj:EmployeeModel = new EmployeeModel(); // this object will be used to send the data to the json server

  employeeData:any; // to the data recieved from api on html file using interpolation

  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formbuilder:FormBuilder, private crud:CrudMethodService ) { }



  ngOnInit(): void {

    this.detailsForm = this.formbuilder.group({
      empId:[''],
      name:[''],
      email:[''],
      phone:[''],
      salary:['']  
    }) 
    this.showEmpDetails();
    
  }

  onAddClicked(){
    this.detailsForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmpDetails(){
    this.employeeObj.empId = this.detailsForm.value.empId;
    this.employeeObj.email = this.detailsForm.value.email;
    this.employeeObj.name = this.detailsForm.value.name;
    this.employeeObj.phone = this.detailsForm.value.phone;
    this.employeeObj.salary = this.detailsForm.value.salary;

    this.crud.postDetails(this.employeeObj)
    .subscribe(response =>{
      console.log("In ts file's post method",response);
      alert("Details Added Successfully");

      this.detailsForm.reset();
      let cancel = document.getElementById("cancel");
      cancel?.click();

      this.showEmpDetails();
      
    }, error =>{
      console.log(error);
      alert("something went wrong, postEmp")
      
    })
  }

  showEmpDetails(){
    this.crud.getDetails()
    .subscribe(response=>{
      this.employeeData = response;
      
    }, error =>{
      console.log(error);
      alert("something went wrong, showEmp")
      
    })

  }

  deleteEmpDetails(data:any){
    this.crud.deleteDetails(data.id)
    .subscribe(response=>{
      alert("Employee Deleted");
      this.showEmpDetails();
      
    }, error =>{
      console.log(error);
      alert("something went wrong, delEmp")
      
    })
  }

  onEditClicked(data:any){

    this.showAdd = false;
    this.showUpdate = true;

    this.employeeObj.id = data.id;
    this.detailsForm.controls['empId'].setValue(data.empId);
    this.detailsForm.controls['name'].setValue(data.name);
    this.detailsForm.controls['email'].setValue(data.email);
    this.detailsForm.controls['phone'].setValue(data.phone);
    this.detailsForm.controls['salary'].setValue(data.salary);

  }
  
  onUpdateClicked(){
    this.employeeObj.empId = this.detailsForm.value.empId;
    this.employeeObj.email = this.detailsForm.value.email;
    this.employeeObj.name = this.detailsForm.value.name;
    this.employeeObj.phone = this.detailsForm.value.phone;
    this.employeeObj.salary = this.detailsForm.value.salary;

    this.crud.updateDetails(this.employeeObj.id,this.employeeObj)
    .subscribe(res =>{
      alert("Updated");

      this.detailsForm.reset();
      let cancel = document.getElementById("cancel");
      cancel?.click();

      this.showEmpDetails();

    })

  }
 

}
