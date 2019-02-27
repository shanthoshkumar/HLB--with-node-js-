// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
// components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
//routes
import { appRoutes } from './routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { BrokerComponent } from './broker/broker.component';
import { DepositComponent } from './deposit/deposit.component';
import { AllbetsComponent } from './allbets/allbets.component';
import { MybetsComponent } from './mybets/mybets.component';
import { CreateBetComponent } from './create-bet/create-bet.component';
import { SetresultComponent } from './setresult/setresult.component';
import { ChangeownerComponent } from './changeowner/changeowner.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ForgotpasswordComponent } from "../app/forgotpassword/forgotpassword.component";

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    BrokerComponent,
    DepositComponent,
    AllbetsComponent,
    MybetsComponent,
    CreateBetComponent,
    SetresultComponent,
    ChangeownerComponent,
    SidenavComponent,
    ForgotpasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
