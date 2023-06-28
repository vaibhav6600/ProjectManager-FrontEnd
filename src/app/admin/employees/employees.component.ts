import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  

  formdata:any;
  employees:any;
  id:any;

  constructor(private api:ApiService, private router:Router, private route:ActivatedRoute) {
   }

   Load(){
    this.id = null;
    this.formdata = new FormGroup({
      id: new FormControl(0),
      code : new FormControl(),
      name : new FormControl(),
      gender : new FormControl(),
      mobileno : new FormControl(),
      email : new FormControl(),
      password : new FormControl()
    })

    this.api.get("employees").subscribe((result:any)=>{
      this.employees = result
    })
   }

  ngOnInit(): void {
    
    this.Load();

  }

  

  Edit(id:number){
    if(id != null){
      this.api.get("employees/" + id).subscribe((result:any)=>{
        this.formdata.patchValue({
          id : id,
          code : result.code,
          name : result.name,
          gender : result.gender,
          mobileno : result.mobileno,
          email : result.email,
          password : result.password
        })
      })
    }
    this.id = id;
    
  }

  Save(data:any){
    if(this.id == null){
    this.api.post("employees", data).subscribe((result:any)=>{
      console.log(result);
      this.Load();
    })
  }
    else{
      this.api.put("employees/" + this.id , data).subscribe((result:any)=>{
        console.log(result);
        this.Load();
      })
    }
    
  }

  Delete(id:number){
    if(confirm("Sure to delete")){
    this.api.delete("employees/" + id).subscribe((result:any)=>{
      console.log(result);
      this.Load();
    })
  }
  }

}
