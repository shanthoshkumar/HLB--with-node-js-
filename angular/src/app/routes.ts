import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BrokerComponent } from './broker/broker.component';
import { DepositComponent } from './deposit/deposit.component';
import { AllbetsComponent } from './allbets/allbets.component';
import { MybetsComponent } from './mybets/mybets.component';
import { CreateBetComponent } from './create-bet/create-bet.component';
import { SetresultComponent } from './setresult/setresult.component';
import { ChangeownerComponent } from './changeowner/changeowner.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ForgotpasswordComponent } from "../app/forgotpassword/forgotpassword.component";

import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard]
    },
    {
        path: 'broker', component:BrokerComponent,canActivate:[AuthGuard]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }, 
      {
        path: 'deposit',
        component:DepositComponent,canActivate:[AuthGuard]
      },
      {
        path: 'allbets',
        component: AllbetsComponent,canActivate:[AuthGuard]
   
      },
      {
        path: 'mybets',
        component:MybetsComponent,canActivate:[AuthGuard]
      },
      {
        path: 'createbet',
        component:CreateBetComponent,canActivate:[AuthGuard]
      },
      {
          path: 'setresult',
          component:SetresultComponent,canActivate:[AuthGuard]
        },
        {
          path: 'changeowner',
          component:ChangeownerComponent,canActivate:[AuthGuard]
        },
        {
            path: 'sidenav',
            component:SidenavComponent,canActivate:[AuthGuard]
          },
          {
            path: 'forgotpassword',
            component:ForgotpasswordComponent,
          },
          

];