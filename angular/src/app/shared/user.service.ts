import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Game } from './game.model'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: '',
    publickey:''
  };

  selectedTeam: Game = {
    team1: '',
    team2: '',
    selectTeam: ''
  };
  
  // signinUser: User = {
  //   fullName: '',
  //   email: '',
  //   password: '',
  //   publickey:''
  // };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  //HttpMethods

  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }

  createbet(game: Game){
    return this.http.post(environment.apiBaseUrl+'/createBet',game,this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }
  getoptiondetails() {
    return this.http.get(environment.apiBaseUrl + '/betDetails');
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  forgotpassword(forgot){
    console.log("forgot"+ forgot);
    return this.http.post(environment.apiBaseUrl+'/forgotpassword',forgot,this.noAuthHeader);
  }

  changepassword(change){
    console.log("inservice"+ change);
    return this.http.post(environment.apiBaseUrl+'/changepassword',change,this.noAuthHeader);
  }

  getToken() {
    return localStorage.getItem('token');
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }
  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
  
}
