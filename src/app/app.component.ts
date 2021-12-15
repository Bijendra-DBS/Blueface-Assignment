import { Component } from '@angular/core';

export interface userInfo {
  firstName: string;
  lastName: string;
  userName: string;
  age: number;
  emailId: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userDetails: userInfo;
  title = 'Profile';
  loader: string;
  previousFirstName: string = "";
  previousLastName: string = "";
  previousUserName: string = "";


  constructor(){
    this.userDetails = {
      firstName: '',
      lastName: '',
      userName: '',
      age: 50,
      emailId: '',
    }
  }
  disabledFlag : boolean = false;
  ngOnInit(){
    this.getUserDetails().then(() => {
      this.loader = 'Sucessfully loaded';
      this.disabledFlag = false;
    }, error => {
      this.loader = error.error;
      this.fetchAgain();
    });
  }

  // fetch method is used when no data is being loaded
  fetchAgain(){
    this.ngOnInit()
  }

  // get user details
  getUserDetails(): Promise<userInfo>{
    this.loader = "Loading Profile...";
    this.disabledFlag = true;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(Math.round(Math.random())){
          this.userDetails = {
            firstName: 'Bijendra',
            lastName: 'Gaur',
            userName: 'bijendra.gaur',
            emailId: 'bijendra.gaur@blueface.com',
            age: 26
          }
          this.previousFirstName = this.userDetails.firstName;
          this.previousLastName = this.userDetails.lastName;
          this.previousUserName = this.userDetails.userName;
          resolve(this.userDetails);
        } else {
          let error = {
            error: 'Profile not found'
          }
          reject(error);
        }
      }, Math.random() * 5000);
    });
  }

  // setName method for setting first name and lastname
  setName(formData: any){
    this.setUserData(formData).then(response => {
      this.loader = "Succesfully saved name!";
      response.firstName = response.firstName.toUpperCase();
      response.lastName = response.lastName.toUpperCase();
      this.userDetails.userName = response.firstName.toLowerCase()+"."+response.lastName.toLowerCase();

      this.setUserEmail(response).then(setEmailResponse=>{
          this.loader = "Profile Saved Successfull...";
          this.userDetails.emailId = setEmailResponse;
          this.previousFirstName = this.userDetails.firstName;
          this.previousLastName = this.userDetails.lastName;
          this.previousUserName = this.userDetails.userName;
        }, error => {
          this.loader = error.error;
          this.rollbackPreviousData(); // this rollbackPreviousData method is used if error found!
      });
    }, error => {
      this.loader = error.error;
      this.rollbackPreviousData();
    });
  }


  // set user data
  setUserData(formData: any): Promise<any>{
    return new Promise((resolve, reject) => {
      let formValue = formData.value;
      if(formData.form.valid && formValue.firstName && formValue.lastName){
        this.loader = "Saving Profile...";
        setTimeout(() => {
          if(Math.round(Math.random())){
            this.userDetails.firstName = formValue.firstName;
            this.userDetails.lastName = formValue.lastName;
            resolve(this.userDetails)
          }else {
            let error = {
              error: 'Error on saving profile!, Please try again'
            }
            reject(error);
          }
        }, Math.random() * 5000);
      }
    });
  }

  // set user Email address
  setUserEmail(userName): Promise<any>{
    this.loader = "Validating email address...";
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(Math.round(Math.random())){
            let setEmail = userName.firstName.trim().toLowerCase()+"."+userName.lastName.trim().toLowerCase()+'@blueface.com';
            resolve(setEmail)
        }else {
          let error = {
            error: 'Error on email generation, Please try again!'
          }
          reject(error);
        }
      }, Math.random() * 5000);
    })
  }
  // set user data end


  // if error exist name will be rolled back to previous name.
  rollbackPreviousData(){
    this.userDetails.firstName = this.previousFirstName;
    this.userDetails.lastName = this.previousLastName;
    this.userDetails.userName = this.previousUserName;
  }
}
